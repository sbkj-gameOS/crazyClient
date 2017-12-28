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
        one1: cc.Node,
        one2: cc.Node,
        one3: cc.Node,
        one4: cc.Node,
        one5: cc.Node,
        one6: cc.Node,
        seven: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.init();
    },
    init: function(){
        cc.beimi.http.httpGet('/activity/findActivityListGame?token='+'bf4b88529d60433586f061ae655c73f0',this.sucess,this.error,this); 
    },
    sucess:function(result,object){
        var data = JSON.parse(result);  
        if(data.list&&data.list.length>0){
            for(let i = 0; i< data.list.length; i++ ){
                let haha = object['one'+Number(i+1)];
                haha.active = true;
                haha.children[2].getComponent(cc.Label).string = data.list[i].activiteName;
                haha.children[1].children[0].getComponent(cc.RichText).string = data.list[i].activiteContent;
                if(data.list[i].isSignUp==1){
                    haha.children[1].children[1].children[0].active =true;
                    if(data.list[i].userid){
                        haha.children[1].children[1].children[0].getComponent(cc.Button).interactable= false;   
                       // haha.children[1].children[1].color = new cc.Color(0,0,0);
                    }
                    haha.children[1].children[2].getComponent(cc.Label).string = data.list[i].id;
                }
            }
        }      
      

    },
    error:function(result,object){

    },
    click :function(event){
        let hehe = event.target.parent.children[2].getComponent(cc.Label).string;
        cc.beimi.http.httpGet('/activity/saveUserActivity?token='+'bf4b88529d60433586f061ae655c73f0&activityId='+hehe,this.sucesss,this.errors,this); 
    },
    sucesss:function(result,object){},
    errors:function(result,object){},
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
