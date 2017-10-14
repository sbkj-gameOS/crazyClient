var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,
    properties: {
       price:{
           default: null,
           type : cc.Component
       },
     
    },

    // use this for initialization
    onLoad: function () {
    },
    getPrice:function(){
        var pricenode = this.price;
        var price = pricenode.string;
       // console.log(parseFloat(price));
        return parseFloat(price);
    },
    
    payfor: function(){
        
       //获取外部微信js
        var head= document.getElementsByTagName('body')[0];
        var zepto = document.createElement('script');
        zepto.type= 'text/javascript';
        zepto.src= "http://res.wx.qq.com/open/js/jweixin-1.2.0.js";
        head.appendChild(zepto);
        var price = this.getPrice();
       
        //console.log(price);
        
         //转换为 分 单位
        var orderprices = Number(price)*100 ;
        //判断支付金额
       
        if(!orderprices > 0) {
            alert("支付金额异常!请联系客服人员");
            return false;
        }
        //调用后台
        var xhr = cc.beimi.http.httpPost("/wxController/getWXPayXmlH5",{orderprices:orderprices}, this.sucess , this.error , this);
       
        // mui.getJSON('/wxController/getWXPayXmlH5',{orderprices:orderprices}, function(data) {
        //     if(data.status == 200) {
        //         console.log(JSON.stringify(data));
        //         var appid = data.appid;
        //         var timestamp = data.timeStamp;
        //         var nonceStr = data.nonceStr;
        //         var packages = data.package;
        //         var paySign = data.paySign;
        //         //交易号
        //         var trans = packages.substring(10);
                //alert(data.appid+data.timestamp+data.package+data.paySign)
//                 function onBridgeReady() {
//                     WeixinJSBridge.invoke(
//                             'getBrandWCPayRequest', {
//                                 "appId": appid, //公众号名称，由商户传入
//                                 "timeStamp": timestamp, //时间戳，自1970年以来的秒数
//                                 "nonceStr": nonceStr, //随机串
//                                 "package": packages,
//                                 "signType": "MD5", //微信签名方式：
//                                 "paySign": paySign //微信签名
//                             },
//                             function(res) {
//                                 if(res.err_msg == "get_brand_wcpay_request:ok") {
//                                     //alert("支付成功！")
//                                     // 支付成功后 修改订单状态  2代发货
//                                     mui.toast("支付成功！");

//                                     /*2017-09-28 15:23:44 已改为自动回调*/
// //									mui.post('/wxController/rechargeManagement',{
// //											userId:"",
// //                                            payAmount:0.01,
// //                                            roomCount:""
// //										},function(data){
// //											if(data.status=="200"){
// //												mui.toast("支付成功！");
// //											}
// //										},'json'
// //									); 
//                                 } else if(res.err_msg == "get_brand_wcpay_request:cancel") {
//                                     mui.toast('取消支付！ ');
//                                 } else {
//                                     mui.toast("第三方支付出现异常!请联系客服人员");
//                                 }
//                                 // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//                             }
//                     );
//                 }

//                 if(typeof WeixinJSBridge == "undefined") {
//                     if(document.addEventListener) {
//                         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
//                     } else if(document.attachEvent) {
//                         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
//                         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
//                     }
//                 } else {
//                     onBridgeReady();
//                 }
             },
        
        // });
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
       
    // },
    sucess:function(result , object){
        var data = JSON.parse(result);
        var appid = data.appid;
        var timestamp = data.timeStamp;
        var nonceStr = data.nonceStr;
        var packages = data.package;
        var paySign = data.paySign;
        //交易号
        var trans = packages.substring(10);
        function onBridgeReady() {
            WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": appid, //公众号名称，由商户传入
                        "timeStamp": timestamp, //时间戳，自1970年以来的秒数
                        "nonceStr": nonceStr, //随机串
                        "package": packages,
                        "signType": "MD5", //微信签名方式：
                        "paySign": paySign //微信签名
                    },
                    function(res) {
                        if(res.err_msg == "get_brand_wcpay_request:ok") {
                            //alert("支付成功！")
                            // 支付成功后 修改订单状态  2代发货
                            alert("支付成功！");

                            /*2017-09-28 15:23:44 已改为自动回调*/
//									mui.post('/wxController/rechargeManagement',{
//											userId:"",
//                                            payAmount:0.01,
//                                            roomCount:""
//										},function(data){
//											if(data.status=="200"){
//												mui.toast("支付成功！");
//											}
//										},'json'
//									); 
                        } else if(res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert('取消支付！ ');
                        } else {
                           alert("第三方支付出现异常!请联系客服人员");
                        }
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }
            );
        }

        if(typeof WeixinJSBridge == "undefined") {
            if(document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if(document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    }
})