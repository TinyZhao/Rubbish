import { RubbishComp } from "./RubbishComp";
import { BucketComp } from "./BucketComp";


export let GameEventType = cc.Enum({
    Game_Wrong: "Wrong",
    Game_AddScore: "AddScore",

    Game_GameOver: "GameOver",
})

const {ccclass, property} = cc._decorator;

@ccclass
export class MainGameComp extends cc.Component {

    @property(cc.Node)
    ndBgSp: cc.Node = null;

    @property(cc.Node)
    ndRubbishContainer: cc.Node = null;

    @property(cc.Label)
    lbStartNum: cc.Label = null;

    @property(cc.Label)
    lbWrongNum: cc.Label = null;
    @property(cc.Label)
    lbScore: cc.Label = null;
    @property(cc.Label)
    lbTimer: cc.Label = null;

    @property(cc.Prefab)
    pfRubbish: cc.Prefab = null;
    @property(cc.Prefab)
    pfBucket: cc.Prefab = null;

    public rubbishPool:cc.NodePool = null;

    ndBucket: cc.Node;

    private showRunTime = 10;//能看到的时间
    private sendBucketIntervalTime = 1;//产生bucket间隔

    bIsGaming = false;

    private nWrongNum = 0;
    private nScoreNum = 0;
    private nGameTime = 0;

    private events = [
        [GameEventType.Game_AddScore,this.addScoreNum],
        [GameEventType.Game_Wrong,this.addWrongNum],
        [GameEventType.Game_GameOver,this.gameOver],
    ];

    onLoad () {
        this.rubbishPool = new cc.NodePool;

        for (let index = 0; index < 20; index++) {
            let node = cc.instantiate(this.pfRubbish);
            this.rubbishPool.put(node);
        }

        let collManager = cc.director.getCollisionManager();
        collManager.enabled = true;
        collManager.enabledDebugDraw = true;
        collManager.enabledDrawBoundingBox = true;

        this.lbStartNum.node.active = false;
    }

    init(){
        this.bIsGaming = false;

        this.nScoreNum = 0;
        this.nWrongNum = 0;
        this.nGameTime = 0;

        this.ndBucket = cc.instantiate(this.pfBucket);
        this.ndBucket.getComponent(BucketComp).init(this);

        this.ndBucket.parent = this.node;
        this.ndBucket.x = 0;
        this.ndBucket.y = -this.node.height/2 + 100;

        this.initGameEvent();
    }

    initGameEvent(){
        for (let index = 0; index < this.events.length; index++) {
            const element = this.events[index];
            this.node.on(element[0] as string,element[1] as Function,this);
        } 
    }

    onDestroy(){
        for (let index = 0; index < this.events.length; index++) {
            const element = this.events[index];
            this.node.off(element[0] as string,element[1] as Function,this);
        }
    }
    

    addWrongNum(){
        this.nWrongNum += 1;
        this.lbWrongNum.string = this.nWrongNum + "";
        if(this.nWrongNum > 10){
            this.gameOver();
        }
    }
    addScoreNum(){
        this.nScoreNum += 1;
        this.lbScore.string = this.nScoreNum + "";
    }

    gameOver(){
        this.bIsGaming = false;
        // this.ndRubbishContainer.pauseAllActions();
        cc.game.pause();
    }

    start () {
        this.init();

        this.runBgAnim();
        
        this.go321();
    }

    runBgAnim(){
        let deltaHeight = this.ndBgSp.height - cc.winSize.height;
        this.ndBgSp.y = deltaHeight/2;

        let action1 = cc.moveTo(12,cc.v2(0,-deltaHeight/2));
        let action2 = cc.moveTo(12,cc.v2(0,deltaHeight/2));
        this.ndBgSp.runAction(cc.sequence([
            action1,
            action2,
        ]).repeatForever())
    }

    getBucket(){
        let bucketNode = this.rubbishPool.get();
        if(!cc.isValid(bucketNode)){
            bucketNode = cc.instantiate(this.pfRubbish);
        }

        return bucketNode;
    }

    go321(){
        this.lbStartNum.node.active = true;
        this.lbStartNum.node.runAction(cc.sequence([
            cc.scaleTo(0.5,2),
            cc.spawn([
                cc.scaleTo(0.5,0.1),
                cc.fadeOut(0.5)
            ]),
            cc.callFunc(()=>{
                this.lbStartNum.string = "2";
                this.lbStartNum.node.scale = 1;
                this.lbStartNum.node.opacity = 255;
            }),
            cc.scaleTo(0.5,2),
            cc.spawn([
                cc.scaleTo(0.5,0.1),
                cc.fadeOut(0.5)
            ]),
            cc.callFunc(()=>{
                this.lbStartNum.string = "1";
                this.lbStartNum.node.scale = 1;
                this.lbStartNum.node.opacity = 255;
            }),
            cc.scaleTo(0.5,2),
            cc.spawn([
                cc.scaleTo(0.5,0.1),
                cc.fadeOut(0.5)
            ]),
            cc.callFunc(()=>{
                this.startGame();
            })
        ]))
    }

    startGame(){
        this.bIsGaming = true;
        this.startSendRubbish();
    }

    startSendRubbish(){
        let contSize = this.ndRubbishContainer.getContentSize();
        this.schedule(()=>{
            if(this.bIsGaming){
                let oneRubbish:cc.Node = this.getBucket();
                oneRubbish.getComponent(RubbishComp).init();
    
                let fixX = oneRubbish.getContentSize().width/2;
                oneRubbish.parent = this.ndRubbishContainer;
        
                let startPosX = (Math.random()> 0.5 ? 1 : -1) * (Math.random() * contSize.width/2 - fixX);
                oneRubbish.setPosition(cc.v2(startPosX,contSize.height/2 + 100))
        
                oneRubbish.runAction(cc.sequence([
                    cc.moveTo(this.showRunTime * 2,cc.v2(startPosX,-contSize.height/2 - 100)),
                    cc.callFunc(()=>{
                        this.rubbishPool.put(oneRubbish);
                    })
                ]))
            }
        },this.sendBucketIntervalTime)
    }

    update (dt) {
        if(this.bIsGaming){
            this.nGameTime += dt;
            this.lbTimer.string = this.nGameTime.toFixed(2) + "";
        }
    }
}
