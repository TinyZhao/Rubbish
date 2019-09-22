import { GameConfig } from "./GameConfig";


// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// let colorConfig = [
//     {color:cc.color(255,0,0),name:"有害垃圾"},
//     {color:cc.color(0,255,0),name:"厨余垃圾"},
//     {color:cc.color(0,0,255),name:"可回收物"},
//     {color:cc.color(200,200,200),name:"其他垃圾"},
// ]




const {ccclass, property} = cc._decorator;

@ccclass
export class RubbishComp extends cc.Component {

    @property(cc.Node)
    spNode: cc.Node = null;

    @property(cc.Label)
    lbName: cc.Label = null;

    rubbishType = -1;

    // onLoad () {}

    start () {
    }

    init(){
        this.reuse()

        this.node.y = 1000;
    }

    unuse(){
        this.node.active = false;
        this.rubbishType = -1;
    }

    reuse(){
        this.node.active = true;
        this.node.stopAllActions();

        this.rubbishType = Math.floor(Math.random()*(GameConfig.colorConfig.length - 1));

        let randomConfig = GameConfig.colorConfig[this.rubbishType];
        this.spNode.color = randomConfig.color;

        let randomRotation = Math.floor(Math.random()*(GameConfig.rotationConfig.length - 1));
        this.node.angle = GameConfig.rotationConfig[randomRotation];

        this.lbName.string = randomConfig.name;
    }

    // update (dt) {}
}
