var beiMiCommon = require("BeiMiCommon");
var moShi = "2",playerData = "both@@",userType = "4";
cc.Class({
    extends: beiMiCommon,
    properties: {
        model:{
            default:null,
            type: cc.Node,
        },
        playway:{
            default:null,
            type: cc.Node,
        },
        people:{
            default:null,
            type: cc.Node,
        },
        notice:{
            default: null,
            type : cc.Node
        },
        alert23: cc.Node,
        message: cc.Label,
        shopping: cc.Prefab
    },
	
	//创建房间-模式类型值选择
	radioButtonClicked: function(toggle) {
		var moShiId = toggle.node.name;
		if(moShiId == "toggle1"){
			moShi = "2";
		}else if(moShiId == "toggle2"){
			moShi = "4";
		}else if(moShiId == "toggle3"){
			moShi = "8";
		}
    },
	
	//创建房间-玩法类型值选择
	checkBoxClicked: function (toggle) {
		if(toggle.isChecked){
			playerData += toggle.node.name+"@@";
		}else{
			playerData = playerData.replace(toggle.node.name+"@@","");
		}
    },
	
	//创建房间-人数类型选择
	radioButtonClickedUser: function(toggle) {
		var moShiId = toggle.node.name;
		if(moShiId == "toggle1"){
			userType = "4";
		}else if(moShiId == "toggle2"){
			userType = 3;
		}else if(moShiId == "toggle3"){
            userType = 2;
        }
    },

    onLoad: function () {
        this.messages = '';
        moShi = "2";
        playerData = "both@@";
        userType = "4";
    },

    //创建房间点击按钮
    createRoom(){
		//console.log("模式类型:"+moShi + "玩法:"+playerData +"人数:"+ userType);//模式类型moShi 玩法playerData  人数userType
         var garams ={};
		 //模式类型
         garams.modeltype = moShi;
         playerData = 'both@@xjmissile@@sfmissile@@xdszl@@bandgap@@';
         playerData = playerData.split("@@");
		 playerData.pop();
		 //玩法类型
         garams.waytype = playerData;
         //人数
         garams.pepNums = userType;
		 //游戏玩法
         garams.game = 'CH';
		//token值
         if(cc.beimi.authorization){
             garams.token = cc.beimi.authorization;
         }
         //console.log(garams);
         this.loadding();
         cc.beimi.http.httpPost('/api/room/create',garams,this.sucess,this.error,this);
         
    },
    sucess: function(result,object){
        
        var data = JSON.parse(result);
        //playerNum,cardNum
        if(data.room&&data.playway){
            cc.beimi.room = data.room;
            cc.beimi.playway = data.playway;
            if(data.playerNum){
                cc.beimi.playerNum = data.playerNum;
            }
            if(data.cardNum){
                cc.beimi.cardNum = data.cardNum;
            }
            if(data.maxRound){
                cc.beimi.maxRound = data.maxRound;
            }
            cc.director.loadScene("majiang");
        }else if(data.error){
            object.Alertnotice(data.msg); 
            if(cc.beimi.user.cards == 0 ){
                cc.beimi.dialog.destroy();
                cc.beimi.dialog = null ;
                cc.beimi.dialog = cc.instantiate(object.shopping);
                cc.beimi.dialog.parent = cc.find('Canvas')
            }
        }else{
            object.Alertnotice('请求失败');
        }  
    },
    error:function(object){
        object.Alertnotice('连接出错'); 
    },
    closeClick:function(){
        this.alert23.active = false ;
        cc.beimi.dialog.destroy();
        cc.beimi.dialog = null ;
    },
    Alertnotice: function(str){
        this.alert23.active = true;
        this.closeloadding();  
        this.message.string = str;   
    }
});