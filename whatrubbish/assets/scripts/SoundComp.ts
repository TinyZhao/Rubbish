
export let SoundConfig = {
    kill1: "firstblood",
    killCombo2: "Double_Kill",
    killCombo3: "triple_kill",
    killCombo4: "UltraKill",
    killCombo5: "Rampage",
    killCombo6:"Killing_Spree",
    killCombo7:"Dominating",
    killCombo8:"MegaKill",
    killCombo9:"Unstoppable",
    killCombo10:"WhickedSick",
    killCombo11:"monster_kill",
    killCombo12:"GodLike",
    killCombo13:"HolyShit",
    killCombo14:"Ownage",

    // kill2:"Killing_Spree",
    // kill3:"Dominating",
    // kill4:"MegaKill",
    // kill5:"Unstoppable",
    // kill6:"WhickedSick",
    // kill7:"monster_kill",
    // kill8:"GodLike",
    // kill9:"HolyShit",
    // kill10:"Ownage",
}

const {ccclass, property} = cc._decorator;

@ccclass
export class SoundComp extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    playMusic(){
        cc.loader.loadRes("sound/bgMusic",(err,audio)=>{
            cc.audioEngine.playMusic(audio,true)
        })
    }

    playEffect(sound){
        if(sound){
            cc.loader.loadRes("sound/" + sound,(err,audio)=>{
                cc.audioEngine.playEffect(audio,false);
            })
        }
    }

    // update (dt) {}
}
