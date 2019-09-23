
let gameConfig = [
    {
        name: "Game1",
        scene: "GameScene1"
    },
    {
        name: "Game2",
        scene: "GameScene2"
    }
]
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ndBtnsContainer: cc.Node = null;

    @property(cc.Node)
    ndBtn: cc.Node = null;

    start () {
        this.ndBtn.active = false;
        for (let index = 0; index < gameConfig.length; index++) {
            const data = gameConfig[index];
            let btn = cc.instantiate(this.ndBtn);
            btn.active = true;
            btn.parent = this.ndBtnsContainer;
            btn.getComponentInChildren(cc.Label).string = data.name;
            btn.on("click",()=>{
                cc.director.loadScene(data.scene);
            })
        }
    }

    // update (dt) {}
}
