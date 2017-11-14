
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
        username : cc.Label,
        myself: cc.Node,
        totalcount: cc.Label,
        
        huCount: cc.Label,
        dianCount: cc.Label,
        touchBao: cc.Label,
        bankerCount :cc.Label,
        bk:cc.Node,

    },

    // use this for initialization
    onLoad: function () {
    },
    init:function(){
        let player = cc.find('Canvas').getComponent('MajiangDataBind').playersarray;
        let userInfo = this.data;
        let headimg;
        console.log(this.data)
        this.huCount.string = userInfo.huCount;
        this.dianCount.string = userInfo.dianCount;
        this.touchBao.string = userInfo.touchBao;
        this.bankerCount.string = userInfo.bankerCount;
        this.totalcount.string = '总分：'+userInfo.pointCount;
        for(let i = 0;i<player.length;i++){
            let pl = player[i].getComponent('MaJiangPlayer');
            if(pl.data.id == this.data.user){
                headimg = pl.data.headimgurl;
                this.username.string = pl.data.username;
            }
            if(this.data.user == cc.beimi.user.id){
                this.myself.active = true;
                this.bk.color = new cc.Color(213,197,197);
            }
        }
        if(headimg){
            var imgurl = headimg;
            var sprite = this.headimg.getComponent(cc.Sprite);
            var head = this.headimg;
            cc.loader.load({url:imgurl,type:'jpg'},function(suc,texture){
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                head.width = 64;
                head.height = 64;
            });
        }
    //     this.username.string = userInfo.userName;
    //     if(userInfo.cur != 'true' ){
    //         this.myself.active = false;
    //         this.bk.color = new cc.Color(213,197,197);
    //    }
    //    if(userInfo.balance){
    //     for(let i = 0; i<userInfo.balance.units.length;i++){
    //         var gang = cc.instantiate(this.loyou);
    //         this.updateItem(userInfo.balance.units[i]);
    //         gang.parent = this.content ;
    //     }
        
    // }
        
    //     console.log(userInfo.cur);
    //     if(userInfo.gang){
    //         for(let i = 0; i<userInfo.gang.units.length;i++){
    //             //bei += userInfo.gang.details[i].point
    //             var gang = cc.instantiate(this.loyou);
    //             this.updateItem(userInfo.gang.units[i]);
    //             gang.parent = this.content;
    //         }      
    //     };
        
        

    },
    // updateItem:function(data){
    //     this.label1.string = data.type;
    //     this.label2.string = data.tip;
    //     this.label3.string = data.point;
    //     this.label1.node.height = 40;
    //     this.label2.node.height = 40;
    //     this.label3.node.height = 40;
    //     //this.label3.string = data.count;
    // },
 
    setData:function(data){
        this.data = data ; 
        this.init();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
