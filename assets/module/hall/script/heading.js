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
        headimg:cc.Node,
        username:cc.Label,
        cards:cc.Label,
        callNum: cc.Prefab,
        callPep: cc.Prefab,
        right1:{
            default:null,
            type:cc.Node,
        },
        right2:{
            default:null,
            type:cc.Node,
        },
        sym :cc.Label,
        pep :cc.Label,
        doing:cc.Label,
		ytx:cc.Label,
        shop:cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
        this.init();
        cc.beimi.money = 0;	
        if(cc.beimi.user!=null){
			this.username.string = cc.beimi.user.nickname;
            this.cards.string = cc.beimi.user.cards + "张"
            if(cc.beimi.user.headimgurl){
                var imgurl = cc.beimi.user.headimgurl;
                var sprite = this.headimg.getComponent(cc.Sprite);
                cc.loader.load({url:imgurl,type:'jpg'},function(err,texture){
                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                })
            }
        }
        if(cc.beimi.authorization!=null){//+cc.beimi.authorization
            cc.beimi.http.httpGet('/presentapp/runSummary?token=b4361cdff21d4760a1a9d882db87f97a',this.success,this.error,this);
        }     
    },
    success:function(result,object){
        result = JSON.parse(result);
		if(result.data.trtProfit != null && result.data.trtProfit != 0){
			object.sym.string = result.data.trtProfit;
		}
        if(result.data.subCount != null && result.data.subCount != 0){
			object.pep.string = result.data.subCount;
		}
        if(result.data.ppAmount != null && result.data.ppAmount != 0){
			object.doing.string = result.data.ppAmount;
		}
        if(result.data.amountPaid != null && result.data.amountPaid != 0){
			object.ytx.string = result.data.amountPaid;
		}
        cc.beimi.money = object.sym.string;
    },
    error:function(){
        console.log('error');
    },
    clickmoney: function(){
        if(this.right1.active == false){
            this.right2.active = false;
            this.right1.active = true;
        }
    },
    clickpeople:function(){
        if(this.right2.active == false){
            this.right1.active = false;
            this.right2.active = true;
        }
    },
    init:function(){
        
        this.right1 = cc.instantiate(this.callNum);
        this.right1.parent = this.node;
        this.right1.setPosition(-44,34);
        this.right2 = cc.instantiate(this.callPep);
        this.right2.parent = this.node;
        this.right2.setPosition(-3,-47);
        this.right1.active = true;
        this.right2.active = false; 
    },
    clickShop:function(){
        var shop = cc.instantiate(this.shop);
        shop.parent = this.node;
        shop.setPosition(640,360);
    }
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
