var Common = require("common");
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
        _progress:0.0,
        _splash:null,
        _isLoading:false,
        loaddingPrefab: {
            default: null,
            type: cc.Prefab
        },
        alertPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var canvas = this.node.getComponent(cc.Canvas);
            canvas.fitHeight = true;
            canvas.fitWidth = true;
        }
        this.initMgr();
        var bmc = new Common();
        //bmc.login();
        console.log(cc.beimi.userId);
        //预加载majiang场景
        cc.director.preloadScene('majiang');
    },
    start:function(){
        var self = this;
        var SHOW_TIME = 3000;
        var FADE_TIME = 500;
        /***
         * 
         * 控制登录界面或者广告首屏界面显示时间
         * 
         */
    },
    
    initMgr:function(){
        if(cc.beimi == null){
            cc.beimi = {};
            cc.beimi.http = require("HTTP");
            cc.beimi.seckey = "beimi";
            cc.beimi.wx = document.createElement('script') ;
            cc.beimi.wx.async = true;
            cc.beimi.wx.src ='http://res.wx.qq.com/open/js/jweixin-1.2.0.js';

            cc.beimi.dialog = null ;
            cc.beimi.dialogtwo = null;
            cc.beimi.paystatus = null ;

            cc.beimi.loadding = new cc.NodePool();
            cc.beimi.loadding.put(cc.instantiate(this.loaddingPrefab)); // 创建节点

            cc.beimi.dialog = new cc.NodePool();
            cc.beimi.dialog.put(cc.instantiate(this.alertPrefab)); // 创建节点

            var Audio = require("Audio");
            cc.beimi.audio = new Audio();
            cc.beimi.audio.init();

            if(cc.sys.isNative){
                window.io = SocketIO;
            }else{
                window.io = require("socket.io");
            }
            cc.beimi.audio.playBGM("bgMain.mp3");
            cc.beimi.audio.setSFXVolume(0.5);
        }
    },
   

});
