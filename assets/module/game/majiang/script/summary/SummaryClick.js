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
        gameend:cc.Node
    },

    // use this for initialization
    onLoad: function () {
        

    },
    init:function(){
        var userInfo = this.data;
        this.dabaopai.active = true;
        console.log(userInfo);
        let card,baopai;
        if(cc.beimi.baopai){
            card = cc.instantiate(this.bp);
            baopai  = card.getComponent('DeskCards');    
            baopai.init(cc.beimi.baopai,'B');
            card.parent = this.bpp;    
        }else{
            card = cc.instantiate(this.bpb);
            card.parent = this.bpp;
        }
        this.num.string = cc.find('Canvas').getComponent('MajiangDataBind').gddesk_cards;
        if(userInfo.playOvers){
            let win = false;
            let lose = false;
            let liuju;
            let count = 0;
            for(let i = 0 ; i< userInfo.playOvers.length; i++){
                var list = cc.instantiate(this.list);
                list.getComponent('EndCards').setData(userInfo.playOvers[i]);
                list.parent = this.layout;   
                if(userInfo.playOvers[i].win ==false){
                    count = count +1;
                }
                if(userInfo.playOvers[i].user == cc.beimi.user.id){
                    if(userInfo.playOvers[i].win ==true){
                        this.win.active =true;
                    }else if(userInfo.playOvers[i].count<0){
                        this.lose.active =true;
                    }  
                }
            }
            if(count == 4){
                this.liuju.active =true;
                this.lose.active = false;
            }
        }
        
    },   
    init2: function(){
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
            if(i!=inx && this.data.players[i][counts] > count){
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
