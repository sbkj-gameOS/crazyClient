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
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(e){
            e.stopPropagation();
        });
    },
    onClose:function(){
        let dialog = cc.find("Canvas/alert") ;
        cc.beimi.dialog.put(dialog);
    },  
    onClose2:function(){
        let alert = cc.find("Canvas/alert") ;
        cc.beimi.alert.put(alert);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
