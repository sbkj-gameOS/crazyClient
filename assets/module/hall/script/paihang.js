var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

    properties: {
        xiangxi: cc.Prefab,
        web: cc.WebView,

    },

    // use this for initialization
    onLoad: function () {
       this.web.url = cc.beimi.url+ '/situation/goRankingPage?token='+cc.beimi.authorization;
        
    },
    init:function(){

    },
    click: function(){
        cc.beimi.dialog1 = cc.instantiate(this.xiangxi) ;
        cc.beimi.dialog1.parent = this.root();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
