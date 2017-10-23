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
        img:{
            default:null,
            type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        if(cc.beimi.authorization){
            var imgurl = "http://game.bizpartner.cn/registerPlayer/getEWMImage?token="+cc.beimi.authorization;    
            //var imgurl = "http://192.168.199.203/registerPlayer/getEWMImage?token=bb9f75b4c88b4f3d8b3ab5b0ef505e9a";
                var sprite = this.img.getComponent(cc.Sprite);
                cc.loader.load({url:imgurl,type:'jpg'},function(err,texture){
                    sprite.spriteFrame = new cc.SpriteFrame(texture);               
                })
        }     
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
