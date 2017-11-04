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
        
        beimi0: {
            default: null,
            type: cc.SpriteAtlas
        },
        atlas:{
            default: null,
            type: cc.SpriteAtlas
        },
        count: cc.Label,
        target:{
            default: null,
            type: cc.Node
        },
        MJhead: cc.Node
    },

    // use this for initialization
    onLoad: function () {

    },
    init:function(cvalue,back,fangwei){
        this.value = cvalue ;
        this.back = back;
        this.fangwei = fangwei;
        let cardcolors = parseInt(this.value/4 ) ;
        let cardtype  = parseInt(cardcolors / 9);
        this.cardcolors =cardcolors;
        this.cardtype =cardtype;
        this.mjtype = cvalue; 
        this.mjvalue = parseInt((this.value%36)/4 ) ;

        var deskcard , cardframe ;
        if(this.back == true){
            if(this.fangwei == 'left'){
                this.MJhead.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame('e_mj_b_left');
            }else if(this.fangwei == 'top'){
                this.MJhead.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame('e_mj_b_bottom');
                this.target.height =63;
            }else if(fangwei == 'right'){
                this.MJhead.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame('e_mj_b_right');
            }else{
                this.MJhead.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame('e_mj_b_bottom');
                this.target.height = 76;
            }
        } else {
            //确定牌的花色
            var  fw = 'B';
            if(fangwei == 'left'){
                fw = 'L';
            }else if(fangwei == 'right'){
                fw = 'R'
            }
            if(cardcolors < 0){
               
                if(cardcolors==-7){
                    deskcard = fw+'_wind_east';
                } else if(cardcolors==-6){
                    deskcard = fw+'_wind_south';
                } else if(cardcolors==-5){
                    deskcard = fw+'_wind_west';
                } else if(cardcolors == -4){
                    deskcard = fw+'_wind_north';
                }else if(cardcolors == -3){
                    deskcard = fw+'_red';
                }else if(cardcolors == -2){
                    deskcard = fw+'_green';
                }else if(cardcolors == -1){
                    deskcard = fw+'_white';
                }       
               
            }else{
            
                if(cardtype == 0){ //万
                    deskcard = fw+"_character_"+ (parseInt((this.value%36)/4)+1) ;
                }else if(cardtype == 1){ //筒
                    deskcard = fw+"_dot_"+ (parseInt((this.value%36)/4)+1) ;
                }else if(cardtype == 2){  //条
                    deskcard = fw+"_bamboo_"+ (parseInt((this.value%36)/4)+1) ;
                }                // }
                
            }
            cardframe = this.beimi0.getSpriteFrame(deskcard);
            this.target.getComponent(cc.Sprite).spriteFrame = cardframe;
            
            }
            this.count.string = '1';
            if(this.count.string == '1'){
                this.count.node.active = false;
         }
    },
    countactive:function(){
        this.count.node.active =true ; 
    },
    setValue: function(values){
        this.value = values;
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
