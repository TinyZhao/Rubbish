import { MainGameComp, GameEventType } from "./MainGameComp";

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

    compMainGame:MainGameComp = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMoveHandle,this);
    }

    init(comp:MainGameComp){
        this.compMainGame = comp;
    }

    _onTouchMoveHandle(event, captureListeners){
        if(this.compMainGame.bIsGaming){
            this.node.setPosition(this.compMainGame.node.convertToNodeSpaceAR(event.touch.getLocation()));
        }
    }
    // update (dt) {}
    onCollisionEnter(collComp,self){
        if(self.tag == 1){
            collComp.node.active = false;
            this.compMainGame.node.emit(GameEventType.Game_AddScore);
        }else{
            this.compMainGame.node.emit(GameEventType.Game_Wrong);
        }
        this.compMainGame.rubbishPool.put(collComp.node);
    }
}
