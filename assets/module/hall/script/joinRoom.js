var beiMiCommon = require("BeiMiCommon");
var array =[];
cc.Class({
    extends: beiMiCommon,

    properties: {
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
        roomNums:{
            default:null,
            type:cc.Component
        },
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
       
    },

    // use this for initialization
    onLoad: function () {
         array = [];
         //this.notice.active =false;
    },
    
    clickNum: function(event){
        console.log(event.currentTarget.name);
        var num = event.currentTarget.name;
        if(num !='确认'&&this.roomNums.string.length<=6){
            if(num=='回退'){
                array.pop();
                this.roomNums.string = array.join('');
                return;
            } 
            array.push(num);
            this.roomNums.string = array.join('');
            if(this.roomNums.string.length==6){        
                this.click();
                array = [] ;
            }
        }
    },
    click: function(){
        var room={};
        if(this.roomNums.string.length!=6){
            this.notice.getComponent('cc.Label').string ='请输入6位数房号';
           return false;
        };
        room.roomNum = this.roomNums.string;
        console.log(room);
        if(cc.beimi.authorization){
            room.token = cc.beimi.authorization;
            cc.beimi.http.httpPost('/api/room/query',room,this.JRsucess,this.JRerror,this);
        }else{
            array = [];
            this.notice.getComponent('cc.Label').string ='not found token';
            
        }
        
    },
    
  
    JRsucess: function(result,object){
        var data = JSON.parse(result);
        if(data.playway&&data.room){
            cc.beimi.room = data.room;
            cc.beimi.playway = data.playway;
            cc.director.loadScene('majiang');
        }else{
            object.notice.getComponent('cc.Label').string ='房间不存在';
        }     
    },
    
    JRerror: function(object){
        object.notice.getComponent('cc.Label').string ='连接失败';        
        object.roomNums.string = '';
        array = [];
       
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
