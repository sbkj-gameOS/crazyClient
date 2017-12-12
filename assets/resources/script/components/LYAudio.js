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
        this.init();
    },
    init: function(){
        let he = this ;
        this.START = 0;
        this.END = 0;
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
                })
            )}
        }
    });
    },
    talkPlay: function(data){
        if(typeof(data) == 'string'){
            let str =  this.str2ab(data);
            var aud = new Audio();
            var blob = new Blob([str],{'type':'video/webm'}) ;
            aud.src = URL.createObjectURL(blob);
            if(aud.play){
                aud.play() ;
            } 
        }  
    },
    talkRecordStart: function(){
        this.START = new Date().getTime();
        cc.recorder.start();
    },
    talkRecordEnd : function(){
        if(cc.recorder.state != 'inactive'){
            this.END = new Date().getTime(); 
            cc.recorder.stop();
        } 
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
