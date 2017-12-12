// GameBase = {};
// GameBase.gameModel = 'ch';
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
        let LYAudio;
        let he = this;
        if(!cc.sys.isNative && cc.sys.isMobile){
            var canvas = this.node.getComponent(cc.Canvas);
            canvas.fitHeight = true;
            canvas.fitWidth = true;
        }
        // var bmc = new Common();
        //bmc.login();
        //预加载majiang场景
        cc.director.preloadScene('majiang');
        
         this.initMgr();   
         if(cc.beimi.browserType=="wechat"){
            LYAudio = require('ShareWx');
            cc.beimi.LYAudio = new ShareWx();
            cc.beimi.LYAudio.init();

        }else if(cc.beimi.browserType == 'chrome'){
            LYAudio = require('LYAudio');
            cc.beimi.LYAudio = new LYAudio();
            cc.beimi.LYAudio.init();
        }      
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
        let he = this;
        if(cc.beimi == null){
            cc.beimi = {};
            cc.beimi.http = require("HTTP");
            cc.beimi.seckey = "beimi";
            cc.beimi.browserType =  cc.sys.browserType; 
            cc.beimi.LYAudio =null;
            cc.beimi.dialog = null ;
            cc.beimi.dialogtwo = null;
            cc.beimi.paystatus = null ;
            //cc.beimi.audiocontext = new (window.AudioContext || window.webkitAudioContext)();
            
            cc.beimi.loadding = new cc.NodePool();
            cc.beimi.loadding.put(cc.instantiate(this.loaddingPrefab)); // 创建节点

            cc.beimi.dialog = new cc.NodePool();
            cc.beimi.dialog.put(cc.instantiate(this.alertPrefab)); // 创建节点

            var Audios = require("Audios");
            cc.beimi.audio = new Audios();
            cc.beimi.audio.init();
            
            if(cc.sys.isNative){
                window.io = SocketIO;
            }else{
                window.io = require("socket.io");
            }
            if(cc.sys.localStorage.getItem('nobgm') != 'true'){
                cc.beimi.audio.playBGM("bgMain.mp3");
            }

        }

    },
 
   
    

});
