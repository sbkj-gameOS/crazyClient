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
        setting: {
            default: null,
            type: cc.Prefab
        },
        shopping: {
            default: null,
            type: cc.Prefab
        },
        sharing:{
            default: null,
            type: cc.Prefab
        },
        charts:{
            default: null,
            type: cc.Prefab
        }

    },
  

    // use this for initialization
    onLoad: function () {
       
    },
    //弹窗
    onSettingClick:function(){
        cc.beimi.dialog = cc.instantiate(this.setting) ;
        cc.beimi.dialog.parent = this.root();
      
    },
    onShoppingClick:function(){
        cc.beimi.dialog = cc.instantiate(this.shopping) ;
        cc.beimi.dialog.parent = this.root();        
    },
    onSharingClick:function(){
        cc.beimi.dialog = cc.instantiate(this.sharing);
        cc.beimi.dialog.parent =this.root();
    },
    onChartsClick:function(){
        cc.beimi.dialog = cc.instantiate(this.charts);
        cc.beimi.dialog.parent =this.root();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
