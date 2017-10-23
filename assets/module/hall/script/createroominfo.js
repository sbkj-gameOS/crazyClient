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

    // use this for initialization
    onLoad: function () {
        //this.notice.active = false ;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    createRoom(){
        // console.log('1');
        //  console.log(this.model.children[1].children[1]);
         var garams ={};
         var way_arry=[];
         var model_arry =this.model.children;
         for(var i in model_arry){
             if(model_arry[i].children[1].active==true){
                 var model_type = model_arry[i].children[1].name;
             }
         }
         garams.modeltype = model_type;

         var playway_arry = this.playway.children;
         for(var j in playway_arry){
            if(playway_arry[j].children[1].active==true){
                way_arry.push(playway_arry[j].name);
            }
         }
         garams.waytype = way_arry;
         var pep = this.people.children;
         for(var k in pep){
             if(pep[k].children[1].active==true){
                 var pop_num = pep[k].children[1].name;
             }
         }
         garams.pep_nums = pop_num;
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