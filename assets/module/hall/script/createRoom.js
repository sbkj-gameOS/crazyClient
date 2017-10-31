var selectlastToggle;
cc.Class({
    extends: cc.Component,

    properties: {
        ccMjType: cc.Prefab,
        tpMjType: cc.Prefab,
        right1:{
            default:null,
            type:cc.Node,
        },
        right2:{
            default:null,
            type:cc.Node,
        },
        selectOne:{
            default:null,
            type:cc.Toggle,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.init();
        this.colorWhite = new cc.Color(255, 255, 255);//白色
        this.colorBrown = new cc.Color(122, 69, 11);//棕色
        //设置第一个选中的状态
        selectlastToggle = this.selectOne;
    },
    init:function(){
        this.right1 = cc.instantiate(this.ccMjType);
        this.right1.parent = this.node;
        this.right1.setPosition(111,-18);
        this.right2 = cc.instantiate(this.tpMjType);
        this.right2.parent = this.node;
        this.right2.setPosition(111,-18);
        this.right1.active = true;
        this.right2.active = false; 
    },
    toggleClick: function(toggle) {
        //当前选中文字颜色切换白色
        toggle.node.children[2].color = this.colorWhite;
        //上一个选中文字颜色切换白色
        selectlastToggle.node.children[2].color = this.colorBrown;
        var moShiId = toggle.node.name;
        if(moShiId == "台炮麻将"){
            this.right1.active = false;
            this.right2.active = true; 
        }else if(moShiId == "长春麻将"){
            this.right1.active = true;
            this.right2.active = false; 
        }
        selectlastToggle = toggle;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
