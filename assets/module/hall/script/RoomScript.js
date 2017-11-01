var beiMiCommon = require("BeiMiCommon");

var roomNum;
var moShi = 1,playerData = "点泡泡三家@@",userType = 1;
cc.Class({
    extends: beiMiCommon,

    properties: {
		singleLineText: {
            default: null,
            type: cc.EditBox,
        },
		message:{
			default: null,
            type: cc.Label
		},
		ganmeBtn:{
			default: null,
            type: cc.Node
		},
		mask:{
			default: null,
            type: cc.Mask
		},
		radioButton: {
            default: [],
            type: cc.Toggle
		},
		joinRoom:{
			default:null,
			type: cc.Prefab
		},
		creatRoom:{
			default:null,
			type:cc.Prefab
		},
		userProtocol:{
            default:null,
            type: cc.Prefab
        },
		bshall:{
			default:null,
			type:cc.Prefab
		},
		backRoomImg:{
			default:null,
			type:cc.SpriteFrame
		},
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
    },
	//加入房间-监听输入框值
	singleLineEditBoxDidChanged: function(text, sender) {
        //cc.log(sender.node.name + " single line editBoxDidChanged: " + text);
		roomNum = text;
    },
	//创建房间-模式类型值选择
	radioButtonClicked: function(toggle) {
		var moShiId = toggle.node.name;
		if(moShiId == "toggle1"){
			moShi = 1;
		}else if(moShiId == "toggle2"){
			moShi = 2;
		}else if(moShiId == "toggle3"){
			moShi = 3;
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
	//创建房间-模式类型值选择
	radioButtonClickedUser: function(toggle) {
		var moShiId = toggle.node.name;
		if(moShiId == "toggle1"){
			userType = 1;
		}else if(moShiId == "toggle2"){
			userType = 2;
		}
    },

   

	onLoad: function () {
		this.message.string = "恭喜您已赢得一张周赛卡。";
        this.gundongText();
		//请求获取当前用户是否已经参加了房间
        cc.beimi.http.httpGet('/api/room/reConnection?token='+cc.beimi.authorization,this.roomSuccess,this.roomError,this);
    },
	//滚动公告字幕
	gundongText:function(){
		var self = this;
		setTimeout(function(){
			var notifyRes = JSON.parse(cc.sys.localStorage.getItem('notify'));
			var gundongNode = cc.find("Canvas/message");
			if(notifyRes != null){
				if(gundongNode){
					gundongNode.active = true;
				}
				self.message.string = notifyRes;
			}else{
				if(gundongNode){
					gundongNode.active = false;
				}
			}
			var text = self.message;
			var width = self.mask.node.width;
			text.node.runAction(cc.repeatForever(cc.sequence(
				cc.moveTo(text.node.width/width*10,cc.p(-text.node.width-width/5,text.node.y)),
				cc.callFunc(function(){
					text.node.x = width;
				})
			)));

		},300);
	},
	//返回
	backRoom:function(){
		cc.director.loadScene('gameMain');
	},
	//创建包厢
	createRoom:function(){
		if(roomNum){
			cc.director.loadScene('majiang');
		}else{
			cc.beimi.dialog = cc.instantiate(this.creatRoom) ;
        	cc.beimi.dialog.parent = this.root();
		}
		//cc.director.loadScene('createRoom');
		
	},
	//加入包厢
	joinInRoom:function(){
		if(roomNum){
			cc.director.loadScene('majiang');
		}else{
			cc.beimi.dialog = cc.instantiate(this.joinRoom) ;
	        cc.beimi.dialog.parent = this.root();
      	}
	},
	jjbshall:function(){
		// cc.director.loadScene('joinInRoom');
		cc.beimi.dialog = cc.instantiate(this.bshall) ;
        cc.beimi.dialog.parent = this.root();
      
	},
	jjclick: function(){
        var room ={};
        
        if(cc.beimi.authorization){
            room.token = cc.beimi.authorization;
            cc.beimi.http.httpPost('/api/room/match',room,this.JJsucess,this.JJerror,this);
        }else{

            this.notice.getComponent('cc.Label').string ='not found token';
        }   
        
    },
	JJsucess: function(result,object){
        var data = JSON.parse(result);
        if(data.playway){
            cc.beimi.playway = data.playway;
            cc.director.loadScene('majiang');
        }else{
            object.alert('加入失败');
        }     
    },
    JJerror: function(object){
        object.alert('加入失败，请重试');
    },
	roomSuccess: function(result,object){
        if(result.room){
        	roomNum = result.room;
        	//cc.beimi.room = result.room;
            cc.beimi.playway = result.playway;
            var sprite = object.ganmeBtn.getComponent(cc.Sprite);
        	sprite.spriteFrame = object.backRoomImg;
        }
        
    },
    roomError: function(object){
        object.alert("网络异常");
    },
	//加入包厢点击事件
	buttonClicked: function() {
		cc.log("房间号："+roomNum);
	},
});