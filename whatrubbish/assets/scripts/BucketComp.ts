// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let colorConfig = [
    {color:cc.color(255,0,0),name:"有害垃圾"},
    {color:cc.color(0,255,0),name:"厨余垃圾"},
    {color:cc.color(0,0,255),name:"可回收物"},
    {color:cc.color(200,200,200),name:"其他垃圾"},
]

const {ccclass, property} = cc._decorator;

@ccclass
export class BucketComp extends cc.Component {

    @property(cc.Node)
    spNode: cc.Node = null;

    @property(cc.Label)
    lbName: cc.Label = null;

    // onLoad () {}

    start () {
    }

    init(){
        this.reuse()
    }

    unuse(){
        this.node.active = false;
    }

    reuse(){
        this.node.active = true;
        this.node.stopAllActions();

        let randomConfig = colorConfig[Math.floor(Math.random()*(colorConfig.length - 1))];
        this.spNode.color = randomConfig.color;

        this.lbName.string = randomConfig.name;
    }

    // update (dt) {}
}
