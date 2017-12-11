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
        if(typeof(navigator.mediaDevices.getUserMedia )!= 'undefined'){
            cc.sys.localStorage.setItem('LY','h5');
            cc.promise=navigator.mediaDevices.getUserMedia({audio:true});
            cc.promise.then(function(stream){
            cc.recorder=new MediaRecorder(stream);
            cc.recorder.ondataavailable=function(event){
                //收集媒体设备 获得到的 可以使用的 媒体流数据
                console.log(event.data)
                var file = new FileReader();
                file.readAsArrayBuffer(event.data);
                console.log(file);
                file.onloadend = function() {              
                    let ab = he.ab2str(file.result);
                    let socket = he.socket();
                    socket.emit('sayOnSound',JSON.stringify({
                        userid : cc.beimi.user.id,
                        file : ab,
                        start : he.START,
                        end : he.END
                    }))}
                }
             });
        }else if(wx !=null){
            cc.sys.localStorage.setItem('LY','wx');
            
        }else{
            cc.sys.localStorage.setItem('LY','null');
        }
        if(cc.beimi == null){
            cc.beimi = {};
            cc.beimi.http = require("HTTP");
            cc.beimi.seckey = "beimi";

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
            cc.beimi.talkPlay = function(data){
                let str =  he.str2ab(data.file);
                console.log(blob);    
                var aud = new Audio();
                var blob = new Blob([str],{'type':'video/webm'}) ;
                console.log(blob) ;
                aud.src = URL.createObjectURL(blob);
                aud.play() ;            
            },
            cc.beimi.talkRecordStart = function(){
                he.START = new Date().getTime();
                cc.recorder.start();
            }
            cc.beimi.talkRecordEnd = function(){
                if(cc.recorder.state != 'inactive'){
                    he.END = new Date().getTime(); 
                    cc.recorder.stop();
                } 
            }
        }

    },
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
   
    

});
