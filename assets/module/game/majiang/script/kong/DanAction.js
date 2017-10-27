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

        this.mjtype = cvalue; 
        this.mjvalue = parseInt((this.value%36)/4 ) ;

        let deskcard , cardframe ;
        if(this.back == true){
            if(this.fangwei == 'left'||this.fangwei == 'right'){
                this.MJhead.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame('麻将牌-侧家杠牌');
                this.MJhead.height = 20;
            }else if(this.fangwei == 'top'){
                this.MJhead.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame('麻将牌-对家杠牌');
            }else{
                this.MJhead.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame('麻将牌-对家杠牌');
            }
        } else {
            //确定牌的花色
            if(cardcolors < 0){
                deskcard = "wind"+(cardcolors + 8) ; //东南西北风 ， 中发白
            }else{
                if(cardtype == 0){ //万
                    deskcard = "wan"+ (parseInt((this.value%36)/4)+1) ;
                }else if(cardtype == 1){ //筒
                    deskcard = "tong"+ (parseInt((this.value%36)/4)+1) ;
                }else if(cardtype == 2){  //条
                    deskcard = "suo"+ (parseInt((this.value%36)/4)+1) ;
                }
            }
            if(deskcard == "suo2"){
                cardframe = this.beimi0.getSpriteFrame('麻将牌-牌面-'+deskcard);
            }else{
                cardframe = this.atlas.getSpriteFrame('麻将牌-牌面-'+deskcard);
            }
            if(fangwei == 'left'){
                this.MJhead.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame('麻将牌-侧家出牌');
                this.target.rotation = 90;
                this.target.x = this.target.x+3;
                this.target.y = this.target.y-7;
                this.count.node.rotation = -90;
            }else if(fangwei == 'right'){
                this.MJhead.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame('麻将牌-侧家出牌');
                this.target.rotation = -90;
                this.count.node.rotation = 90;
                this.target.x = this.target.x-3;
                this.target.y = this.target.y-7;
            }else if(fangwei == 'top'){
                this.target.rotation = 180;
                this.target.y = this.target.y-10;
            }else{
                this.target.y = this.target.y-3;

            }
            this.target.getComponent(cc.Sprite).spriteFrame = cardframe;
            this.target.width= 40;
            this.target.height= 50;
            this.count.string = '1';
            if(this.count.string == '1'){
                this.count.node.active = false;
            }
        }
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
