var beiMiCommon = require("BeiMiCommon");

var roomNum;
var moShi = 1,playerData = "点泡泡三家@@",userType = 1;
cc.Class({
    extends: beiMiCommon,

    properties: {
		alertaa: cc.Node,		
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
		jjhall:cc.Prefab,
		tongzhi: cc.Prefab,
		paiming: cc.Prefab
		
		
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
		if(cc.beimi.GameBase.gameModel == 'wz'){
			this.message.string = '本软件为好友竞技休闲游戏，敬请各位玩家注意健康娱乐，禁止赌博！';
		}else if(cc.beimi.GameBase.gameModel == 'ch'||cc.beimi.GameBase.gameModel == 'CH'){
			this.message.string = "本游戏仅供娱乐，严禁赌博。   每月定期举办周赛、月赛，冠军赢万元大奖。";
		}
		
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
			cc.beimi.room = roomNum;
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
			cc.beimi.room = roomNum;
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
	tongzhihall:function(){
		// cc.director.loadScene('joinInRoom');
		cc.beimi.dialog = cc.instantiate(this.tongzhi) ;
        cc.beimi.dialog.parent = this.root();
      
	},
	paiminghall:function(){
		// cc.director.loadScene('joinInRoom');
		cc.beimi.dialog = cc.instantiate(this.paiming) ;
        cc.beimi.dialog.parent = this.root();
      
	},
	jjjjbshall:function(){
		// cc.director.loadScene('joinInRoom');
		cc.beimi.dialog = cc.instantiate(this.jjhall) ;
        cc.beimi.dialog.parent = this.root();
      
	},	jjclick: function(){
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
		result = JSON.parse(result);
		console.log('--------')
		console.log(result);
        if(result.room){
			roomNum = result.room;
			//playerNum,cardNum
        	//cc.beimi.room = result.room;
			cc.beimi.playway = result.playway;
			if(result.match){
                cc.beimi.match = result.match ; 
            }
			if(result.maxRound){
                cc.beimi.maxRound = result.maxRound;
            }
			if(result.playerNum){
                cc.beimi.playerNum = result.playerNum;
            }
            if(result.cardNum){
                cc.beimi.cardNum = result.cardNum;
            }
            var sprite = object.ganmeBtn.getComponent(cc.Sprite);
        	sprite.spriteFrame = object.backRoomImg;
        } else {
			roomNum = null;
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