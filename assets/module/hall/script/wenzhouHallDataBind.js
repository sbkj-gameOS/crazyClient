var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

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
        username: {
            default: null,
            type: cc.Label
        },
        goldcoins: {
            default: null,
            type: cc.Label
        },
        cards: {
            default: null,
            type: cc.Label
        }
        ,
        girl:{
            default: null,
            type: cc.Node
        },
        loaddingPrefab: {
            default: null,
            type: cc.Prefab
        },
        alertPrefab: {
            default: null,
            type: cc.Prefab
        },
        headimg:{
            default:null,
            type:cc.Node
        },
        alert20: cc.Prefab
        
    },

    // use this for initialization
    onLoad: function () {
        // var url = window.location.href;
        // //console.log(url);
        // var data = url.split('?')[1];
        // var value='';
        // if(data){
        // var values= data.split('&');
        //     for(var i in values){
        //     var name = values[i].split('=')[0]
        //     if (name == 'payNum'){
        //         value = values[i].split('=')[1];
        //         cc.beimi.http.httpGet(''+payNum,this.seccess,this.error,this);
        //         }
        //     };
        // }
        
        if(this.ready()){
            
            if(cc.beimi.browserType=="wechat"){
                cc.beimi.WXorBlow.shareRoom();
            }   
            //ljh 加新场景的alert节点池子
            cc.beimi.dialog = new cc.NodePool();
            cc.beimi.dialog.put(cc.instantiate(this.alertPrefab));

            cc.beimi.alert = new cc.NodePool();
            cc.beimi.alert.put(cc.instantiate(this.alert20));

            if(cc.beimi.paystatus){
                if( cc.beimi.paystatus=='true'){
                    this.alert('充值成功');
                    cc.beimi.paystatus = null;
                }else{
                    this.alert('充值失败');
                    cc.beimi.paystatus = null;
                }  
            };
            //当接受到这个对象时，对象来自于登录时传回的json数据
            // var self = this.headimg;
            // var url = "cc.beimi.user.headimgurl";
            // cc.loader.loadImg(url, {isCrossOrigin : true }, function(err,img){
            //     var logo  = new cc.Sprite(img);
            //      self.addChild(logo);
            // }); 
			if(cc.beimi.user.nickname == null || cc.beimi.user.nickname == ""){
				cc.beimi.user.nickname = "游客_"+Date.parse(new Date());
			}
            this.username.string = cc.beimi.user.nickname;
			if(cc.beimi.user.headimgurl){
                var imgurl = cc.beimi.user.headimgurl;
                var sprite = this.headimg.getComponent(cc.Sprite);
                cc.loader.load({url:imgurl,type:'jpg'},function(err,texture){
                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                })
            }
            // if(cc.beimi.user.goldcoins > 9999){
            //     var num = cc.beimi.user.goldcoins / 10000  ;
            //     this.goldcoins.string = num.toFixed(2) + '万';
            // }else{
            //     this.goldcoins.string = cc.beimi.user.goldcoins;
            // }
            this.cards.string = cc.beimi.user.cards + "张" ;
            cc.beimi.http.httpGet('/api/room/queryRoomCard?token='+cc.beimi.authorization,this.sucess,this.error,this)
            
        }
    },
    // seccess: function(result,object){
    //     var data = JSON.parse(result);
    //     if(data.seccess==true){
    //         var cardNum = data.cardNum;
    //         cc.beimi.user.cards = Number(cc.beimi.user.cards) + Number(cardNum);
    //         this.cards.string = cc.beimi.user.cards+ '张';
    //         this.alert('充值成功');
    //     }else{
    //         this.alert('充值失败');
    //     }
        
    // },
    error: function(result,object){
        // this.alert('充值失败');
    },
    sucess:function(result,object){
        var data = JSON.parse(result) ;
            cc.beimi.user.cards = data.cards;
            object.cards.string = cc.beimi.user.cards + "张" ;

    },
    playToLeft:function(){
        this._girlAnimCtrl = this.girl.getComponent(cc.Animation);
        this._girlAnimCtrl.play("girl_to_left");
    },
    playToRight:function(){
        this._girlAnimCtrl = this.girl.getComponent(cc.Animation);
        this._girlAnimCtrl.play("girl_to_right");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});