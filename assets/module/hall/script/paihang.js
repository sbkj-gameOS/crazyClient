var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

    properties: {
        xiangxi: cc.Prefab,
        web: cc.WebView,
     
        zhou1:cc.Node,
        zhou2:cc.Node,
        zhou3:cc.Node,
        yue1:cc.Node,
        yue2:cc.Node,
        yue3:cc.Node,

    },

    // use this for initialization
    onLoad: function () {
       this.web.url = cc.beimi.url+ '/situation/goRankingPage?token='+cc.beimi.authorization;
       cc.beimi.http.httpGet('/situation/findPrizeCount?token='+cc.beimi.authorization,this.sucess,this.error,this)
       
        
    },
    init:function(){

    },
    sucess: function(result,object){
        var data = JSON.parse(result); 
        if(data.success||data.success == 'true'){
            if(data.monthNo1 != 0){
                object.num(data.monthNo1,object.yue1);
            }
            if(data.monthNo2 != 0){
                object.num(data.monthNo2,object.yue2);
            }
            if(data.monthNo3 != 0){
                object.num(data.monthNo3,object.yue3);
            }
            if(data.weekNo1 != 0){
                object.num(data.weekNo1,object.zhou1);
            }
            if(data.weekNo2 != 0){
                object.num(data.weekNo2,object.zhou2);
            }
            if(data.weekNo3 != 0){
                object.num(data.weekNo3,object.zhou3);
            }
        }

    },
    error: function(result,object){
        
    },
    click: function(){
        cc.beimi.dialog1 = cc.instantiate(this.xiangxi) ;
        cc.beimi.dialog1.parent = this.root();
    },
    num: function(num,weizhi){
        let pic = weizhi.getComponent(cc.Label);
        pic.string = num;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
