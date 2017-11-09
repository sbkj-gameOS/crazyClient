cc.Class({
    extends: cc.Component,

    properties: {
        typeStatus:0,
    },

    // use this for initialization
    onLoad: function () {
        this.urlAppend = '';
        if(this.typeStatus == 1){//游戏首页分享
            this.urlAppend = '';
            this.descName = "心缘长春棋牌";
        }else if(this.typeStatus == 2){//游戏中点击分享传递房间号参数
            this.urlAppend = '?roomNum='+cc.beimi.room;
            this.descName = "加入房间："+cc.beimi.room+",开始游戏！";
        }
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
                    'onMenuShareAppMessage'
                ]
            });

         // 2. 分享接口
        wx.ready(function(){

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
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
