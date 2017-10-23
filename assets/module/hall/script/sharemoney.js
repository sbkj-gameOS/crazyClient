
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
        cc:{
            default:null,
            type: cc.Node
        },
      
    },

    // use this for initialization
    onLoad: function () {
        //this.node.Limit = 5;
        this.node.num = 0
        this.node.count = 0;     
        this.node.successs = this.successs;
        this.node.errors = this.errors;   
        //alert(this);
        if(cc.beimi.authorization){
            cc.beimi.http.httpGet('/presentapp/runHistoryMySelf?token='+cc.beimi.authorization+'&page='+this.node.count+'&limit='+5,this.success,this.error,this);
        };   
        this.node.on('scroll-to-bottom',function(even){
            if(cc.beimi.authorization){
                alert(even.target.count);             
                cc.beimi.http.httpGet('/presentapp/runHistoryMySelf?token='+cc.beimi.authorization+'&page='+even.target.count+'&limit='+5,even.target.successs,even.target.errors,even.target);
            }       
       });
  
    },
    success:function(result,object){
        var data = JSON.parse(result) ;
        if(data.count>0){
            for(let i=0;i<5&&i<data.count ;i++){
                var time = new Date(data.data[i].getProfitTime);
                var timestring = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+'  '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
                var c = new cc.Node('i');
                c.parent = object.cc;
                c.addComponent(cc.Label).string = timestring+'    ' + data[i].getProfitAmount+'    ' + data[i].sourceName;
                c.y=(-object.node.num *30-50);
                c.getComponent(cc.Label).fontSize=20;
                object.node.num++

            }
            object.node.count++
        }              
    },
    successs: function(result,object){
        var data = JSON.parse(result) ;
        if(data.count>0){
            for(let i=0;i<5&&i<data.count ;i++){
                var time = new Date(data[i].getProfitTime);
                var timestring = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+'  '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();                
                var c = new cc.Node('i');
                var f = object.getChildByName('view').children[0];
                c.parent = f;
                c.addComponent(cc.Label).string = timestring+'    ' + data[i].getProfitAmount+'    ' + data[i].sourceName;
                c.y=(-object.num *30-50);
                c.getComponent(cc.Label).fontSize=20;
                object.num++;
            }
            object.count++;
        }              
    },
    error:function(object){
        console.log('shibai');
    },
    errors: function(object){
        console.log('上拉失败')
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
     
    // },
});
