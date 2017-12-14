var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

    properties: {
        tape:cc.Button,
        tape2: cc.Button
    },

    // use this for initialization
    onLoad: function () {
        this.init();
    },
    init: function(){
        let selfs = this;
        this.talk =false;

        this.recordTimer = 0;
        if(cc.beimi.GameBase.gameModel == 'wz'){
            this.descNametitle = "首游宝-温州棋牌";
            this.urlType = "toWZAuth";
        }else{
            this.descNametitle = "巡天游-心缘长春";
            this.urlType = "toCHAuth";
        }

       
        if(cc.beimi.room!=null){
            this.urlAppend = '?roomNum='+cc.beimi.room;
            this.descName = cc.beimi.user.nickname+"邀请您加入房间:"+cc.beimi.room+",开始游戏！";
        }else{
            this.urlAppend = '';
            this.descName ="你的好友邀请您一起游戏";
        }
        cc.beimi.http.httpPost("/wxController/getWxConfig",{url:window.location.href}, this.sucess , this.error , this);
    },
    sucess:function(result,object){
        let he = this;
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
                title: he.descNametitle,
                desc: he.descName,
                link: 'http://game.bizpartner.cn/wxController/'+he.urlType+he.urlAppend,
                imgUrl: cc.beimi.user.headimgurl,
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
                title: he.descNametitle,
                link: 'http://game.bizpartner.cn/wxController/'+he.urlType+he.urlAppend,
                imgUrl: cc.beimi.user.headimgurl,
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

    //停止录音
    touchendClick: function (event) {
        var share = this ;
        cc.find('Canvas/录音/发送语音2').active =false;
        share.END = new Date().getTime();
        let time = new Date(share.end - share.start).getSeconds();
        if(time > 3){
            wx.stopRecord({
                success: function (res) {
                  //录音上传到微信服务器
                wx.uploadVoice({
                    localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        //复制微信服务器返回录音id
                        let socket = share.socket();
                        socket.emit('sayOnSound',JSON.stringify({
                            userid : cc.beimi.user.id,
                            serverId : res.serverId,
                            start : share.START,
                            end : share.END
                        })) ;
                        //cc.beimi.serverId = res.serverId;
                    }
                });
            },
                fail: function (res) {
                    cc.find('Canvas/录音/发送语音1').active =true;
                    setTimeout(function(){
                      cc.find('Canvas/录音/发送语音1').active =false;                
                    },1000);
                  //alert(JSON.stringify(res));
                }
            });
        }else{
            cc.find('Canvas/录音/发送语音1').active =true;
            setTimeout(function(){
              cc.find('Canvas/录音/发送语音1').active =false;                
            },1000);
        }
    },
    talkClick: function(wxButton){
        if(this.t){
            clearTimeout(this.t); 
            this.time = 15;
            this.wxButton.node.children[1].children[0].children[1].getComponent(cc.Label).string = 15;
        }
        var share = this;
        this.wxButton = wxButton;
        var wxButton = wxButton;
        if(share.talk == true){
            share.talk = false;
            wxButton.node.children[1].active = false ;
            wxButton.node.children[0].active = true ;         
            //cc.find('Canvas/录音/发送语音2').active =false;
            share.END = new Date().getTime();
            wx.stopRecord({
                success: function (res) {
                    console.log(res);
                    console.log('-------')
                    //录音上传到微信服务器
                    wx.uploadVoice({
                        localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                           
                            //复制微信服务器返回录音id
                            let socket = share.socket();
                            socket.emit('sayOnSound',JSON.stringify({
                                userid : cc.beimi.user.id,
                                serverId : res.serverId,
                                start : share.START,
                                end : share.END
                            })) ;
                            //cc.beimi.serverId = res.serverId;
                        }
                    });
                }
            });
        }else{
            share.talk = true;
            wxButton.node.children[1].active = true ;
            this.time = 15;
            wxButton.node.children[0].active = false ;     

            //cc.find('Canvas/录音/发送语音2').active =true;
            share.START = new Date().getTime();
    
            share.recordTimer = setTimeout(function(){
                wx.startRecord({
                    success: function(){
                        localStorage.rainAllowRecord = 'true';
                    },
                    cancel: function () {
                        alert('用户拒绝授权录音');
                    }
                });
            },300);
        }
        this.t = setInterval(function(){share.settime()},1000)  ; 
    },
    settime: function(){
        this.time = this.time -1 ; 
        if(this.time == 0 ){
            this.talkClick(this.wxButton);
            clearTimeout(this.t);              
        }else{
            this.wxButton.node.children[1].children[0].children[1].getComponent(cc.Label).string = this.time;
        }
      
    },
    talkPlay: function(datas){
        wx.downloadVoice({
            serverId: datas.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                //dz.active = false;
                wx.playVoice({
                    localId: res.localId // 需要播放的音频的本地ID，由stopRecord接口获得
                });
            }
        });
    }
});
