cc.Class({
    extends: cc.Component,

    properties: {
        beimi0: {
            default: null,
            type: cc.SpriteAtlas
        },
        target:{
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {

    },
    init:function(cvalue,fangwei){
        this.value = cvalue ;
        this.fangwei = fangwei;

        var deskcard , cardframe ;
        //确定牌的花色
        var  fw = 'B';
        if(fangwei == 'left'){
            fw = 'L';
        }else if(fangwei == 'right'){
            fw = 'R'
        }

        if(cvalue==-8){
            deskcard = fw+'_autumn';//秋
        } else if(cvalue==-7){
            deskcard = fw+'_bamboo';//竹
        } else if(cvalue==-6){
            deskcard = fw+'_chrysanthemum';//菊
        } else if(cvalue==-5){
            deskcard = fw+'_orchid';//兰
        } else if(cvalue == -4){
            deskcard = fw+'_plum';//梅
        }else if(cvalue == -3){
            deskcard = fw+'_spring';//春
        }else if(cvalue == -2){
            deskcard = fw+'_summer';//夏
        }else if(cvalue == -1){
            deskcard = fw+'_winter';//冬
        }       
        cardframe = this.beimi0.getSpriteFrame(deskcard);
        this.target.getComponent(cc.Sprite).spriteFrame = cardframe;
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
