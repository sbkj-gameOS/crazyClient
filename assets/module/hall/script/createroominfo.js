var beiMiCommon = require("BeiMiCommon");
var moShi = "2-part",playerData = "点泡泡三家@@",userType = "4-pep";
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
    },
	
	//创建房间-模式类型值选择
	radioButtonClicked: function(toggle) {
		var moShiId = toggle.node.name;
		if(moShiId == "toggle1"){
			moShi = "2-part";
		}else if(moShiId == "toggle2"){
			moShi = "4-part";
		}else if(moShiId == "toggle3"){
			moShi = "8-part";
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
			userType = "4-pep";
		}else if(moShiId == "toggle2"){
			userType = 2;
		}
    },

    onLoad: function () {
        moShi = "2-part";
        playerData = "点泡泡三家@@";
        userType = "4-pep";
    },

    //创建房间点击按钮
    createRoom(){
		//console.log("模式类型:"+moShi + "玩法:"+playerData +"人数:"+ userType);//模式类型moShi 玩法playerData  人数userType
         var garams ={};
		 //模式类型
         garams.modeltype = moShi;
		 playerData = playerData.split("@@");
		 playerData.pop();
		 //玩法类型
         garams.waytype = playerData;
         //人数
         garams.pep_nums = userType;
		 
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
        if(data.room&&data.playway){
            cc.beimi.room = data.room;
            cc.beimi.playway = data.playway;
            cc.director.loadScene("majiang");
        }else{
            object.notice.getComponent('cc.Label').string ='请求失败';
        }  
    },
    error:function(object){
        object.notice.getComponent('cc.Label').string ='连接出错';
    }
});