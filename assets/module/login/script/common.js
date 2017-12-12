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
        successBtn:{
            default:null,
            type: cc.Node
        },
        loginLogoNode:{
            default:null,
            type:cc.Node
        },
        WZLogo:{
            default:null,
            type:cc.SpriteFrame
        },
        CCLogo:{
            default:null,
            type:cc.SpriteFrame
        }
    },
    // 首次加载页面方法
    onLoad: function () {
        tongyi = true;
        var sprite = this.loginLogoNode.getComponent(cc.Sprite);
        if(GameBase.gameModel =='wz'){
            sprite.spriteFrame = this.WZLogo;
        }else{
            sprite.spriteFrame = this.CCLogo;
        }
        /**
         * 游客登录，无需弹出注册对话框，先从本地获取是否有过期的对话数据，如果有过期的对话数据，则使用过期的对话数据续期
         * 如果没有对话数据，则重新使用游客注册接口
         */
        // this.loginFormPool = new cc.NodePool();
        // this.loginFormPool.put(cc.instantiate(this.prefab)); // 创建节点
        var xySuccess = cc.sys.localStorage.getItem("xySuccess");
        //this.tourist();        
        if(xySuccess == 1){
            this.successBtn.active = false;
            this.login();
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
            cc.sys.localStorage.setItem("xySuccess","1");
            //this.tourist();
            this.login();    
        }else{
            this.alert('请同意用户使用协议');
        }
    },
    login:function(){
        this.io = require("IOUtils");
        this.loadding();
        if(this.getUrlParam("invitationcode")){
            var code = values[i].split('=')[1];
            this.loadding();
            cc.beimi.http.httpGet('/wxController/getLoginCode?invitationcode='+this.getUrlParam("invitationcode"),this.wxseccess,this.error,this);
        }

        //判断是否有充值
        if (this.getUrlParam('status')){
            cc.beimi.paystatus = this.getUrlParam("invitationcode");
        }

        //直接点击链接登陆
        if (this.getUrlParam('userId')){
            //console.log(value);
            this.loadding();
            cc.beimi.http.httpGet('/wxController/getWxUserToken?userId='+this.getUrlParam('userId'),this.sucess,this.error,this);
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
            //房间号参数不为空    直接进入房间
            if (object.getUrlParam('roomNum') != 'null' && object.getUrlParam('roomNum') != null){
                var room={};
                room.room = object.getUrlParam('roomNum');
                room.token = cc.beimi.authorization;
                cc.beimi.http.httpPost('/api/room/query',room,object.JRsucess,object.JRerror,object);
            }else{
                object.connect();
                object.scene('gameMain' , object) ;
            }
       }
   },
   error:function(object){
       object.closeloadding(object.loaddingDialog);
       object.alert("网络异常，服务访问失败");
   },
   JRsucess: function(result,object){
        var data = JSON.parse(result);
        if(data.playway&&data.room){
            cc.beimi.room = object.getUrlParam('roomNum');
            if(data.game){
                cc.beimi.playType = data.game;
            }
            cc.beimi.playway = data.playway;
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
        }else{
            object.connect();
            object.scene('gameMain' , object) ;
        }     
    },
    JRerror: function(object){
       
    },
   //获取url中的参数
   getUrlParam:function(name) {
       var url = window.location.search.replace("amp;","");
       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
       var r = url.substr(1).match(reg); //匹配目标参数
       if (r != null) return unescape(r[2]); return null; //返回参数值
    }
});
