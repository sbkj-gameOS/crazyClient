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
        web: cc.WebView,
    },

    // use this for initialization
    onLoad: function () {
        this.init();
    },
    init: function(){
        cc.beimi.http.httpGet('/activity/findActivityListGame?token='+'bf4b88529d60433586f061ae655c73f0',this.sucess,this.error,this); 

         
        
    },
    xixixi: function(result,object){

    },
    hahahah: function(result,object){

    },
    sucess:function(result,object){
        let count =0;
        var data = JSON.parse(result);  
        if(data.list&&data.list.length>0){
                let id = data.list[0].id;  
                
                object.web.url=cc.beimi.url+'/activity/getActivityPage?token='+'bf4b88529d60433586f061ae655c73f0&activityId='+id;
            for(let i = 0; i< data.list.length; i++ ){
                count++;                

                let haha = object['one'+Number(count)];
                haha.active = true;
                haha.children[2].getComponent(cc.Label).string = data.list[i].activiteName;
                if(data.isRead==0){
                    haha.children[3].active = true;
                }
                haha.children[1].children[2].getComponent(cc.Label).string = 'a&'+data.list[i].id;
                // if(data.list[i].isSignUp==1){
                //     haha.children[1].children[1].children[0].active =true;
                //     if(data.list[i].userid){
                //         haha.children[1].children[1].children[0].getComponent(cc.Button).interactable= false;   
                //        // haha.children[1].children[1].color = new cc.Color(0,0,0);
                //     }
                //     
                // }
            }
        }
        if(data.prizeList&&data.prizeList.length>0){
            if(!data.list){
                let id = data.prizeList[0].id;  
                object.web.url=cc.beimi.url+'/activity/getPrizePage?token='+'bf4b88529d60433586f061ae655c73f0&pirzeId='+id;
                
            }
            for(let i = 0; i< data.prizeList.length; i++ ){
                count++;
                let haha = object['one'+Number(count)];
                haha.active = true;
                haha.children[2].getComponent(cc.Label).string = data.prizeList[i].prizeName;
                // if(data.list[i].isSignUp==1){
                //     haha.children[1].children[1].children[0].active =true;
                //     if(data.list[i].userid){
                //         haha.children[1].children[1].children[0].getComponent(cc.Button).interactable= false;   
                //        // haha.children[1].children[1].color = new cc.Color(0,0,0);
                //     }
                //     haha.children[1].children[2].getComponent(cc.Label).string = data.list[i].id;
                // }
                haha.children[1].children[2].getComponent(cc.Label).string ='b&'+ data.list[i].id;
                if(data.isRead==0){
                    haha.children[3].active = true;
                    
                }
            }
        } 
        if(data.userMessList&&data.userMessList.length>0){
            if(!data.list&&!data.prizeList){
                let id = data.userMessList[0].id;  

                object.web.url=cc.beimi.url+'/activity/getPrizePage?token='+'bf4b88529d60433586f061ae655c73f0&pirzeId='+id;
            }
            for(let i = 0; i< data.userMessList.length; i++ ){
                count++;
                let haha = object['one'+Number(count)];
                haha.active = true;
                haha.children[2].getComponent(cc.Label).string = data.userMessList[i].prizeName;
                // if(data.list[i].isSignUp==1){
                //     haha.children[1].children[1].children[0].active =true;
                //     if(data.list[i].userid){
                //         haha.children[1].children[1].children[0].getComponent(cc.Button).interactable= false;   
                //        // haha.children[1].children[1].color = new cc.Color(0,0,0);
                //     }
                //     haha.children[1].children[2].getComponent(cc.Label).string = data.list[i].id;
                // }
                haha.children[1].children[2].getComponent(cc.Label).string = 'b&'+data.list[i].id;
                if(data.isRead==0){
                    haha.children[3].active = true;
                }
            }
                    }      
      

    },
    error:function(result,object){

    },
    click :function(event){
        let id = event.target.parent.children[1].children[2].getComponent(cc.Label).string;
        let arry = id.split('&');
        let a = arry[0];
        let b = arry[1];
        if(a=='a'){
            this.web.url = cc.beimi.url+'/activity/getActivityPage?token='+'bf4b88529d60433586f061ae655c73f0&activityId='+b;
        }else if(a=='b'){
            this.web.url =cc.beimi.url+'/activity/getPrizePage?token='+'bf4b88529d60433586f061ae655c73f0&pirzeId='+b;
        }
        event.target.parent.children[3].active = false;

    },
    sucesss:function(result,object){},
    errors:function(result,object){},
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
