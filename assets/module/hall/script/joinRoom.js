var beiMiCommon = require("BeiMiCommon");
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
            type:cc.EditBox
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    click: function(){
        var room={};
        if(this.roomNums.string.length!=6){
           alert('请输入6位数房号');
           return false;
        };
        room.roomNum = this.roomNums.string;
        if(cc.beimi.authorization){
            room.token = cc.beimi.authorization;
            cc.beimi.http.httpPost('/api/room/query',room,this.JRsucess,this.JRerror,this);
        }else{
            alert('not found token');
        }
        
    },
    
    jjclick: function(){
        var room ={};
        if(cc.beimi.authorization){
            room.token = cc.beimi.authorization;
            cc.beimi.http.httpPost('/api/room/match',room,this.JJsucess,this.JRerror,this);
        }else{
            alert('not found token');
        }   
        
    },
    JRsucess: function(result,object){
        var data = JSON.parse(result);
        if(data.playway&&data.room){
            cc.beimi.room = data.room;
            cc.beimi.playway = data.playway;
            cc.director.loadScene('majiang');
        }else{
            alert('加入失败');
        }     
    },
    JJsucess: function(result,object){
        var data = JSON.parse(result);
        if(data.playway){
            cc.beimi.playway = data.playway;
            cc.director.loadScene('majiang');
        }else{
            alert('加入失败');
        }     
    },
    JRerror: function(){
        alert('连接失败');
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
