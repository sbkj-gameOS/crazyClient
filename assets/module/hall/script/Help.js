var selectlastToggle;
cc.Class({
    extends: cc.Component,

    properties: {
        selectOne:{
            default:null,
            type:cc.Toggle,
        },
        ccmjPlery:{
            default:null,
            type:cc.Node,
        },
        tpmjPlery:{
            default:null,
            type:cc.Node,
        },
        wzlogo:cc.Node,
        chlogo:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.beimi.GameBase.gameModel =='wz'){
            this.wzlogo.active =true;
            this.tpmjPlery.active =true;
        }else{
            this.selectOne.active =true;
            this.ccmjPlery.active =true;
        }
        this.colorWhite = new cc.Color(255, 255, 255);//白色
        this.colorBrown = new cc.Color(255, 255, 255);//棕色
        //设置第一个选中的状态
        selectlastToggle = this.selectOne;
    },
    toggleClick: function(toggle) {
        //当前选中文字颜色切换白色
        toggle.node.children[2].color = this.colorWhite;
        //上一个选中文字颜色切换白色
        selectlastToggle.node.children[2].color = this.colorBrown;
        var moShiId = toggle.node.name;
        if(moShiId == "台炮麻将"){
            //清空原有数据
            this.tpmjPlery.active = true;
            this.ccmjPlery.active = false;
        }else if(moShiId == "长春麻将"){
            //清空原有数据
            this.tpmjPlery.active = false;
            this.ccmjPlery.active = true;
        }
        selectlastToggle = toggle;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
