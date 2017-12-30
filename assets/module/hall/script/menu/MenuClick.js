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
        setting: {
            default: null,
            type: cc.Prefab
        },
        shopping: {
            default: null,
            type: cc.Prefab
        },
        sharing:{
            default: null,
            type: cc.Prefab
        },
        head:{
            default: null,
            type: cc.Prefab
        },
        sharemoney:{
            default: null,
            type: cc.Prefab
        },
		record:{
			default: null,
            type: cc.Prefab
		},
		help:{
			default: null,
            type: cc.Prefab
		},
		service:{
			default: null,
            type: cc.Prefab
		},
		rodeoRoom:{
			default: null,
            type: cc.Prefab
		},
    },
  

    // use this for initialization
    onLoad: function () {
       
    },
    //弹窗
    onSettingClick:function(){
        cc.beimi.dialog = cc.instantiate(this.setting) ;
        cc.beimi.dialog.parent = this.root();
      
    },
    onShoppingClick:function(){
        cc.beimi.shopping = 2;
        cc.beimi.dialog = cc.instantiate(this.shopping) ;
        cc.beimi.dialog.parent = this.root();        
    },
    onSharingClick:function(){
        cc.beimi.dialog = cc.instantiate(this.sharing);
        cc.beimi.dialog.parent =this.root();
    },
    onHeadClick:function(){
        cc.beimi.dialog = cc.instantiate(this.head);
        cc.beimi.dialog.parent =this.root();
    },
    onSharemoneyClick:function(){
        cc.beimi.dialog = cc.instantiate(this.sharemoney);
        cc.beimi.dialog.parent =this.root();
    },
	onRecordClick:function(){
		// cc.beimi.dialog = cc.instantiate(this.record);
        // cc.beimi.dialog.parent =this.root();
        this.alert2('功能暂未开放');
        
    },
	onHelpClick:function(){
		cc.beimi.dialog = cc.instantiate(this.help);
        cc.beimi.dialog.parent =this.root();
    },
	onServiceClick:function(){
		cc.beimi.dialog = cc.instantiate(this.service);
        cc.beimi.dialog.parent =this.root();
    },
	onRodeoRoomClick:function(){
		cc.beimi.dialog = cc.instantiate(this.rodeoRoom);
        cc.beimi.dialog.parent =this.root();
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
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
