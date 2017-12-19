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

    },

    // use this for initialization
    onLoad: function () {

    },
    ready:function(){
        var check = false ;
        if(cc.beimi){
            check = true ;
        }else{
            this.scene("login" , this) ;
        }
        return check ;
    },
    connect:function(){
        /**
         * 登录成功后，创建 Socket链接，
         */
        if(cc.beimi.socket != null){
            cc.beimi.socket.disconnect();
            cc.beimi.socket = null ;
        }
        cc.beimi.socket = window.io.connect(cc.beimi.http.wsURL + '/bm/game');
        cc.beimi.socket.ondisconnect = function(){
              console.log('user disconnected');
        };
        return cc.beimi.socket ;
    },
    disconnect:function(){
        if(cc.beimi.socket != null){
            cc.beimi.socket.disconnect();
            cc.beimi.socket = null ;
        }
    },
    getCommon:function(common){
        var object = cc.find("Canvas/script/"+common) ;
        return object.getComponent(common);
    },
    loadding:function(){
        if(cc.beimi.loadding.size() > 0){
            this.loaddingDialog = cc.beimi.loadding.get();
            this.loaddingDialog.parent = cc.find("Canvas");

            this._animCtrl = this.loaddingDialog.getComponent(cc.Animation);
            var animState = this._animCtrl.play("loadding");
            animState.wrapMode = cc.WrapMode.Loop;
        }
    },
    alert:function(message){
        if(cc.beimi.dialog.size() > 0){
            this.alertdialog = cc.beimi.dialog.get();
            this.alertdialog.parent = cc.find("Canvas");
            let node = this.alertdialog.getChildByName("message") ;
            if(node!=null && node.getComponent(cc.Label)){
                node.getComponent(cc.Label).string = message ;
            }
        }
    },
    alert2:function(message){
        if(cc.beimi.alert.size() > 0){
            this.alertdialog2 = cc.beimi.alert.get();
            this.alertdialog2.parent = cc.find("Canvas");
            let node = this.alertdialog2.getChildByName("message") ;
            if(node!=null && node.getComponent(cc.Label)){
                node.getComponent(cc.Label).string = message ;
            }
        }
    },
    closeloadding:function(){
        cc.beimi.loadding.put(cc.find("Canvas/loadding"));
    },
    closealert:function(){
        cc.beimi.dialog.put(cc.find("Canvas/alert"));
    },
    scene:function(name , self){
        cc.director.preloadScene(name, function () {
            if(cc.beimi){
                self.closeloadding(self.loaddingDialog);
            }
            cc.director.loadScene(name);
        });
    },
    root:function(){
        return cc.find("Canvas");
    },
    decode:function(data){
        var cards = new Array();

        if(!cc.sys.isNative) {
            var dataView = new DataView(data);
            for(var i= 0 ; i<data.byteLength ; i++){
                cards[i] = dataView.getInt8(i);
            }
        }else{
            var Base64 = require("Base64");
            var strArray = Base64.decode(data) ;

            if(strArray && strArray.length > 0){
                for(var i= 0 ; i<strArray.length ; i++){
                    cards[i] = strArray[i];
                }
            }
        }

        return cards ;
    },
    parse(result){
        var data ;
        if(!cc.sys.isNative){
            data = result;
        }else{
            data = JSON.parse(result) ;
        }
        return data ;
    },
    reset:function(data , result){
        //放在全局变量
        if ( data.token ) {
            if ( data.token.id ) {
                cc.beimi.authorization = data.token.id;
            } else {
                cc.beimi.authorization = data.token;
            }
        };
    
        if(data.data){
            cc.beimi.user = data.data ;
        }
        if(data.playUser){
            cc.beimi.user = data.playUser;
        }
        
        if(data.game){
            cc.beimi.games = data.games ;
        }
        cc.beimi.playway = null ;
        this.io.put("userinfo" ,result );
    },
    logout:function(){
        if(cc.beimi.dialog != null){
            cc.beimi.dialog.destroy();
            cc.beimi.dialog = null ;
        }
        cc.beimi.authorization = null ;
        cc.beimi.user = null ;
        cc.beimi.games = null ;

        cc.beimi.playway = null ;

        this.disconnect();
    },
    socket:function(){
        let socket = cc.beimi.socket ;
        if(socket == null){
            socket = this.connect();
        }
        return socket ;
    },
    map:function(command, callback){
        this.routes[command] = callback || function(){};
    },
    route:function(command){
        return this.routes[command] || function(){};
    },
    talkPlay:function(){},
    talkRecord:function(){},
    ab2str: function(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    },
    str2ab: function(str) {
        var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
        var bufView = new Uint8Array(buf);
        for (var i=0, strLen=str.length; i<strLen; i++) {
             bufView[i] = str.charCodeAt(i);
        }
        return buf;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
