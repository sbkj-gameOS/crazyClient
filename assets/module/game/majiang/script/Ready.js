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
        target:{
            default:null ,
            type : cc.Node
        },
        count:{
            default:null
        }
    },

    // use this for initialization
    onLoad: function () {
        this.count = 0;
    },
    onClick:function(event){
        //开始匹配
        var count = event.target.getComponent('Ready').count;

        let socket = this.socket();
        var param = {
            token:cc.beimi.authorization,
            playway:cc.beimi.playway,
            orgi:cc.beimi.user.orgi
        } ;
        if ( cc.beimi.room ) {
            param.room = cc.beimi.room ;
        }
        let majiang = this.target.getComponent("MajiangDataBind");
        majiang.waittingForPlayers();
        // if(count == 0){
        //     event.target.getComponent('Ready').count=count+1;
        //     socket.emit("joinroom" ,JSON.stringify(param)) ;
        // }else{
            this.node.dispatchEvent(new cc.Event.EventCustom('readyGM', true));       
        // }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
