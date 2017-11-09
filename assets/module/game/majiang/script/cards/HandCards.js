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
        mj: cc.Node,
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

    // use this for initialization
    onLoad: function () {
        this.lastonecard = false ;
        this.take = false ;
        this.node.on('mousedown', function ( event ) {
            console.log('Hello!');
        });
        this.node.on('mousemove', function ( event ) {
            console.log('Hello Mover!');
        });
    },
    init:function(cvalue,pd){
        //console.log('width:   '+this.target.width)
        //this.mj.color = new cc.Color(255, 255, 255);        
        this.take = false;
        this.value = cvalue ;
        let cardframe ;
        let cardcolors = parseInt(this.value/4 ) ;
        let cardtype  = parseInt(cardcolors / 9);

        this.mjtype = cardtype ;
        this.mjvalue = parseInt((this.value%36)/4 ) ;
    
        let deskcard ;
        this.lastonecard = false;
       
        if(cardcolors < 0){
            if(cardcolors==-7){
                deskcard = 'M_wind_east';
            } else if(cardcolors==-6){
                deskcard = 'M_wind_south';
            } else if(cardcolors==-5){
                deskcard = 'M_wind_west';
            } else if(cardcolors == -4){
                deskcard = 'M_wind_north';
            }else if(cardcolors == -3){
                deskcard = 'M_red';
            }else if(cardcolors == -2){
                deskcard = 'M_green';
            }else if(cardcolors == -1){
                deskcard = 'M_white';
            }
            
            //东南西北风 ， 中发白
        }else{
            if(cardtype == 0){ //万
                deskcard = "M_character_"+ (parseInt((this.value%36)/4)+1) ;
            }else if(cardtype == 1){ //筒
                deskcard = "M_dot_"+ (parseInt((this.value%36)/4)+1) ;
            }else if(cardtype == 2){  //条
                deskcard = "M_bamboo_"+ (parseInt((this.value%36)/4)+1) ;
            }
        }
        // if(deskcard == "suo2"){
        //     cardframe = this.beimi0.getSpriteFrame('麻将牌-牌面-'+deskcard);
        // }else{
            cardframe = this.atlas.getSpriteFrame(deskcard);
        // }
        this.cardvalue.getComponent(cc.Sprite).spriteFrame = cardframe;
       
        if(cc.beimi.cardNum == 16){ 
            this.cardvalue.width = 61;
            this.target.width=59;
        }else{
            this.target.width = 68;
        }
       
        if(pd == null){
            var anim = this.getComponent(cc.Animation);
            anim.play("majiang_current");
        }   
    },
    lastone:function(){
        if(this.lastonecard == false){
            this.lastonecard = true;
            if(cc.beimi.cardNum == 17){ 
                this.target.width=80;   
            }else{
                this.target.width=90;    
            }
            this.target.y = 0;

        }
    },
    selected:function(){
        this.cardvalue.opacity = 168 ;
        this.selectcolor = true ;
    },
    relastone:function(){
        if(this.lastonecard == true){
            this.lastonecard = false;
            if(cc.beimi.cardNum == 17){ 
                this.cardvalue.width = 61;
                this.target.width=59;
            }else{
                this.target.width = 68;
            }
            this.target.y=0;
        }
    },
    reinit:function(){
        this.relastone();

        this.lastonecard = false;

        this.selectcolor = false ;
        this.cardvalue.opacity = 255 ;

        if(this.take){
            this.target.y=0;
            this.take = false ;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
