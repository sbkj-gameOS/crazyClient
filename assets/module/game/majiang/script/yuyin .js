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
        tape:cc.Button,
        wxButton:cc.Button,
    },

    // use this for initialization
    onLoad: function () {
         // 按下开始录音
        this.tape.node.on('touchstart', this.touchstartClick2, this);
        //松手结束录音
        this.tape.node.on('touchend', this.touchendClick2, this);
        this.tape.node.on('touchmove',this.touchendClick2, this);    
    },
    touchstartClick2:function(){
        cc.find('Canvas/录音/发送语音2').active =true;        
        cc.beimi.WXorBlow.talkRecordStart();
    },
    touchendClick2:function(){
        cc.find('Canvas/录音/发送语音2').active =false;
        cc.beimi.WXorBlow.talkRecordEnd();
    },
    wxClick: function(){
        cc.beimi.WXorBlow.talkClick(this.wxButton);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
