import { Game1Comp, GameEventType } from "./Game1Comp";
import { GameConfig } from "./GameConfig";
import { RubbishComp } from "./RubbishComp";

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
export class BucketComp extends cc.Component {

    @property(cc.Node)
    ndSp: cc.Node = null;

    bucketType = -1;
    compMainGame:Game1Comp = null;

    rotationIndex = -1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMoveHandle,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEndHandle,this);
    }

    init(comp:Game1Comp){
        this.compMainGame = comp;
    }

    reStart(){
        this.node.angle = 0;

        this.bucketType = Math.floor(Math.random()*(GameConfig.colorConfig.length - 1));
        this.ndSp.color = GameConfig.colorConfig[this.bucketType].color;
    }

    _onTouchMoveHandle(event, captureListeners){
        if(this.compMainGame.bIsGaming){
            this.node.setPosition(this.compMainGame.node.convertToNodeSpaceAR(event.touch.getLocation()));
        }
    }
    _onTouchEndHandle(event, captureListeners){
        if(this.compMainGame.bIsGaming){
            let touch = event.touch;
            let deltaMove = touch.getLocation().sub(touch.getStartLocation());
            if (deltaMove.mag() < 3) {
                this.onClickHandle();
            }
        }
    }
    onClickHandle(){
        this.rotationIndex += 1;
        this.rotationIndex > (GameConfig.rotationConfig.length - 1) && (this.rotationIndex = 0);
        let rotationNum = GameConfig.rotationConfig[this.rotationIndex];
        this.node.angle = rotationNum;
    }

    // update (dt) {}
    onCollisionEnter(collComp,self){
        if(self.tag == 1 && collComp.node.getComponent(RubbishComp).rubbishType == this.bucketType && collComp.node.angle == this.node.angle){
            this.compMainGame.node.emit(GameEventType.Game_AddScore);
            this.node.stopAllActions()
            this.node.opacity = 255;
            this.node.runAction(cc.sequence([
                cc.fadeOut(0.1),
                cc.fadeIn(0.1),
            ]).repeat(3))
        }else{
            this.compMainGame.node.emit(GameEventType.Game_Wrong);
        }
        this.compMainGame.rubbishPool.put(collComp.node);
    }
}
