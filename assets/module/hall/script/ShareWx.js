cc.Class({
    extends: cc.Component,

    properties: {
        typeStatus:0,
        tape:cc.Button,
    },

    // use this for initialization
    onLoad: function () {
        this.START = 0;
        this.END = 0;
        this.recordTimer = 0;
        this.urlAppend = '';
        if(this.typeStatus == 1){//游戏首页分享
            this.urlAppend = '';
            this.descName = "心缘长春棋牌";
        }else if(this.typeStatus == 2){//游戏中点击分享传递房间号参数
            this.urlAppend = '?roomNum='+cc.beimi.room;
            this.descName = "加入房间:"+cc.beimi.room+",开始游戏！";
        }
        //按下开始录音
        this.tape.node.on('touchstart', this.touchstartClick, this);
        //松手结束录音
        this.tape.node.on('touchend', this.touchendClick, this);

        console.log("this.urlAppend:"+this.urlAppend);
        cc.beimi.http.httpPost("/wxController/getWxConfig",{url:window.location.href}, this.sucess , this.error , this);
        

    },
    sucess:function(result,object){
        result = JSON.parse(result) ;
        console.log(result);
        console.log(result.appId);
           wx.config({
                appId: result.appId,
                timestamp: result.timestamp,
                nonceStr: result.nonceStr,
                signature: result.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'startRecord', 
                    'stopRecord',
                    'translateVoice',
                    'onVoicePlayEnd',
                    'playVoice',
                    'uploadVoice','downloadVoice'
                ]
            });
        
        wx.ready(function(){

            //注册微信播放录音结束事件【一定要放在wx.ready函数内】
            wx.onVoicePlayEnd({
                success: function (res) {
                    stopWave();
                }
            });

            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareAppMessage({
                title: '心缘长春棋牌',
                desc: object.descName,
                link: 'http://game.bizpartner.cn/wxController/toWXAuth'+object.urlAppend,
                imgUrl: '',
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    console.log('用户点击发送给朋友');
                },
                success: function (res) {
                    console.log('已分享');
                },
                cancel: function (res) {
                    console.log('已取消');
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });

            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline({
                title: object.descName,
                link: 'http://game.bizpartner.cn/wxController/toWXAuth'+object.urlAppend,
                imgUrl: '',
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    console.log('用户点击分享到朋友圈');
                },
                success: function (res) {
                    console.log('已分享');
                },
                cancel: function (res) {
                    console.log('已取消');
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });
        });
    },
   error:function(object){
   },
   //开始录音
   touchstartClick: function (event) {
        this.START = new Date().getTime();

        this.recordTimer = setTimeout(function(){
            wx.startRecord({
                success: function(){
                    localStorage.rainAllowRecord = 'true';
                },
                cancel: function () {
                    alert('用户拒绝授权录音');
                }
            });
        },300);
    },
    //停止录音
    touchendClick: function (event) {
        this.END = new Date().getTime();
        wx.stopRecord({
          success: function (res) {
            //录音上传到微信服务器
            wx.uploadVoice({
                localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    //复制微信服务器返回录音id
                    cc.beimi.serverId = res.serverId;
                }
            });
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
    },
    //播放语音
    startClick:function(){
        //下载语音
        wx.downloadVoice({
            serverId: cc.beimi.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                wx.playVoice({
                    localId: res.localId // 需要播放的音频的本地ID，由stopRecord接口获得
                });
            }
        });



        // wx.playVoice({
        //     localId: res.localId // 需要播放的音频的本地ID，由stopRecord接口获得
        // });
    }
});
