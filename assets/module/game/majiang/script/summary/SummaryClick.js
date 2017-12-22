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
        miao: cc.Label,
        list: cc.Prefab,
        endlist: cc.Prefab,
        layout:cc.Node,
        layout2:cc.Node,        
        action:{default :null},
        win:cc.Node,
        lose:cc.Node,
        liuju:cc.Node,
        bp:cc.Prefab,
        bpb:cc.Prefab,
        bpp:cc.Node,
        num: cc.Label,
        dabaopai:cc.Node,
        gameend:cc.Node,
        op:cc.Label,
        time:cc.Label,

        close1:cc.Node,
        close2:cc.Node,

        goon1:cc.Node,
        goon2:cc.Node,
        csNode:{
            default:null,
            type:cc.Node
        },
        cs1:{
            default:null,
            type:cc.SpriteFrame
        },
    },

    // use this for initialization
    onLoad: function () {
        this.times = 60;
        if(cc.beimi.wanfa){
            this.op.string = cc.beimi.wanfa;
        }
        var time = new Date();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        if(hours<10){
            hours = '0' + hours;
        }
        if(minutes<10){
            minutes = '0'+ minutes;
        }
        //切换游戏财神图片
        var sprite = this.csNode.getComponent(cc.Sprite);
        if(cc.beimi.GameBase.gameModel =='wz'){
            sprite.spriteFrame = this.cs1;
            this.csNode.width = this.csNode.width - 40 ;
            this.csNode.y = this.csNode.y - 10 ;
            this.csNode.x = this.csNode.x + 10;
        }

        this.time.string = '时间：'+time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate()+'  ' + hours +': ' +minutes;
        
    },
    daojishi: function(){
        this.times =this.times-1;
        if(this.miao){
            this.miao.string = this.times;
            //console.log(this.time);
            if(this.times==0){
                clearTimeout(this.t);  
                cc.find('Canvas/summary').destroy();
            }
        }
    },
    init:function(){
        let he = this;
        this.goon1.active = true;
        this.close1.active =true;
        if(cc.beimi.match == 'true'){
            this.t = setInterval(function(){he.daojishi()},1000)  ;
        }
        var userInfo = this.data;
        // if(userInfo.gameOver==true){
        //     var a = this.goon1.children[0].getComponent(cc.Label);
        //     a.string = '查看总成绩';
        //     a.fontSize = 30;
        // }
        this.dabaopai.active = true;
        console.log(userInfo);
        let card,baopai;
        if(cc.beimi.GameBase.gameModel =='wz'){
            if(cc.beimi.baopai){
                for(var i = 0;i<cc.beimi.baopai.length; i++){
                    card = cc.instantiate(this.bp);
                    baopai  = card.getComponent('DeskCards');
                    if(cc.beimi.powerCard!=null){
                        baopai.node.children[1].active = true;
                    }    
                    baopai.init(cc.beimi.baopai[i],'B',true);
                    card.parent = this.bpp;    
                }
            }else{
                card = cc.instantiate(this.bpb);
                card.parent = this.bpp;
            }
        }
        this.num.string = cc.find('Canvas').getComponent('MajiangDataBind').gddesk_cards;
        if(userInfo.playOvers){
            let win = false;
            let lose = false;
            let liuju;
            for(let i = 0 ; i< userInfo.playOvers.length; i++){
                var list = cc.instantiate(this.list);
                list.getComponent('EndCards').setData(userInfo.playOvers[i]);
                
                list.parent = this.layout;   
                if(userInfo.playOvers[i].win ==false){
                }
                if(userInfo.playOvers[i].user == cc.beimi.user.id){
                    if(userInfo.playOvers[i].win ==true){
                        this.win.active =true;
                    }else if(userInfo.playOvers[i].count<0){
                        this.lose.active =true;
                    }  
                }
            }
            if(userInfo.unHu == true){
                this.liuju.active =true;
                this.lose.active = false;
            }
        }
        
    },   
    init2: function(){
        this.goon2.active = true;
        this.close2.active =true;
        var userInfo = this.data;
        this.gameend.active = true;
        console.log(userInfo);
        if(userInfo.players){
            let win = false;
            let lose = false;
            let liuju;
            let count = 0;
            for(let i = 0 ; i< userInfo.players.length; i++){
                var list = cc.instantiate(this.endlist);
                var dayingjia = this.dayingjia('pointCount',i);
                var paoshou = this.dayingjia('dianCount',i);
                list.getComponent('endUserInfo').setData(userInfo.players[i],dayingjia,paoshou);
                list.parent = this.layout2;   
             }
        }
    },
    dayingjia: function(counts,inx){
        let zhen = true;
        let count = this.data.players[inx][counts];
        for(let i = 0;i < this.data.players.length;i++){
            if(count==0||(i!=inx && this.data.players[i][counts] > count)){
                zhen = false;
                break;
            }
        }
        return zhen;
    },
    /**
     * 结算页面上的 背景的 点击事件，主要是用于事件拦截，禁用冒泡
     * @param event
     */
    onBGClick:function(event){
       
       //后期这里加个判定  当 数小于开局设定局数时 发射这个事件  当局数满了 发送游戏结束的事件，并且退出房间。
        this.node.dispatchEvent(new cc.Event.EventCustom('restar', true));
    },
    /**
     * 结算页面上的关闭按钮 的 点击事件 , 关闭按钮 和 继续按钮 功能是一样的，都是继续游戏
     */
    onCloseClick:function(){

    },
    setData: function(data){
        this.data = data;
        this.init();
    },
    setDataEnd: function(data){
        this.data = data;
        this.init2();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
