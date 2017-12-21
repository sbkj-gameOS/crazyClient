var array =[]
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
        text:cc.Label,
        notice: cc.Label
    },
    
    // use this for initialization
    onLoad: function () {
        array = [];
        var a =require('heading');
    },
    clickNum: function(event){
        var num = event.currentTarget.name;
        console.log(num);
        array.push(num);
        this.text.string = array.join('');
    },
    clickback:function(){
        array.pop();
        this.text.string = array.join('');
    },
    click:function(){
        var money = Number(this.text.string);
	    //cc.beimi.money = 1000.00;
        if(money<10){
            this.notice.string = '提现金额不能小于10元';
        }else{
            if(money > cc.beimi.money){
                this.notice.string='余额不足';
            }else{
                if(cc.beimi.authorization!=null){
                    cc.beimi.http.httpGet('/presentapp/appForCash?token='+cc.beimi.authorization+'&amountMoney='+money,this.success,this.error,this);
                }   
            }
        }
    },   
    success: function(result,object){
        var data = JSON.parse(result);
        array = [];
        object.text.string = array.join('');
        if(data.success =='true'||data.success == true){
            object.alert2('申请成功！24小时审核到账微信钱包...');
        }else if(data.msg){
            object.alert2(data.msg);
        }
        
    },
    error: function(result,object){
        object.alert2('申请失败');
    },
    closeBtn:function(){
        var closrBtn = cc.find("Canvas/heading/js/heading/right");
        closrBtn.destroy();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
