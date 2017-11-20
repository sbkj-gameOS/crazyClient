var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,
    properties: {
       price:{
           default: null,
           type : cc.Component
       },
       roomNumType:{
           default: null,
           type: cc.Node
       },
       notice:{
        default: null,
        type : cc.Node
    },
     
    },

    // use this for initialization
    onLoad: function () {
    
    },
    // getPrice:function(){
    //     var pricenode = this.price;
    //     var price = pricenode.string;
    //    // console.log(parseFloat(price));
    //     return parseFloat(price);
    // },
    getRoomNum:function(){
        if(this.roomNumType.name == 'pay1'){
            return 4;
        }
    },
    payfor: function(){
        var roomNum = this.getRoomNum();
        //判断支付金额
       
        if(roomNum <= 0) {
            this.notice.getComponent('cc.Label').string = "支付金额异常!请联系客服人员";
        }else{
            window.location.href = 'http://game.bizpartner.cn/wxController/wxPayHtml?' + '&roomNum='+roomNum+'&userId='+cc.beimi.userId+"&token="+cc.beimi.authorization;   
        }
       
    },
    payfors: function(data){
        var roomNum = data.target._name;
        console.log("房卡："+roomNum);
        //判断支付金额
        if(roomNum <= 0) {
            this.notice.getComponent('cc.Label').string = "支付金额异常!请联系客服人员";
        }else{
            window.location.href = 'http://game.bizpartner.cn/wxController/wxPayHtml?' + '&roomNum='+roomNum+'&userId='+cc.beimi.userId+"&token="+cc.beimi.authorization;   
        }
       
    },
    closeBtn:function(){
        var closrBtn;
        if(cc.beimi.shopping == 1){
            closrBtn = cc.find("Canvas/heading/js/heading/shopping");
        }else{
            closrBtn = cc.find("Canvas/shopping");
        }
        closrBtn.destroy();
    }
})