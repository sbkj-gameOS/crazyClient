var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

    properties: {
        LGjushu:{
            default: null,
            type : cc.Node
        },
        LGPeople2:{
            default: null,
            type : cc.Node
        },
        LGPeople3:{
            default: null,
            type : cc.Node
        },
        TPPlayerTwoF:{
            default: null,
            type : cc.Node
        },
        TPPlayer15:{
            default: null,
            type : cc.Node
        },
        TPPlayer13:{
            default: null,
            type : cc.Node
        },
        TPPlayer10:{
            default: null,
            type : cc.Node
        },
        TPText:{
            default: null,
            type : cc.RichText
        },
        LGText:{
            default: null,
            type : cc.RichText
        },
    },

    // use this for initialization
    onLoad: function () {
        //龙港数据初始化
        this.LGPlayer = '经典';
        this.LGPlayer2 = '3-6-9-12';
        this.LGUser = '4';
        this.LGJuShu = '8局';
        //台炮数据初始化
        this.TPPlayer = '大炮';
        this.TPTwoF = '';
        this.TPTaiFanD = '15台番';
        this.TPTaiFanX = '10台番';
        this.TPQiHu = '不限起胡';
        this.TPUser = '4';
        this.TPPayType = '房主支付';
        this.TPJuShu = '8局';
    },
    //玩法类型值选择
    checkBoxClicked: function (toggle,data) {
        if(data == 'TP'){
            //炮
            if(toggle.node.name.indexOf("炮") > 0){
                this.TPPlayer = toggle.node.name;
                if(toggle.node.name == '大炮'){
                    this.TPPlayer15.active = true;//15台番
                    this.TPPlayer13.active = true;//13台番
                    this.TPPlayerTwoF.active = true;//双翻
                    this.TPPlayer10.active = false;//10台番
                    this.TPPlayer10.setPosition(114,1);
                }else if(toggle.node.name == '小炮'){
                    this.TPPlayer15.active = false;//15台番
                    this.TPPlayer13.active = false;//13台番
                    this.TPPlayer10.active = true;//10台番
                    this.TPPlayerTwoF.active = false;//双翻
                    this.TPPlayer10.setPosition(-295,1);
                }
            }
            //台番
            if(toggle.node.name.indexOf("台番") > 0){
                if(this.TPPlayer == '大炮'){
                    this.TPTaiFanD = toggle.node.name;
                }
            }

            //起胡
            if(toggle.node.name.indexOf("起胡") > 0){
                this.TPQiHu = toggle.node.name;
            }

            //人
            if(toggle.node.name.indexOf("人") > 0){
                this.TPUser = toggle.node.name.substr(0,1);
                if(this.TPPayType == '房主支付'){
                    this.TPText.string = '<color=><b>房主支付（<color=#245503>'+this.TPUser+'张</c>）房卡</b></c>';
                }else if(this.TPPayType == 'AA支付'){
                    this.TPText.string = '<color=><b>人均支付（<color=#245503>1张</c>）房卡</b></c>';
                }
                
            }

            //支付
            if(toggle.node.name.indexOf("支付") > 0){
                this.TPPayType = toggle.node.name;
                if(this.TPPayType == '房主支付'){
                    this.TPText.string = '<color=><b>房主支付（<color=#245503>'+this.TPUser+'张</c>）房卡</b></c>';
                }else if(this.TPPayType == 'AA支付'){
                    this.TPText.string = '<color=><b>人均支付（<color=#245503>1张</c>）房卡</b></c>';
                }
            }

            //局
            if(toggle.node.name.indexOf("局") > 0){
                this.TPJuShu = toggle.node.name;
            }

        }else if(data == 'LG'){
            //玩法
            if(toggle.node.name == '经典'){
                this.LGPlayer = toggle.node.name;
                this.LGjushu.active = true;
                this.LGPeople2.active = true;
                this.LGPeople3.active = true;
            }else if(toggle.node.name == '一蛊'){
                this.LGPlayer = toggle.node.name;
                this.LGjushu.active = false;
                this.LGPeople2.active = false;
                this.LGPeople3.active = false;
                this.LGUser = '4';
                this.LGText.string = '<color=><b>人均支付（<color=#245503>1张</c>）房卡</b></c>';
            }
            if(toggle.node.name.indexOf("-") > 0){
                this.LGPlayer2 = toggle.node.name;
            }

            //人
            if(toggle.node.name.indexOf("人") > 0){
                this.LGUser = toggle.node.name.substr(0,1);
            }

            //局
            if(toggle.node.name.indexOf("局") > 0){
                this.LGJuShu = toggle.node.name;
                if(this.LGJuShu == '8局'){
                    this.LGText.string = '<color=><b>人均支付（<color=#245503>1张</c>）房卡</b></c>';
                }else if(this.LGJuShu == '16局'){
                    this.LGText.string = '<color=><b>人均支付（<color=#245503>2张</c>）房卡</b></c>';
                }else if(this.LGJuShu == '40局'){
                    this.LGText.string = '<color=><b>人均支付（<color=#245503>5张</c>）房卡</b></c>';
                }
            }

        }
    },
    //双番
    checkBoxTwoClicked: function (toggle) {
        if(toggle.isChecked){
            this.TPTwoF = toggle.node.name;
        }else{
            this.TPTwoF = '';
        }
    },
    //台炮创建房间
    TPCreateRoomBtn:function(){
        if(this.TPPlayer == '大炮'){
            this.TPTaiFan = this.TPTaiFanD;
        }else{
            this.TPTaiFan = this.TPTaiFanX;
        }
        this.loadding();
        var garams ={};
        //模式类型
         garams.modeltype = '2-part';
         //玩法类型
         garams.waytype = '点泡泡三家';
         //人数
         garams.pep_nums = '4-pep';
        //token值
         if(cc.beimi.authorization){
             garams.token = cc.beimi.authorization;
         }
        cc.beimi.http.httpPost('/api/room/create',garams,this.sucess,this.error,this);
        console.log(this.TPPlayer +':' +':'+ this.TPTaiFan +':'+ this.TPQiHu +':'+ this.TPUser +':'+ this.TPPayType +':'+ this.TPJuShu);
    },
    //龙港创建房间
    LGCreateRoomBtn:function(){
        var jsonData = {};
        jsonData.LGPlayer = this.LGPlayer;
        jsonData.LGPlayer2 = this.LGPlayer2;
        jsonData.LGUser = this.LGUser;
        if(this.LGPlayer == '经典'){
            jsonData.LGJuShu = this.LGJuShu;
        }
        this.loadding();
        var garams ={};
        //模式类型
         garams.modeltype = '2-part';
         //玩法类型
         garams.waytype = '点泡泡三家';
         //人数
         garams.pep_nums = '4-pep';
        //token值
         if(cc.beimi.authorization){
             garams.token = cc.beimi.authorization;
         }
        cc.beimi.http.httpPost('/api/room/create',garams,this.sucess,this.error,this);
        console.log(JSON.stringify(jsonData));
    },
    sucess: function(result,object){
        var data = JSON.parse(result);
        if(data.room&&data.playway){
            cc.beimi.room = data.room;
            cc.beimi.playway = data.playway;
            cc.beimi.playType = 'longgang';
            cc.director.loadScene("majiang");
        }else{
            object.notice.getComponent('cc.Label').string ='请求失败';
        }  
    },
    error:function(object){
        object.notice.getComponent('cc.Label').string ='连接出错';
    }
});
