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
        csImageTop:{
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
        this.caishen = false ; 
        this.take = false;
        this.value = cvalue ;
        let cardframe ;
        let cardcolors = parseInt(this.value/4 ) ;
        let cardtype  = parseInt(cardcolors / 9);

        this.mjtype = cardtype ;
        this.mjvalue = parseInt((this.value%36)/4 ) ;
    
        let deskcard ;
        this.lastonecard = false;

        let csType1,csType2;
        let csCardColors1,csCardColors2;
        let csValue1,csValue2;
        if(cc.beimi.powerCard){
            csCardColors1 = parseInt(cc.beimi.powerCard[0]/4 );
            csType1 = parseInt(csCardColors1 / 9);//第一张财神牌类型 
            csValue1 = (parseInt((cc.beimi.powerCard[0]%36)/4)+1);
            if(cc.beimi.powerCard.length == 2){
                csCardColors2 = parseInt(cc.beimi.powerCard[1]/4 );
                csType2 = parseInt(csCardColors2 / 9);//第二张财神牌类型
                csValue2 = (parseInt((cc.beimi.powerCard[1]%36)/4)+1);
            }
        }
       
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
            if(cardcolors == csCardColors1 || cardcolors == csCardColors2){
                this.caishenCards();
            }
        }else{
            if(cardtype == 0){ //万
                deskcard = "M_character_"+ (parseInt((this.value%36)/4)+1);
            }else if(cardtype == 1){ //筒
                deskcard = "M_dot_"+ (parseInt((this.value%36)/4)+1) ;
            }else if(cardtype == 2){  //条
                deskcard = "M_bamboo_"+ (parseInt((this.value%36)/4)+1) ;
            }

            if(cardtype == csType1 && (parseInt((this.value%36)/4)+1) == csValue1){
                this.caishenCards();
            }else if(cardtype == csType2 && (parseInt((this.value%36)/4)+1) == csValue2){
                this.caishenCards();
            }
        }

        if(deskcard == null){
            if(cvalue==-38){
                deskcard = 'M_autumn';//秋
            } else if(cvalue==-35){
                deskcard = 'M_bamboo';//竹
            } else if(cvalue==-34){
                deskcard = 'M_chrysanthemum';//菊
            } else if(cvalue==-33){
                deskcard = 'M_orchid';//兰
            } else if(cvalue == -32){
                deskcard = 'M_plum';//梅
            }else if(cvalue == -36){
                deskcard = 'M_spring';//春
            }else if(cvalue == -37){
                deskcard = 'M_summer';//夏
            }else if(cvalue == -39){
                deskcard = 'M_winter';//冬
            }

            //牌面显示财神标志
            if(cvalue.toString().indexOf("-") && cc.beimi.powerCard[0].toString().indexOf(cvalue.toString()) ||(cc.beimi.powerCard[1]!=null&& cc.beimi.powerCard[1].toString().indexOf(cvalue.toString()))){
                this.caishenCards();
            }
        }
        // if(deskcard == "suo2"){
        //     cardframe = this.beimi0.getSpriteFrame('麻将牌-牌面-'+deskcard);
        // }else{
            cardframe = this.atlas.getSpriteFrame(deskcard);
        // }
        this.cardvalue.getComponent(cc.Sprite).spriteFrame = cardframe;
       
        if(cc.beimi.cardNum >14 &&!pd){        
            this.cardvalue.width = 65;
            this.cardvalue.height = 100;
            this.target.width=63;
            cc.find('Canvas/content/handcards/deskcard/layout').y =5;
        }else if(!pd){
            this.target.width = 73;
        }
        //this.cardvalue.color = new cc.Color(255, 255, 255);
        if(pd == null){
            var anim = this.getComponent(cc.Animation);
            anim.play("majiang_current");
        }   
        if(cc.sys.localStorage.getItem('alting')=='true'&& pd!= true){
            this.mj.getComponent(cc.Button).interactable = false;
        }else if(pd != true){
            this.mj.getComponent(cc.Button).interactable = true;
        }
    },
    caishenCards: function(){
        this.csImageTop.active = true;
        this.target.zIndex = -999+this.value;
        this.target.children[0].getComponent(cc.Button).enabled = false;
        this.cardvalue.color = new cc.Color(118, 118, 118);
        this.caishen = true;
    },
    lastone:function(){
        if(this.lastonecard == false){
            this.lastonecard = true;
            if(cc.beimi.cardNum > 14){ 
                this.target.width=80;   
            }else{
                this.target.width=100;    
            }
            this.target.y = 0;
            if(cc.sys.localStorage.getItem('alting')=='true'){
                this.mj.getComponent(cc.Button).interactable = false;
            }else{
                this.mj.getComponent(cc.Button).interactable = true;
            }
        }
       
    },
    relastone:function(){
        if(this.lastonecard == true){
            this.lastonecard = false;
            if(cc.beimi.cardNum > 14){ 
                this.cardvalue.width = 65;
                this.cardvalue.height = 100;
                this.target.width=63;
            }else{
                this.target.width = 73;
            }
            this.target.y=0;
        }
    },
    reinit:function(){
        this.relastone();     
        this.lastonecard = false;
        this.cardvalue.opacity = 255 ;
        if(this.take){
            this.target.y=0;
            this.take = false ;
        }
    },
    tingcolor:function(){
        this.cardvalue.color = new cc.Color(118, 118, 118);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
