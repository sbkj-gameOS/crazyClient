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
        alert2: cc.Node,
        message: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        //龙港数据初始化
        this.messages = '';        
        this.LGPlayer = 'classic';
        this.LGPlayer2 = '3-6-9-12';
        this.LGUser = '4';
        this.LGJuShu = '8';
        //台炮数据初始化
        this.TPPlayer = 'bigGun';
        this.TPTwoF = false;
        this.TPTaiFanD = '15';
        this.TPTaiFanX = '10';
        this.TPQiHu = 'unlimited';
        this.TPUser = '4';
        this.TPPayType = 'householderPay';
        this.TPJuShu = '8';
    },
    //玩法类型值选择
    checkBoxClicked: function (toggle,data) {
        if(data == 'TP'){
            //炮
            if(toggle.node.name.indexOf("Gun") > 0){
                this.TPPlayer = toggle.node.name;
                if(toggle.node.name == 'bigGun'){
                    this.TPPlayer15.active = true;//15台番
                    this.TPPlayer13.active = true;//13台番
                    this.TPPlayerTwoF.active = true;//双翻
                    this.TPPlayer10.active = false;//10台番
                    this.TPPlayer10.setPosition(114,1);
                }else if(toggle.node.name == 'smallGun'){
                    this.TPPlayer15.active = false;//15台番
                    this.TPPlayer13.active = false;//13台番
                    this.TPPlayer10.active = true;//10台番
                    this.TPPlayerTwoF.active = false;//双翻
                    this.TPPlayer10.setPosition(-295,1);
                }
            }
            //台番
            if(toggle.node.name.indexOf("tf") > 0){
                if(this.TPPlayer == 'bigGun'){
                    this.TPTaiFanD = toggle.node.name.substr(0,2);
                }
            }

            //起胡
            if(toggle.node.name.indexOf("Hu") > 0){
                this.TPQiHu = toggle.node.name.substr(0,toggle.node.name.length-2);;
            }

            //人
            if(toggle.node.name.indexOf("people") > 0){
                this.TPUser = toggle.node.name.substr(0,1);
                if(this.TPPayType == 'householderPay'){
                    this.TPText.string = '<color=><b>房主支付（<color=#245503>'+this.TPUser+'张</c>）房卡</b></c>';
                }else if(this.TPPayType == 'AAPay'){
                    this.TPText.string = '<color=><b>人均支付（<color=#245503>1张</c>）房卡</b></c>';
                }
                
            }

            //支付
            if(toggle.node.name.indexOf("Pay") > 0){
                this.TPPayType = toggle.node.name;
                if(this.TPPayType == 'householderPay'){
                    this.TPText.string = '<color=><b>房主支付（<color=#245503>'+this.TPUser+'张</c>）房卡</b></c>';
                }else if(this.TPPayType == 'AAPay'){
                    this.TPText.string = '<color=><b>人均支付（<color=#245503>1张</c>）房卡</b></c>';
                }
            }

            //局
            if(toggle.node.name.indexOf("局") > 0){
                this.TPJuShu = toggle.node.name.replace("局","");
            }

        }else if(data == 'LG'){
            //玩法
            if(toggle.node.name == 'classic'){
                this.LGPlayer = toggle.node.name;
                this.LGjushu.active = true;
                this.LGPeople2.active = true;
                this.LGPeople3.active = true;
            }else if(toggle.node.name == 'yiGu'){
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
                this.LGJuShu = toggle.node.name.replace("局","");
                if(this.LGJuShu == '8'){
                    this.LGText.string = '<color=><b>人均支付（<color=#245503>1张</c>）房卡</b></c>';
                }else if(this.LGJuShu == '16'){
                    this.LGText.string = '<color=><b>人均支付（<color=#245503>2张</c>）房卡</b></c>';
                }else if(this.LGJuShu == '40'){
                    this.LGText.string = '<color=><b>人均支付（<color=#245503>5张</c>）房卡</b></c>';
                }
            }

        }
    },
    //双番
    checkBoxTwoClicked: function (toggle) {
        if(toggle.isChecked){
            this.TPTwoF = true;
        }else{
            this.TPTwoF = false;
        }
    },
    //台炮创建房间
    TPCreateRoomBtn:function(){
        if(this.TPPlayer == 'bigGun'){
            this.TPTaiFan = this.TPTaiFanD;
        }else{
            this.TPTaiFan = this.TPTaiFanX;
        }
        this.loadding();
        var garams ={};
        //模式类型
         garams.game = 'TP';
         //玩法类型
         garams.player = this.TPPlayer;
         //台番
         garams.taiFan = this.TPTaiFan;
         //起胡
         garams.QiHu = this.TPQiHu;
         //人数
         garams.pepNums = this.TPUser;
         //支付方式
         garams.pay = this.TPPayType;
         //局
         garams.count = this.TPJuShu;
         //双翻
         garams.twoFan = this.TPTwoF;
        //token值
        if(cc.beimi.authorization){
             garams.token = cc.beimi.authorization;
        }
        cc.beimi.playType = 'TP';
        cc.beimi.http.httpPost('/api/room/create',garams,this.sucess,this.error,this);
        console.log(this.TPPlayer +':' +':'+ this.TPTaiFan +':'+ this.TPQiHu +':'+ this.TPUser +':'+ this.TPPayType +':'+ this.TPJuShu);
    },
    //龙港创建房间
    LGCreateRoomBtn:function(){
        var jsonData = {};
        jsonData.LGPlayer = this.LGPlayer;
        jsonData.LGPlayer2 = this.LGPlayer2;
        jsonData.LGUser = this.LGUser;
        if(this.LGPlayer == 'classic'){
            jsonData.LGJuShu = this.LGJuShu;
        }
        //this.loadding();
        var garams ={};
        garams.game = 'LG';
        //模式类型
         garams.player = this.LGPlayer;
         garams.player2 = this.LGPlayer2;
         //人数
         garams.pepNums = this.LGUser;
         if(this.LGPlayer == 'classic'){
            garams.count = this.LGJuShu;
        }
        //token值
        if(cc.beimi.authorization){
             garams.token = cc.beimi.authorization;
        }
        cc.beimi.playType = 'LG';
        cc.beimi.http.httpPost('/api/room/create',garams,this.sucess,this.error,this);
        console.log(JSON.stringify(jsonData));
    },
    sucess: function(result,object){
        var data = JSON.parse(result);
        if(data.room&&data.playway){
            if(data.playerNum){
                cc.beimi.playerNum = data.playerNum;
            }
            if(data.cardNum){
                cc.beimi.cardNum = data.cardNum;
            }
            if(data.maxRound){
                cc.beimi.maxRound = data.maxRound;
            }
            cc.beimi.room = data.room;
            cc.beimi.playway = data.playway;
            cc.director.loadScene("majiang");
        }else if(data.error){
            object.alert2.active = true;
            object.closeloadding();  
            object.message.string = data.msg;          
            // alert(data.msg);
            // cc.beimi.dialog.destroy();
            // cc.beimi.dialog = null ;
            // object.closeloadding();
        }else{
            object.notice.getComponent('cc.Label').string ='请求失败';
        }  
    },
    error:function(object){
        object.notice.getComponent('cc.Label').string ='连接出错';
    },
    closeClick:function(){
        this.alert2.active = false ;
        cc.beimi.dialog.destroy();
        cc.beimi.dialog = null ;
    }
});
