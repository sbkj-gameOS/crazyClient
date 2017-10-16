cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        music:{
            default: null,
            type: cc.Sprite
        },
        musicSlider:{
            default: null,
            type: cc.Slider
        },
        sound:{
            default: null,
            type: cc.Sprite
        },
        soundSlider:{
            default: null,
            type: cc.Slider
        },
        musicon:{
            default: null,
            type: cc.Node
        },
        musicoff:{
            default: null,
            type: cc.Node
        },
        soundon:{
            default: null,
            type: cc.Node
        },
        soundoff:{
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.musicSlider.progress = cc.beimi.audio.getBGMVolume();
        this.music.fillRange  = cc.beimi.audio.getBGMVolume() ;

        this.soundSlider.progress = cc.beimi.audio.getSFXVolume();
        this.sound.fillRange =cc.beimi.audio.getSFXVolume();
        
        if(cc.beimi.audio.getState() == cc.audioEngine.AudioState.PLAYING){
            this.musicon.active = true ;
            this.musicoff.active =  false;
        }else{
            this.musicon.active = false ;
            this.musicoff.active =  true
        }

    },
    onMusicSlide:function(slider){
        this.music.fillRange  = slider.progress ;
        cc.beimi.audio.setBGMVolume(slider.progress) ;
        this.musicon.active = true ;
        this.musicoff.active =  false;
    },
    onSoundSlide:function(slider){
        this.sound.fillRange  = slider.progress ;
        cc.beimi.audio.setSFXVolume(slider.progress) ;
        this.soundon.active = true ;
        this.soundoff.active =  false;
    },
    onSoundBtnClick:function(){
        //console.log(cc.beimi.audio.getSFXVolume());
        if(cc.beimi.audio.getSFXVolume()>0){
            this.soundon.active = false ;
            this.soundoff.active =true;
            cc.beimi.audio.setSFXVolume(0);
        }else{
            this.soundon.active =true;
            this.soundoff.active =false;
            cc.beimi.audio.setSFXVolume(this.sound.fillRange); 
        }
    },
    onMusiceBtnClick:function(){
        if(cc.beimi.audio.getState() == cc.audioEngine.AudioState.PLAYING){
            this.musicon.active = false ;
            this.musicoff.active =  true;
            cc.beimi.audio.pauseAll();
        }else{
            this.musicon.active = true ;
            this.musicoff.active =  false;
            cc.beimi.audio.resumeAll();
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
