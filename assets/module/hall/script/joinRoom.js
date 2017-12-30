var beiMiCommon = require("BeiMiCommon");
var array ="";
cc.Class({
    extends: beiMiCommon,

    properties: {
        num_1:{
            default:null,
            type:cc.Component
        },
        num_2:{
            default:null,
            type:cc.Component
        },
        num_3:{
            default:null,
            type:cc.Component
        },
        num_4:{
            default:null,
            type:cc.Component
        },
        num_5:{
            default:null,
            type:cc.Component
        },
        num_6:{
            default:null,
            type:cc.Component
        },
        num_7:{
            default:null,
            type:cc.Component
        },
        num_8:{
            default:null,
            type:cc.Component
        },
        num_9:{
            default:null,
            type:cc.Component
        },
        num_0:{
            default:null,
            type:cc.Component
        },
        notice:{
            default: null,
            type : cc.Node
        },
        inputNum1: {
            default: null,
            type: cc.Label
        },
		inputNum2: {
            default: null,
            type: cc.Label
        },
		inputNum3: {
            default: null,
            type: cc.Label
        },
		inputNum4: {
            default: null,
            type: cc.Label
        },
		inputNum5: {
            default: null,
            type: cc.Label
        },
		inputNum6: {
            default: null,
            type: cc.Label
        },
        cardNum:cc.Label,
        help: cc.Prefab,
        alert21: cc.Prefab,
        shopping : cc.Prefab,
        zhoupic: cc.Node,
        yuepic: cc.Node,
        zhouLab: cc.Label,
        yueLab: cc.Label,
        huise:cc.SpriteFrame,
        zhoubisai: cc.Node,
        yuebisai:cc.Node,
        ribisai:cc.Node,
        yubisai:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
         array = "";
         if(this.cardNum){
            this.cardNum.string =  cc.beimi.user.cards + '张'
         }

    
         if(this.zhoupic){
            cc.beimi.http.httpGet('/api/room/queryUserWinner?token='+cc.beimi.authorization,this.countsucess,this.counterror,this);            
         }
         //this.notice.active =false;
    },
    countsucess(result,object){

 

        var data = JSON.parse(result);
        object.zhouLab.string = data.week;
        object.yueLab.string = data.month;
        if(object.zhoubisai&&object.ribisai&&object.yuebisai){
            object.zhoubisai.getComponent(cc.Button).interactable= false;  
            object.ribisai.getComponent(cc.Button).interactable= false;
            object.yuebisai.getComponent(cc.Button).interactable= false;
        }
        if(object.yubisai){
            object.yubisai.getComponent(cc.Button).interactable= false;
        }
        // {
        //     object.zhoubisai.getComponent(cc.Button).interactable= false;
        //     var sprite = object.zhoubisai.getComponent(cc.Sprite);
        //     sprite.spriteFrame = object.huise;
        //     var sprite2 = object.yuebisai.getComponent(cc.Sprite);
        //     sprite2.spriteFrame = object.huise;
        //     
        //     var sprite3 = object.ribisai.getComponent(cc.Sprite);
        //     sprite3.spriteFrame = object.huise;
        //     object.zhoubisai.getComponent(cc.Button).interactable= false; 
        // }

        // if(data.weekMah&&data.goMah){
        //     object.zhoupic.active = false;
        // }else if(data.weekMah &&!data.goMah ){
        //     object.zhoubisai.getComponent(cc.Button).interactable= false;
        // }else if(!data.week){
        //     var sprite = object.zhoubisai.getComponent(cc.Sprite);
        //     sprite.spriteFrame = object.huise;
        //               
        // }
        // // if(Number(data.month)>=1){
        // //     object.yuepic.active = false;
        // // }else{
        //     var sprite = object.yuebisai.getComponent(cc.Sprite);
        //     sprite.spriteFrame = object.huise;
        //     object.yuebisai.getComponent(cc.Button).interactable= false;
        // // }
        
        if(cc.beimi.GameBase.gameModel!='wz'){
            if(data.activityList&&data.activityList.length>0){
                for(let i = 0 ; i < data.activityList.length ; i ++){
                    if(data.activityList[i].activiteType ==2&&data.activityList[i].isSignUp=='1'){
                        var sprite = object.ribisai.getComponent(cc.Sprite);
                        sprite.spriteFrame = object.huise;
                        object.ribisai.getComponent(cc.Button).interactable= true;
                        object.ribisai.children[0].getComponent(cc.Label).string = data.activityList[i].startTime;
                        continue;
                    }
                    if(data.activityList[i].activiteType ==3){
                        var sprite = object.zhoubisai.getComponent(cc.Sprite);
                        sprite.spriteFrame = object.huise;
                        object.zhoubisai.getComponent(cc.Button).interactable= true;
                        object.zhoupic.active = false;
                        object.zhoubisai.children[0].getComponent(cc.Label).string = data.activityList[i].startTime;
                        continue;
                    }
                    if(data.activityList[i].activiteType ==4){
                        var sprite = object.yuebisai.getComponent(cc.Sprite);
                        sprite.spriteFrame = object.huise;
                        object.yuebisai.getComponent(cc.Button).interactable= true;
                        object.yuepic.active = false;
                        object.yuebisai.children[0].getComponent(cc.Label).string = data.activityList[i].startTime;
                        continue;
                    }
                    if(object.yubisai&&data.activityList[i].activiteType ==1){
                        var sprite = object.yubisai.getComponent(cc.Sprite);
                        sprite.spriteFrame = object.huise;
                        object.yubisai.getComponent(cc.Button).interactable= true;
                        object.yubisai.children[0].getComponent(cc.Label).string = data.activityList[i].startTime;
                        continue;
                    }
                }
            }
        }

    },
    counterror(result,object){},
    
    clickNum: function(event){
        console.log(event.currentTarget.name);
        var num = event.currentTarget.name;
		if(array.length == 0){
			this.inputNum1.string = num;
		}else if(array.length == 1){
			this.inputNum2.string = num;
		}else if(array.length == 2){
			this.inputNum3.string = num;
		}else if(array.length == 3){
			this.inputNum4.string = num;
		}else if(array.length == 4){
			this.inputNum5.string = num;
		}else if(array.length == 5){
			this.inputNum6.string = num;
		}
        array += num;
		if(array.length == 6){
			this.click();
		}
    },
    click: function(){
        var room={};
        room.room = array;
        console.log(room);
        
        if(cc.beimi.authorization){
            cc.beimi.room =array;
            room.token = cc.beimi.authorization;
            cc.beimi.http.httpPost('/api/room/query',room,this.JRsucess,this.JRerror,this);
        }else{
            array = "";
            this.notice.getComponent('cc.Label').string ='not found token';
            object.inputNum1.string = "";
            object.inputNum2.string = "";
            object.inputNum3.string = "";
            object.inputNum4.string = "";
            object.inputNum5.string = "";
            object.inputNum6.string = "";
            
        }
        
    },
    JRsucess: function(result,object){
        var data = JSON.parse(result);
        if(data.playway&&data.room){
            //cc.beimi.room = data.room;
            cc.beimi.playway = data.playway;
            if(data.match){
                cc.beimi.match = data.match ; 
            }
            if(data.game){
                cc.beimi.playType = data.game;
            }
            if(data.playerNum){
                cc.beimi.playerNum = data.playerNum;
            }
            if(data.cardNum){
                cc.beimi.cardNum = data.cardNum;
            }
            if(data.maxRound){
                cc.beimi.maxRound = data.maxRound;
            }
            cc.director.preloadScene('majiang',function(){
                cc.director.loadScene('majiang');
            });
        }else if(data.error){
            object.notice.getComponent('cc.Label').string =data.msg;
            object.inputNum1.string = "";
            object.inputNum2.string = "";
            object.inputNum3.string = "";
            object.inputNum4.string = "";
            object.inputNum5.string = "";
            object.inputNum6.string = "";
            array = "";
            if(cc.beimi.user.cards == 0 ){
                cc.beimi.dialog.destroy();
                cc.beimi.dialog = null ;
                cc.beimi.dialog = cc.instantiate(object.shopping);
                cc.beimi.dialog.parent = cc.find('Canvas')
            }
        }     
    },
    
    JRerror: function(object){
        object.notice.getComponent('cc.Label').string ='连接失败';      
		object.inputNum1.string = "";
		object.inputNum2.string = "";
		object.inputNum3.string = "";
		object.inputNum4.string = "";
		object.inputNum5.string = "";
		object.inputNum6.string = "";
        array = "";
       
    },
	//清空按钮
	emptyClick:function(){
		array = "";
		this.inputNum1.string = "";
		this.inputNum2.string = "";
		this.inputNum3.string = "";
		this.inputNum4.string = "";
		this.inputNum5.string = "";
		this.inputNum6.string = "";
	},
	//删除按钮
	removeOneClick:function(){
		if(array != ""){
			if(array.length == 1){
				this.inputNum1.string = "";
			}else if(array.length == 2){
				this.inputNum2.string = "";
			}else if(array.length == 3){
				this.inputNum3.string = "";
			}else if(array.length == 4){
				this.inputNum4.string = "";
			}else if(array.length == 5){
				this.inputNum5.string = "";
			}else if(array.length == 6){
				this.inputNum6.string = "";
			}
			array = array.substr(0,array.length-1);
		}
    },
    helpClick: function(){
        cc.beimi.dialog1 = cc.instantiate(this.help);
        cc.beimi.dialog1.parent = this.root();
    },
    jjroom: function(event){
        let type = event.target.name;
        cc.beimi.starttime = event.target.children[0].getComponent(cc.Label).string;
        // let alert = cc.instantiate(this.alert2);
        // alert.parent = this.root();
        // cc.director.loadScene('majiang');
        this.loadding();
        cc.beimi.http.httpGet('/api/room/match?token='+cc.beimi.authorization+'&type='+type,this.jjsucess,this.jjerror,this);
    },
    jjsucess: function(result,object){
        console.log(result);
        
        var data = JSON.parse(result);
        //playerNum,cardNum

        if(data.error){  
            object.closeloadding();
            object.alert2(data.msg);
        }else{
            if(data.match){
                cc.beimi.match = data.match ; 
            }
            if(data.playway){
                cc.beimi.playway = data.playway;                  
            }
            if(data.room){
                cc.beimi.room = data.room; 
            }
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
        }    
    },
    jjerror: function(result,object){

    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
