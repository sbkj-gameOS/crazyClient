var beiMiCommon = require("BeiMiCommon");
var tongyi = true;
var a = 1;
cc.Class({
    extends: beiMiCommon,
    properties: {
        agree:{
            default:null,
            type: cc.Node
        },
        userProtocol:{
            default:null,
            type: cc.Prefab
        },
    },
    // 首次加载页面方法
    onLoad: function () {
        tongyi = true;
        /**
         * 游客登录，无需弹出注册对话框，先从本地获取是否有过期的对话数据，如果有过期的对话数据，则使用过期的对话数据续期
         * 如果没有对话数据，则重新使用游客注册接口
         */
        // this.loginFormPool = new cc.NodePool();
        // this.loginFormPool.put(cc.instantiate(this.prefab)); // 创建节点
        var xySuccess = localStorage.getItem("xySuccess");
        this.tourist();
        if(xySuccess == 1){
            // this.login();
            this.tourist();
        }
        
        cc.beimi.game = {
            model : null ,
            playway : null,
            type:function(name){
                var temp ;
                if(cc.beimi.game.model !=null){
                    for(var i=0 ; i<cc.beimi.game.model.types.length ; i++){
                        var type = cc.beimi.game.model.types[i] ;
                        if(type.code == name){
                            temp = type ;
                        }
                    }
                }
                return temp ;
            }
        };
    },
    //游客登录方法
    tourist: function(){
        if(tongyi){
            this.io = require("IOUtils");
            this.loadding();
            if(this.io.get("userinfo") == null){
                //发送游客注册请求
                var xhr = cc.beimi.http.httpGet("/api/guest", this.guestSucess , this.error , this);
            }else{
                //通过ID获取 玩家信息
                var data = JSON.parse(this.io.get("userinfo")) ;
                if(data.token != null){     //获取用户登录信息
                    var xhr = cc.beimi.http.httpGet("/api/guest?token="+data.token.id, this.guestSucess , this.error , this);
                }
            }
        }else{
            this.alert('请同意用户使用协议');
        }     
    },
    //同意协议内容
    click: function(toggle){
        tongyi = toggle.isChecked;
    },
    guestSucess:function(result , object){
        var data = JSON.parse(result) ;
        if(data!=null && data.token!=null && data.data!=null){
            //放在全局变量
            object.reset(data , result);
            //预加载场景
            console.log('ok');
            //if(cc.beimi.games && cc.beimi.games.length == 1){//只定义了单一游戏类型 ，否则 进入游戏大厅
                object.scene("gameMain" , object) ;
                //cc.director.loadScene('gameMain');
                /**
                 * 传递全局参数，当前进入的游戏类型，另外全局参数是 选场
                 */
                //cc.beimi.game.model = cc.beimi.games[0];
            //}else{
                /**
                 * 暂未实现功能
                 */
            //}
        }
    },
    wxlogin: function(){
        if(tongyi){
            localStorage.setItem("xySuccess","1");
            //this.tourist();
            this.login();    
        }else{
            this.alert('请同意用户使用协议');
        }
    },
    login:function(){
        this.io = require("IOUtils");
        //this.loadding();
        var url = window.location.href;
        //console.log(url);
        var data = url.split('?')[1];
        var value='';
        if(data){
            var values= data.split('&');
            //好友分享进入
            for(let i in values){
                var name = values[i].split('=')[0]
                if (name =='invitationcode'){
                    var code = values[i].split('=')[1];
                    this.loadding();
                    cc.beimi.http.httpGet('/wxController/getLoginCode?invitationcode='+code,this.wxseccess,this.error,this);

                   
                }
            };
            //判断是否有充值
            for(let i in values){
                var name = values[i].split('=')[0]
                if (name =='status'){
                    cc.beimi.paystatus = values[i].split('=')[1];
                }
            };
            //直接点击链接登陆
            for(let i in values){
            var name = values[i].split('=')[0]
            if (name == 'userId'){
                value = values[i].split('=')[1];
                //console.log(value);
                this.loadding();
                cc.beimi.http.httpGet('/wxController/getWxUserToken?userId='+value,this.sucess,this.error,this);
                }
            };
        }
    },
   sucess:function(result,object){
       var data = JSON.parse(result) ;
       if(data != null && data.success == true && data.token!=null){
           //放在全局变量
           //object.reset(data , result);
           //cc.beimi.authorization = data.token;
           //cc.beimi.user = data.playUser;
           //cc.sys.localStorage.setItem('userinfo',result);
           object.reset(data,result);
           /**
            * 登录成功后即创建Socket链接
            */
          
            object.loadding();
            object.connect();
           object.scene('gameMain' , object) ;
       }
   },
   error:function(object){
       object.closeloadding(object.loaddingDialog);
       object.alert("网络异常，服务访问失败");
   },
});
