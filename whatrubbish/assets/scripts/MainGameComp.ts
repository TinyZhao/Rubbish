import { BucketComp } from "./BucketComp";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class MainGameComp extends cc.Component {

    @property(cc.Node)
    ndBgSp: cc.Node = null;

    @property(cc.Node)
    ndRubbish: cc.Node = null;

    @property(cc.Node)
    bucketContainer: cc.Node = null;
    @property(cc.Prefab)
    pfBucket: cc.Prefab = null;

    public bucketPool:cc.NodePool = null;

    private showRunTime = 10;//能看到的时间
    private sendBucketIntervalTime = 1;//产生bucket间隔

    onLoad () {
        this.bucketPool = new cc.NodePool;

        for (let index = 0; index < 20; index++) {
            let node = cc.instantiate(this.pfBucket);
            this.bucketPool.put(node);
        }

        let collManager = cc.director.getCollisionManager();
        collManager.enabled = true;
        collManager.enabledDebugDraw = true;
        collManager.enabledDrawBoundingBox = true;

        this.ndRubbish.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMoveHandle,this);
    }

    _onTouchMoveHandle(event, captureListeners){
        this.ndRubbish.setPosition(this.node.convertToNodeSpaceAR(event.touch.getLocation()));
    }

    start () {
        this.runBgAnim();
        this.startGame();
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
        let bucketNode = this.bucketPool.get();
        if(!cc.isValid(bucketNode)){
            bucketNode = cc.instantiate(this.pfBucket);
        }

        return bucketNode;
    }

    go321(){
        
    }

    startGame(){
        
        this.startSendBucket();
    }

    startSendBucket(){
        let contSize = this.bucketContainer.getContentSize();
        this.schedule(()=>{
            let oneBucket:cc.Node = this.getBucket();
            oneBucket.getComponent(BucketComp).init();

            let fixX = oneBucket.getContentSize().width/2;
            oneBucket.parent = this.bucketContainer;
    
            let startPosX = (Math.random()> 0.5 ? 1 : -1) * (Math.random() * contSize.width/2 - fixX);
            oneBucket.setPosition(cc.v2(startPosX,contSize.height))
    
            oneBucket.runAction(cc.sequence([
                cc.moveTo(this.showRunTime * 2,cc.v2(startPosX,-contSize.height)),
                cc.callFunc(()=>{
                    this.bucketPool.put(oneBucket);
                })
            ]))
        },this.sendBucketIntervalTime)
    }

    // update (dt) {}
}
