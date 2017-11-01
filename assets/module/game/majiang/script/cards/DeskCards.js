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
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        beimi0: {
            default: null,
            type: cc.SpriteAtlas
        },
        cardvalue:{
            default: null,
            type: cc.Node
        },
        target:{
            default: null,
            type: cc.Node
        },
    },

    init:function(cvalue,fangwei){
        this.value = cvalue ;
        let cardframe ;
        let cardcolors = parseInt(this.value/4 ) ;
        let cardtype  = parseInt(cardcolors / 9);
        let deskcard ;
        
        if(cardcolors < 0){
            if(cardcolors==-7){
                deskcard = fangwei+'_wind_east';
                cc.beimi.audio.playSFX('nv/wind_1.mp3');
            } else if(cardcolors==-6){
                deskcard = fangwei+'_wind_south';
                cc.beimi.audio.playSFX('nv/wind_2.mp3');
            } else if(cardcolors==-5){
                deskcard = fangwei+'_wind_west';
                cc.beimi.audio.playSFX('nv/wind_3.mp3');
            } else if(cardcolors == -4){
                deskcard = fangwei+'_wind_north';
                cc.beimi.audio.playSFX('nv/wind_4.mp3');
            }else if(cardcolors == -3){
                deskcard = fangwei+'_red';
                cc.beimi.audio.playSFX('nv/wind_5.mp3');
            }else if(cardcolors == -2){
                deskcard = fangwei+'_green';
                cc.beimi.audio.playSFX('nv/wind_6.mp3');
            }else if(cardcolors == -1){
                deskcard = fangwei+'_white';
                cc.beimi.audio.playSFX('nv/wind_7.mp3');
            }
            
            //东南西北风 ， 中发白
        }else{
            if(cardtype == 0){ //万
                deskcard = fangwei+"_character_"+ (parseInt((this.value%36)/4)+1) ;
                cc.beimi.audio.playSFX('nv/wan_'+(parseInt((this.value%36)/4)+1)+'.mp3');
            }else if(cardtype == 1){ //筒
                deskcard = fangwei+"_dot_"+ (parseInt((this.value%36)/4)+1) ;
                cc.beimi.audio.playSFX('nv/tong_'+(parseInt((this.value%36)/4)+1)+'.mp3');
            }else if(cardtype == 2){  //条
                deskcard = fangwei+"_bamboo_"+ (parseInt((this.value%36)/4)+1) ;
                cc.beimi.audio.playSFX('nv/suo_'+(parseInt((this.value%36)/4)+1)+'.mp3');
            }
        }
        // if(deskcard == "suo2"){
        //     cardframe = this.beimi0.getSpriteFrame('麻将牌-牌面-'+deskcard);
        // }else{
            cardframe = this.atlas.getSpriteFrame(deskcard);
        // }
        this.cardvalue.getComponent(cc.Sprite).spriteFrame = cardframe;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
