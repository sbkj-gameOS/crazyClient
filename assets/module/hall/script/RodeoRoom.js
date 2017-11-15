cc.Class({
    extends: cc.Component,

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
    },

    // use this for initialization
    onLoad: function () {

    },
	onChmjClick:function(data){
		this.jjclick(data.target._name);
	},
	onDhmjClick:function(data){
		this.jjclick(data.target._name);
	},
	onJthClick:function(data){
		this.jjclick(data.target._name);
	},
	jjclick: function(name){
		console.log(name)
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
        if(data.maxRound){
            cc.beimi.maxRound = data.maxRound;
        }
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

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
