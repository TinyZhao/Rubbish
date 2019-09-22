
const {ccclass, property} = cc._decorator;

@ccclass
export class GameConfig extends cc.Component {
    static colorConfig = [
        {color:cc.color(255,0,0),name:"垃圾1"},
        {color:cc.color(0,255,0),name:"垃圾2"},
        {color:cc.color(0,0,255),name:"垃圾3"},
        {color:cc.color(200,200,200),name:"垃圾4"},
    ]
    
    static rotationConfig = [
        -45,
        0,
        45,
        0
    ]
}
