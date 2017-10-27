var beiMiCommon = require("BeiMiCommon");

cc.Class({
    extends: beiMiCommon,
    //extends: cc.Component,
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
        
        left_danLoyad: cc.Node,
        right_danLoyad: cc.Node,
        top_danLoyad: cc.Node,

        danLoyad: cc.Node,
        card4:cc.Node,
        mjUnit:cc.Prefab,
        selectfather:cc.Node,
        ZM:cc.Prefab,
        FM:cc.Prefab,
        godcard:cc.Node,
        playerprefab:{
            default : null ,
            type : cc.Prefab
        },
        dan_current:{
            default:null,
            type:cc.Prefab
        },
        statebtn:{
            default : null ,
            type : cc.Node
        },
        mjtimer:{
            default:null ,
            type:cc.Label
        },
        desk_tip:{
            default:null ,
            type : cc.Node
        },
        desk_cards:{
            default:null ,
            type : cc.Label
        },
        cards_current:{
            default:null ,
            type : cc.Prefab
        },
        cards_panel:{
            default:null ,
            type : cc.Node
        },
        one_card_panel:{
            default:null ,
            type : cc.Node
        },
        left_panel:{
            default:null ,
            type : cc.Node
        },
        right_panel:{
            default:null ,
            type : cc.Node
        },
        top_panel:{
            default:null ,
            type : cc.Node
        },
        cards_left:{
            default:null ,
            type : cc.Prefab
        },
        cards_right:{
            default:null ,
            type : cc.Prefab
        },
        cards_top:{
            default:null ,
            type : cc.Prefab
        },
        takecards_one:{         //我的和 对家出的牌
            default:null ,
            type : cc.Prefab
        },
        takecards_left:{
            default:null ,
            type : cc.Prefab
        },
        takecards_right:{
            default:null ,
            type : cc.Prefab
        },
        deskcards_current_panel:{
            default:null ,
            type : cc.Node
        },
        deskcards_right_panel:{
            default:null ,
            type : cc.Node
        },
        deskcards_top_panel:{
            default:null ,
            type : cc.Node
        },
        deskcards_left_panel:{
            default:null ,
            type : cc.Node
        },
        searchlight:{
            default:null ,
            type : cc.Node
        },
        actionnode_two:{        //动作节点
            default:null ,
            type : cc.Node
        },
        actionnode_two_list:{        //动作节点
            default:null ,
            type : cc.Node
        },
        actionnode_three:{      //动作节点
            default:null ,
            type : cc.Node
        },
        actionnode_three_list:{      //动作节点
            default:null ,
            type : cc.Node
        },
        actionnode_deal:{      //动作节点
            default:null ,
            type : cc.Node
        },
        action_gang_ming_prefab:{
            default:null ,
            type : cc.Prefab
        },
        action_gang_an_prefab:{
            default:null ,
            type : cc.Prefab
        },
        cards_gang_ming_prefab:{
            default:null ,
            type : cc.Prefab
        },
        cards_gang_an_prefab:{
            default:null ,
            type : cc.Prefab
        },
        gang_current:{        //动作节点
            default:null ,
            type : cc.Node
        },
        summary:{
            default:null ,
            type : cc.Prefab
        },
        //ljh追加 房号 
        room_num:{
            default:null,
            type: cc.Node
        }
    },

    // use this for initialization
    /**
     * 重构后，只有两个消息类型
     */
    onLoad: function () {

        //ljh追加 房号的显示
        if(cc.beimi.room&&cc.beimi.room.length==6){
            this.room_num.getComponent(cc.Label).string = cc.beimi.room;
        }else{
            this.room_num.parent.active =false;
        };
        this.routes = {} ;
        this.selectfather.active =false; 
        /**
         * 已初始的玩家对象池 ， 牌局结束 或者 有新玩家加入， 老玩家离开 等事件的时候，需要做对象池回收
         * @type {Array}
         */
        this.playersarray = new Array();        //玩家列表

        this.playercards = new Array();         //手牌对象

        this.leftcards = new Array();           //左侧玩家手牌
        this.rightcards = new Array();          //右侧玩家手牌
        this.topcards = new Array() ;           //对家手牌

        this.deskcards = new Array();           //当前玩家和 对家 已出牌

        this.chis = [];
        this.gangs = [];
        this.dans = [];

        this.right ='';
        this.left = '';
        this.top = '';

        this.centertimer = null ;
        /**
         * 预制的 对象池
         * @type {cc.NodePool}
         */
        this.playerspool = new cc.NodePool();
        /**
         * 当前玩家的 麻将牌的 对象池
         * @type {cc.NodePool}
         */
        this.cardpool = new cc.NodePool();
        /**
         *
         * 初始化玩家 的 对象池
         */
        for(var i=0 ; i<4 ; i++){
            this.playerspool.put(cc.instantiate(this.playerprefab));
        }
        /**
         * 初始化当前玩家的麻将牌 对象池
         */
        for(var i=0 ; i<14 ; i++){
            this.cardpool.put(cc.instantiate(this.cards_current));
        }
        
        this.exchange_state("init" , this);
        let self = this ;
        if(this.ready()){
            let socket = this.socket();
            /**
             * 接受指令
             */
            this.map("joinroom" , this.joinroom_event) ;          //加入房价
            this.map("players" , this.players_event) ;            //接受玩家列表

            this.map("banker" , this.banker_event) ;          //庄家

            this.map("play" , this.play_event) ;          //人齐了，接收发牌信息

          //  this.map("selectcolor" , this.selectcolor_event) ;          //从服务端发送的 定缺的 指令，如果服务端玩法里不包含定缺， 可以不发送这个指令而是直接开始打牌

          //  this.map("selectresult" , this.selectresult_event) ;          //从服务端发送的 定缺的 指令，如果服务端玩法里不包含定缺， 可以不发送这个指令而是直接开始打牌

            this.map("lasthands" , this.lasthands_event) ;              //庄家开始打牌了，允许出牌

            this.map("takecards" , this.takecard_event) ;                //我出的牌

            this.map("action" , this.action_event) ;                     //服务端发送的 动作事件，有杠碰吃胡过可以选择

            this.map("selectaction" , this.selectaction_event) ;        //我选择的动作， 杠碰吃胡

            this.map("dealcard" , this.dealcard_event) ;                //我出的牌

            this.map("allcards" , this.allcards_event) ;                //我出的牌
            
            //this.dosomething({},this);
            socket.on("command" , function(result){
                var data = self.parse(result) ;
                console.log(data.command);
                console.log(data);
                self.route(data.command)(data , self);
            });
            /**
             * 接受传送的 玩家列表（含AI）
             */
            socket.on("players" , function(result){
                var data = self.parse(result) ;
                /**
                 * 处理 Players
                 */
                self.route("players")(data, self);
            });
        }


        /**
         * 发射的事件， 在 出牌双击 / 滑动出牌的时候发射的，此处用于接受后统一处理， 避免高度耦合
         * 之所以这样设计，是因为在TakeMJCard里需要引用 麻将牌的 对象池 和 出牌的对象池，如果采用对象传入或者 通过find获取的方式处理
         * 则会导致高度的 组件耦合，不利于系统 未来扩展，也会导致 业务逻辑交叉/混乱
         * 无论 胡牌/杠/碰/吃，都需要采用这种方式处理
         */
        this.node.on('takecard', function (event) {
            let card = event.target.getComponent("TakeMJCard");
            if(card != null){
                let card_script = card.target.getComponent("HandCards") ;
                /**
                 * 提交数据，等待服务器返回
                 */

                    //开始匹配
                let socket = self.socket();
                
                if (cc.sys.localStorage.getItem('ting') == 'true') {
                    let socket = self.socket();
                    socket.emit("selectaction" , JSON.stringify({
                        action:"ting",
                        actionCard:[]
                    }));
                    cc.sys.localStorage.removeItem('ting') ;
                } else {    
                    socket.emit("doplaycards" , card_script.value) ;
                }
            }
            event.stopPropagation();
        });
        /**
         * ActionEvent发射的事件 ， 点击 杠 , 通知服务器端，用户点击了 杠 动作，服务器端进行处理，处理完毕后通知客户端后续动作
         */
        // this.node.on("gang",function(event){
        //     let socket = self.socket();
        //     socket.emit("selectaction" , JSON.stringify({
        //         action:"gang",
        //         actionCard:[]
        //     }));
        //     event.stopPropagation();
        // });
        this.node.on('readyGM',function(event){ 
            let socket = self.socket();
            socket.emit('readyGame',JSON.stringify({
            }))
        });
        this.node.on('restar',function(event){
            var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
            cc.find('Canvas/global/main/button/readybtn').active =true;   
            context.reinitGame();
            //context.collect(context);  
            event.target.parent.destroy();
        });
        this.node.on('mjSelection',function(event){
            event.target.parent.parent.active= false;
            event.target.parent.children.splice(0,event.target.parent.children.length) ;
            let socket = self.socket();
            let params = [];
            let sendEvent ;
            console.log(event);
            if ( event.getUserData() ) {
                sendEvent = event.getUserData().name ;
                params = event.getUserData().params ;
            }
            socket.emit("selectaction" , JSON.stringify({
                action:sendEvent,
                actionCard:params
            }));
            event.stopPropagation();
        });
        /**
         * ActionEvent发射的事件 ， 点击 碰
         */
        this.node.on("peng",function(event){
            
            let socket = self.socket();
            socket.emit("selectaction" , JSON.stringify({
                action:"peng",
                actionCard:[]
            }));
            event.stopPropagation();
        });
        this.node.on("dan",function(event){
            var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
            if ( context.dans && context.dans.length > 1 ) {
                context.mjOperation('dan', context.dans,context);
            } else {
                let socket = self.socket();
                let danParam = [];
                if ( context.dans ) {
                    danParam = context.dans[0] ;
                }
                socket.emit("selectaction" , JSON.stringify({
                    action:'dan',
                    actionCard:danParam
                }));
            }
            event.stopPropagation();
        });
        this.node.on("gang",function(event){
            var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
            if ( context.gangs && context.gangs.length > 1 ) {
                context.mjOperation('gang', context.gangs,context);
            } else {
                let socket = self.socket();
                let gangParam = [];
                if ( context.gangs ) {
                    gangParam = context.gangs[0] ;
                }
                socket.emit("selectaction" , JSON.stringify({
                    action:'gang',
                    actionCard:gangParam
                }));
            }
            event.stopPropagation();
        });

        /**
         * ActionEvent发射的事件 ， 点击 吃
         */
        this.node.on("chi",function(event){
            var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
            if ( context.chis && context.chis.length > 1 ) {
                context.mjOperation('chi', context.chis,context);
            } else {
                let socket = self.socket();
                socket.emit("selectaction" , JSON.stringify({
                    action:'chi',
                    actionCard:context.chis[0]
                }));
            }
            event.stopPropagation();
        });
        /**
         * ActionEvent发射的事件 ， 点击 听
         */
        this.node.on("ting",function(event){
            /*let socket = self.socket();
            socket.emit("selectaction" , JSON.stringify({
                action:"ting",
                actionCard:[]
            }));*/
            //记录听得状态后，在出牌阶段判断状态并发送听牌事件。
            cc.sys.localStorage.setItem('ting','true') ;
            event.stopPropagation();
        });
        /**
         * ActionEvent发射的事件 ， 点击 胡
         */
        this.node.on("hu",function(event){
            let socket = self.socket();
            socket.emit("selectaction" , JSON.stringify({
                action:"hu",
                actionCard:[]
            }));
            event.stopPropagation();
        });
        /**
         * ActionEvent发射的事件 ， 点击 过
         */
        this.node.on("guo",function(event){
            let socket = self.socket();
            socket.emit("selectaction" , JSON.stringify({
                action:"guo",
                actionCard:[]
            }));
            event.stopPropagation();
        });
        
    },
    /**
     * 新创建牌局，首个玩家加入，进入等待状态，等待其他玩家加入，服务端会推送 players数据
     * @param data
     * @param context
     */
    joinroom_event:function(data , context){
        var player = context.playerspool.get();
        if(player){
            var playerscript = player.getComponent("MaJiangPlayer");
            var inx = null , tablepos = "";
            if(data.id == cc.beimi.user.id){
                player.setPosition(-570 , -150);
                tablepos = "current" ;
            }else{
                inx = context.playersarray.length - 1 ;
                if(inx == 0){
                    //var playerscript = player.getComponent("MaJiangPlayer");
                    player.setPosition(570 , 50);
                    tablepos = "right" ;
                   // context.right = ''
                }else if(inx == 1){
                    //var playerscript = player.getComponent("MaJiangPlayer");
                    player.setPosition(400 , 300);
                    tablepos = "top" ;
                }else if(inx == 2){
                    //var playerscript = player.getComponent("MaJiangPlayer");
                    player.setPosition(-570 , 50);
                    tablepos = "left" ;
                }
            }
            playerscript.init(data , inx , tablepos);
            player.parent = context.root();
            context.playersarray.push(player) ;
            //var playerscript = player.getComponent("MaJiangPlayer");

        /**
         * 初始化状态，首个玩家加入，然后开始等待其他玩家 ， 如果是 恢复数据， 则不会进入
         */
        //this.statusbtn.active = true ;
        }    
    },
    /**
     * 新创建牌局，首个玩家加入，进入等待状态，等待其他玩家加入，服务端会推送 players数据
     * @param data
     * @param context
     */
    takecard_event:function(data , context){
        
        if(data.userid == cc.beimi.user.id) {
            for (var inx = 0; inx < context.playercards.length;i++ ) {
                let handcards = context.playercards[inx].getComponent("HandCards");
                if (data.card == handcards.value) {
                    context.playercards[inx].zIndex = 0 ;
                    /**
                     * 从数组中移除
                     */
                    context.playercards[inx].parent = null;

                    handcards.reinit();
                    /**
                     * 还回 对象池
                     */
                    context.cardpool.put(context.playercards[inx]);

                    /**
                     * 从数组中移除
                     */
                    context.playercards.splice(inx, 1);

                    /**
                     * 放到桌面 ， 需要重构
                     */
                    let desk_card = cc.instantiate(context.takecards_one);
                    let temp = desk_card.getComponent("DeskCards");
                    temp.init(handcards.value);

                    context.deskcards.push(desk_card);
                    desk_card.parent = context.deskcards_current_panel;
                }else{

                    handcards.relastone();
                    if(handcards.selectcolor == true){
                        context.playercards[inx].zIndex = 1000 + handcards.value ;
                    }else{
                        if(handcards.value >= 0){
                            context.playercards[inx].zIndex = handcards.value ;
                        }else{
                            context.playercards[inx].zIndex = 200 + handcards.value ;
                        }
                    }
                    inx = inx + 1 ;     //遍历 ++,不处理移除的 牌
                }
            }
            context.exchange_state("takecard" , context);  //隐藏 提示状态
        }else{
            //其他玩家出牌
            let temp = context.player(data.userid , context) ;
            let cardpanel  , cardprefab , deskcardpanel;
            if(temp.tablepos == "right"){
                for(var inx = 0 ; inx < context.right_panel.children.length ; inx++){
                    let right_temp = context.right_panel.children[inx].getComponent("SpecCards");
                    right_temp.reinit();
                }

                cardpanel = context.right_panel ;
                cardprefab = context.takecards_right ;
                deskcardpanel = context.deskcards_right_panel ;

            }else if(temp.tablepos == "left"){
                for(var inx = 0 ; inx < context.left_panel.children.length ; inx++){
                    let left_temp = context.left_panel.children[inx].getComponent("SpecCards");
                    left_temp.reinit();
                }

                cardpanel = context.left_panel ;
                cardprefab = context.takecards_left ;
                deskcardpanel = context.deskcards_left_panel ;
            }else if(temp.tablepos == "top"){
                for(var inx = 0 ; inx < context.top_panel.children.length ; inx++){
                    let top_temp = context.top_panel.children[inx].getComponent("SpecCards");
                    top_temp.reinit();
                }

                cardpanel = context.top_panel ;
                cardprefab = context.takecards_one ;
                deskcardpanel = context.deskcards_top_panel ;
            }
            /**
             * 销毁其中一个对象
             */
            cardpanel.children[cardpanel.children.length - 1].destroy();
            let desk_card = cc.instantiate(cardprefab);
            let desk_script = desk_card.getComponent("DeskCards");
            desk_script.init(data.card);
            desk_card.parent = deskcardpanel ;
        }
    },
    /**
     * 下一个玩家抓牌的事件， 如果上一个玩家出牌后，没有其他玩家杠、碰、吃、胡等动作，则会同时有一个抓牌的事件，否则，会等待玩家 杠、碰、吃、胡完成
     * @param data
     * @param context
     */
    dealcard_event:function(data , context){
       
        let player = context.player(data.userid , context);
        context.select_action_searchlight(data, context , player) ;

        if(data.userid == cc.beimi.user.id){
            context.initDealHandCards(context , data);
        }else{
            let inx = 0 ;
            if(player.tablepos == "top"){
                //context.right_panel ;
                inx = 1 ;
            }else if(player.tablepos == "left"){
                inx = 2 ;
            }
            context.initPlayerHandCards(0 , 1 , inx , context , true);
        }
       
        context.desk_cards.string = data.deskcards ;
    },
    select_action_searchlight:function(data , context , player){
        context.exchange_searchlight(player.tablepos , context);
        /**
         */
        context.exchange_state("nextplayer" , context);
    },
    allcards_event:function(data , context){
        //结算界面，
        let temp = cc.instantiate(context.summary) ;
        temp.parent = context.root() ;
        temp.getComponent('SummaryClick').setData(data);
    },
    /**
     * 恢复牌局数据， 等待服务端推送 Players数据后进行恢复
     */
    recoverboard:function(data,context){
        //this.statebtn.active = false ;
    },
    /**
     * 接收到服务端的 推送的 玩家数据，根据玩家数据 恢复牌局
     * @param data
     * @param context
     */
    players_event:function(data,context){
        context.collect(context) ;    //先回收资源，然后再初始化
        var inx = 0 ;
        for(var i=0 ; i<data.length ; i++){
            let temp = data[i] ;
            if(temp.id != cc.beimi.user.id){
                var player = context.playerspool.get();
                var playerscript = player.getComponent("MaJiangPlayer");
                var tablepos = "" ;
                if(inx == 0){
                    //var playerscript = player.getComponent("MaJiangPlayer");
                    player.setPosition(570 , 50);
                    tablepos = "right" ;
                   
                }else if(inx == 1){
                    //var playerscript = player.getComponent("MaJiangPlayer");
                    player.setPosition(400 , 300);
                    tablepos = "top" ;
                    
                }else if(inx == 2){
                    //var playerscript = player.getComponent("MaJiangPlayer");
                    player.setPosition(-570 , 50);
                    tablepos = "left" ;

                }

                playerscript.init(temp , inx , tablepos);
                player.parent = context.root();
                context.playersarray.push(player) ;
                inx++;
            }
        }
    },
    /**
     * 接受新的庄家数据
     * @param data
     * @param context
     */
    banker_event:function(data, context){
        /**
         *
         */
        for(var inx = 0 ; inx<context.playersarray.length ; inx++){
            let temp = context.playersarray[inx].getComponent("MaJiangPlayer") ;
            if(temp.data.id == data.userid){
                temp.banker(); break ;
            }
        }
    },
    /**
     * 接受服务端的数据，玩家杠碰、吃胡等动作
     * @param data
     * @param context
     */
    action_event:function(data, context){
       // if(cc.beimi.user.id == data.userid){
            let gang , peng , chi , hu , guo ,dan,ting;
            context.chis = data["chis"]?data["chis"]:[];
            context.gangs = data["gangs"]?data["gangs"]:[];
            context.dans = data["dans"]?data["dans"]:[];
            
            if(data.deal == true){  //发牌的动作
                let desk_script = context.actionnode_two.getComponent("DeskCards") ;
                desk_script.init(data.card);
                for(var inx = 0 ; inx < context.actionnode_two_list.children.length ; inx++){
                    let temp = context.actionnode_two_list.children[inx] ;
                    if(temp.name == "gang"){gang = temp ;}
                    if(temp.name == "dan"){dan = temp ;}
                    if(temp.name == "ting"){ting = temp ;}
                    if(temp.name == "hu"){hu = temp ;}
                    temp.active = false ;
                }
                var count = 0;
                if(data.gang){
                    gang.active = true ;
                    gang.x = - 250 + count * 82 ;
                    count++;
                }
                if(data.dan){
                    dan.active = true ;
                    dan.x = - 250 + count * 82 ;
                    count++;
                }
                if(data.ting){
                    ting.active = true ;
                    ting.x = - 250 + count * 82 ;
                    count++;
                }
                if(data.hu){
                    hu.active = true ;
                    hu.x = - 250 + count * 82 ;
                    count++;
                }
               
                var action = cc.moveTo(0.5,940 - count*85,-147);
                console.log(940 - count*85);
                context.actionnode_two.runAction(action);
                console.log(context.actionnode_two);
                //context.actionnode_deal.active = true ;

                context.action = "deal" ;
            }else{
                // if((data.gang == true || data.peng == true || data.chi == true) && data.hu == true){
                //     let desk_script = context.actionnode_three.getComponent("DeskCards") ;
                //     desk_script.init(data.card);

                //     for(var inx = 0 ; inx < context.actionnode_three_list.children.length ; inx++){
                //         let temp = context.actionnode_three_list.children[inx] ;
                //         if(temp.name == "gang"){gang = temp ;}
                //         if(temp.name == "peng"){peng = temp ;}
                //         if(temp.name == "chi"){chi = temp ;}
                //         if(temp.name == "hu"){hu = temp ;}
                //         if(temp.name == "guo"){guo = temp ;}
                //         temp.active = false ;
                //     }
                //     if(data.gang){gang.active = true ;}
                //     if(data.peng){peng.active = true ;}
                //     if(data.chi){chi.active = true ;}
                //     if(data.deal == false){
                //         guo.active = true;
                //     }
                //     hu.active = true ;

                //     let ani = context.actionnode_three.getComponent(cc.Animation);
                //     ani.play("majiang_three_action") ;
                //     context.action = "three" ;
                // }else if(data.gang == true || data.peng == true || data.chi == true || data.hu == true){
                    
                // }
                let desk_script = context.actionnode_two.getComponent("DeskCards") ;
                desk_script.init(data.card);
                for(var inx = 0 ; inx < context.actionnode_two_list.children.length ; inx++){
                    let temp = context.actionnode_two_list.children[inx] ;
                    if(temp.name == "gang"){gang = temp ;}
                    if(temp.name == "peng"){peng = temp ;}
                    if(temp.name == "chi"){chi = temp ;}
                    if(temp.name == "hu"){hu = temp ;}
                    if(temp.name == "guo"){guo = temp ;}
                    temp.active = false ;
                }
                var count = 0;
                if(data.gang){
                    gang.active = true ;
                    gang.x = - 250 + count * 82
                    count++;
                }
                if(data.peng){
                    peng.active = true ;
                    peng.x = - 250 + count * 82
                    count++;
                }
                if(data.chi){
                    chi.active = true ;
                    chi.x = - 250 + count * 82
                    count++;
                }
                if(data.hu){
                    hu.active = true ;
                    hu.x = - 250 + count * 82
                    count++;
                }
                if(data.deal == false){
                    guo.active = true ;
                    guo.x = - 250 + count * 82
                    count++;
                }
                
                var action = cc.moveTo(0.5,940 - count*85,-147);
                console.log(940 - count*85);
                context.actionnode_two.runAction(action);
                console.log(context.actionnode_two);
                // let ani = context.actionnode_two.getComponent(cc.Animation);
                // ani.play("majiang_action") ;
                context.action = "two" ;
            }
       // }
    },
    selectaction_event:function(data , context){
        let player = context.player(data.userid , context), opParent, count = 0;
        /**
         * 杠碰吃，胡都需要将牌从 触发玩家的 桌牌 里 移除，然后放入当前玩家 桌牌列表里，如果是胡牌，则放到 胡牌 列表里，首先
         * 首先，需要找到触发对象，如果触发对象不是 all ， 则 直接找到 对象对应的玩家 桌牌列表，并找到 桌牌里 的最后 的 牌，
         * 然后将此牌 移除即可，如果对象是 all， 则不用做任何处理即可
         */
        if(cc.beimi.user.id == data.userid){
            /**
             * 碰，显示碰的动画，
             * 杠，显示杠的动画，杠分为：明杠，暗杠，弯杠，每种动画效果不同，明杠/暗杠需要扣三家分，弯杠需要扣一家分
             * 胡，根据玩法不同，推倒胡和血流/血战
             */
            if(data.target == "all") {
                let rightpre = cc.instantiate(context.action_gang_ming_prefab);
                rightpre.parent = context.deskcards_right_panel.parent;

                let toppre = cc.instantiate(context.action_gang_ming_prefab);
                toppre.parent = context.deskcards_top_panel.parent;

                let leftpre = cc.instantiate(context.action_gang_ming_prefab);
                leftpre.parent = context.deskcards_left_panel.parent;
            }else{
                //碰的特效
                context.select_action_searchlight(data, context , player) ;

            }
            context.handCardRemove(data,context);//碰、点杠等情况只有data.card的情况需要处理。
            let opCards , back = false , fangwei = player.tablepos ;
            //根据方位判断parent
            
            opParent = cc.find("Canvas/content/handcards/deskcard/kong") ;
            if(data.action == "chi"){
                function sortNumber(a,b){return b - a}
                data.cards.push(data.card); 
                data.cards.sort(sortNumber);
                opCards = data.cards;
            } else if ( data.action == "peng" ) {
                data.cards.push(data.card); 
                opCards = data.cards;
            } else if ( data.action == "gang" ) {
                if ( data.card && data.card != -1 ) {
                    data.cards.push(data.card);
                }
                if ( data.actype == 'an' ){
                    back = true ;
                }

                opCards = data.cards;
            } else if ( data.action == "dan" ) {
                opCards = data.cards;
            }
            context.cardModle(opCards,opParent,back,fangwei,context);//补杠和补蛋的时候，逻辑需要区分。
        }else if (player.tablepos == 'right'){
            opParent = cc.find("Canvas/content/handcards/"+player.tablepos+"desk/kong") ;
            otherHandCardRemove(data,cotext);
            let opCards , back = false , fangwei = player.tablepos ;
            if(data.action =='chi'){
                function sortNumber(a,b){return b - a}
                data.cards.push(data.card); 
                data.cards.sort(sortNumber);
                opCards = data.cards;
            }else if(data.action == 'peng'){
                data.cards.push(data.card); 
                opCards = data.cards;
            }else if(data.action == 'gang'){
                if ( data.card && data.card != -1 ) {
                    data.cards.push(data.card);
                }
                if ( data.actype == 'an' ){
                    back = true ;
                }
                opCards = data.cards;
            }else if(data.action == 'dan'){
                opCards = data.cards;
            }
            context.cardModle(opCards,opParent,back,fangwei,context);
            
        }else if(player.tablepos == 'left' ){
            opParent = cc.find("Canvas/content/handcards/"+player.tablepos+"desk/kong") ;
            otherHandCardRemove(data,cotext);
            let opCards , back = false , fangwei = player.tablepos ;
            if(data.action =='chi'){
                function sortNumber(a,b){return b - a}
                data.cards.push(data.card); 
                data.cards.sort(sortNumber);
                opCards = data.cards;
            }else if(data.action == 'peng'){
                data.cards.push(data.card); 
                opCards = data.cards;
            }else if(data.action == 'gang'){
                if ( data.card && data.card != -1 ) {
                    data.cards.push(data.card);
                }
                if ( data.actype == 'an' ){
                    back = true ;
                }
                opCards = data.cards;
            }else if(data.action == 'dan'){
                opCards = data.cards;
            }
            context.cardModle(opCards,opParent,back,fangwei,context);
            
 
        }else{//对家
            opParent = cc.find("Canvas/content/handcards/"+player.tablepos+"desk/kong") ;
            otherHandCardRemove(data,cotext);
            let opCards , back = false , fangwei = player.tablepos ;
            if(data.action =='chi'){
                function sortNumber(a,b){return b - a}
                data.cards.push(data.card); 
                data.cards.sort(sortNumber);
                opCards = data.cards;
            }else if(data.action == 'peng'){
                data.cards.push(data.card); 
                opCards = data.cards;
            }else if(data.action == 'gang'){
                if ( data.card && data.card != -1 ) {
                    data.cards.push(data.card);
                }
                if ( data.actype == 'an' ){
                    back = true ;
                }
                opCards = data.cards;
            }else if(data.action == 'dan'){
                opCards = data.cards;
            }
            context.cardModle(opCards,opParent,back,fangwei,context);
         
        }
        if(data.action == 'peng'||(data.action == 'gang'&&data.cards.length==3)||data.action=='chi'||data.action == 'hu'){
            //以下代码是用于找到 杠/碰/吃/胡牌的 目标牌  ， 然后将此牌 从 桌面牌中移除

            let temp = context.player(data.target, context), deskcardpanel;
            if (temp.tablepos == "right") {
                deskcardpanel = context.deskcards_right_panel;
            } else if (temp.tablepos == "left") {
                deskcardpanel = context.deskcards_left_panel;
            } else if (temp.tablepos == "top") {
                deskcardpanel = context.deskcards_top_panel;
            }else{
                deskcardpanel = context.deskcards_current_panel;
            }
            if (deskcardpanel.children.length > 0) {
                deskcardpanel.children[deskcardpanel.children.length - 1].destroy();
            }
        }
    },
    /**
     * 接收发牌信息，需要根据玩家位置确定是哪家的牌
     * @param data
     * @param context
     */
    play_event:function(data , context){
        /**
         * 改变状态，开始发牌
         */
        context.exchange_state("begin" , context);


        var temp_player = data.player ;
        var cards = context.decode(temp_player.cards);

        setTimeout(function(){
            context.calcdesc_cards(context , 136 , data.deskcards) ;
        } , 0) ;
        var groupNums = 0 ;
        for(var times = 0 ; times < 4 ; times++){
            setTimeout(function(){

                context.initMjCards(groupNums , context , cards , temp_player.banker) ;
                /**
                 * 初始化其他玩家数据
                 */
                var inx = 0 ;
                for(var i=0 ; i<data.players.length ; i++){
                    if(data.players[i].playuser != cc.beimi.user.id){
                        context.initPlayerHandCards(groupNums , data.players[inx++].deskcards , inx,context , false);
                    }
                }
                groupNums = groupNums + 1 ;
            } , (times+1) * 200);
        }

        setTimeout(function(){
            let ani = context.cards_panel.getComponent(cc.Animation);
            ani.play("majiang_reorder") ;
            var maxvalue  = -100;
            var maxvalluecard ;
            for(var i=0 ; i<context.playercards.length ; i++ ){
                let temp_script = context.playercards[i].getComponent("HandCards") ;
                if(temp_script.value >= 0){
                    context.playercards[i].zIndex = temp_script.value ;
                }else{
                    context.playercards[i].zIndex = 200 + temp_script.value ;
                }
                if(context.playercards[i].zIndex > maxvalue){
                    maxvalue = context.playercards[i].zIndex ;
                    maxvalluecard = context.playercards[i] ;
                }
            }
            if(temp_player.banker == true){
                maxvalluecard.getComponent("HandCards").lastone() ;
            }
        } , 1000);
        setTimeout(function(){
            context.exchange_state("play" , context);
        } , 1500)

        /**
         * 统一处理排序 的动画
         */

        /**
         * 初始化状态，首个玩家加入，然后开始等待其他玩家 ， 如果是 恢复数据， 则不会进入
         */
        //this.statusbtn.active = true ;
        //ljh改  神牌
        if(data.player.power){
            if(data.player.powercard&&data.player.powercard.length>0){
                for(let i= 0 ; i<data.player.powercard.length;i++){
                    var laiziZM = cc.instantiate(context.ZM);
                    laiziZM.parent = context.godcard.children[0];
                    var LZH  = laiziZM.getComponent('DeskCards');
                    LZH.init(data.player.value);
                }
            }else{
                var laiziFM = cc.instantiate(context.FM);
                laiziFM.parent = context.godcard;
                console.log(laiziFM.position);
            }
        }      
    },
    /**
     * 开始定缺
     * @param data
     * @param context
     */
    selectcolor_event:function(data, context){
        /**
         *
         */
        for(var inx = 0 ; inx<context.playersarray.length ; inx++){
            let temp = context.playersarray[inx].getComponent("MaJiangPlayer") ;
            if(temp.data.id == cc.beimi.user.id){
                temp.selecting();
            }
        }

        context.exchange_state("selectcolor" , context);
    },
    /**
     * 通知定缺结果
     * @param data
     * @param context
     */
    selectresult_event:function(data, context){
        /**
         *
         */
        for(var inx = 0 ; inx<context.playersarray.length ; inx++){
            let temp = context.playersarray[inx].getComponent("MaJiangPlayer") ;
            if(temp.data.id == data.userid){
                temp.selectresult(data);
                break ;
            }
        }
        if(data.userid == cc.beimi.user.id){
            context.exchange_state("selectresult" , context);
            if(data.color < 10){
                context.changecolor(data , context);
            }
        }
    },
    /**
     * 开始打牌，状态标记
     * @param data
     * @param context
     */
    lasthands_event:function(data, context){
        if(data.userid == cc.beimi.user.id){    //该我出牌 , 庄家出牌，可以不用判断是否庄家了 ，不过，庄家数据已经传过来了
            context.exchange_state("lasthands" , context);
            context.exchange_searchlight("current",context);
        }else{
            context.exchange_state("otherplayer" , context);    //当前玩家出牌，计时器开始计时，探照灯照向该玩家
            for(var inx = 0 ; inx<context.playersarray.length ; inx++){
                let temp = context.playersarray[inx].getComponent("MaJiangPlayer") ;
                if(temp.data.id == data.userid){
                    context.exchange_searchlight(temp.tablepos,context);; break ;
                }
            }
        }
    },
    changecolor:function(data , context){
        let lastcard ;
        for(var inx = 0 ; inx < context.playercards.length ; inx++){
            let temp = context.playercards[inx].getComponent("HandCards");
            temp.relastone();
            if(parseInt(temp.value / 36) == data.color){
                temp.selected();
                context.playercards[inx].zIndex = 1000 + temp.value ;
                if(lastcard == null || lastcard.zIndex < context.playercards[inx].zIndex){
                    lastcard = context.playercards[inx] ;
                }
            }
        }
        if(data.banker == cc.beimi.user.id && lastcard != null){
            let temp = lastcard.getComponent("HandCards");
            temp.lastone();
        }
    },
    /**
     * 显示 剩余牌
     * @param start
     * @param end
     */
    calcdesc_cards:function(context ,start , end){
        start = start - 1 ;
        if(start > end){
            context.desk_cards.string = start ;
            setTimeout(function(){
                context.calcdesc_cards(context , start , end ) ;
            } , 5) ;
        }
    },
    initDealHandCards:function(context , data){
        let temp = context.cardpool.get();
        let temp_script = temp.getComponent("HandCards") ;

        context.playercards.push(temp);

        temp_script.init(data.card);

        temp_script.lastone();
        // console.log(data);
        // if(parseInt(data.card / 36) == data.color){
        //     temp_script.selected() ;
        // }
        temp.zIndex = 2000; //直接放到最后了，出牌后，恢复 zIndex
        temp.parent = context.cards_panel ;  //庄家的最后一张牌
    },
    /**
     * 初始化其他玩家手牌，
     * @param groupNums
     * @param deskcards
     * @param inx
     * @param context
     * @param spec 是否特殊的牌，即刚抓起来的牌
     */
    initPlayerHandCards:function(groupNums , deskcards , inx , context , spec){
        let parent = context.right_panel  ;
        let cardarray = context.rightcards;
        let prefab = context.cards_right ;

        if(inx == 1){
            parent = context.top_panel  ;
            cardarray = context.topcards   ;
            prefab = context.cards_top ;
        }else if(inx == 2){
            parent = context.left_panel  ;
            cardarray = context.leftcards;
            prefab = context.cards_left ;
        }
        context.initOtherCards(groupNums , context , deskcards , prefab , cardarray , parent , spec , inx);    //左侧，
    },
    initOtherCards:function(group , context , cards , prefab , cardsarray, parent , spec , inx){
        for(var i=group*4 ; i< cards && i<(group+1)*4 ; i++) {
            //let temp = context.cardpool.get();
            //temp.parent = parent ;
            let temp = cc.instantiate(prefab) ;
            let temp_script = temp.getComponent("SpecCards") ;
            temp_script.init(spec,inx);

            temp.parent = parent ;
            cardsarray.push(temp) ;
        }
    },
    initMjCards:function(group , context , cards , banker){
        
        for(var i=group*4 ; i< cards.length && i<(group+1)*4 ; i++){
            if(context.cardpool){
                let temp = context.cardpool.get();
                let temp_script = temp.getComponent("HandCards") ;
    
                context.playercards.push(temp);
    
                temp_script.init(cards[i]);
    
                if(banker == true && i == (cards.length - 1)){
                    temp.parent = context.one_card_panel ;  //庄家的最后一张牌
                }else{
                    temp.parent = context.cards_panel ;
                }
    
                setTimeout(function(){
                    temp.parent = context.cards_panel ;
                } , 200) ;
            }   
        }
    },
    /**
     * 回收系统资源，用于清理资源
     * @param context
     */
    collect:function(context){
        for(var i=0 ; i<context.playersarray.length ; ){
            let player = context.playersarray[i] ;
            var playerscript = player.getComponent("MaJiangPlayer");
            if(playerscript.data.id != cc.beimi.user.id){       //当前 玩家不回收，最终 Destroy 的时候会被回收
                context.playerspool.put(player);
                context.playersarray.splice(i,1) ;
            }else{
                i++ ;
            }
        }
    },
    /**
     * 按钮操作，点击 开始游戏按钮后的触发动作，进入计时，然后等待服务端推送数据和 状态机流程流转
     */
    waittingForPlayers:function(){
        this.exchange_state("ready" , this);
    },
    player:function(pid , context){
        let player ;
        for(var inx = 0 ; inx<context.playersarray.length ; inx++){
            let temp = context.playersarray[inx].getComponent("MaJiangPlayer") ;
            if(temp.data.id == pid){
                player = temp ; break ;
            }
        }
        return player ;
    },
    /**
     * 状态切换，使用状态参数 切换，避免直接修改 对象状态，避免混乱
     */
    exchange_state:function(state , object){
        let readybtn = null , waitting = null , selectbtn = null , banker = null ;
        for(var i=0 ; i<object.statebtn.children.length ; i++){
            let target = object.statebtn.children[i] ;
            if(target.name == "readybtn"){
                readybtn = target ;
            }else if(target.name == "waitting"){
                waitting = target ;
            }else if(target.name == "select"){
                selectbtn = target ;
            }else if(target.name == "banker"){
                banker = target ;
            }
            target.active = false ;
        };
        switch(state){
            case "init" :
                object.desk_tip.active = false;
                readybtn.active = true ;
                object.actionnode_deal.active =false ;

                /**
                 * 探照灯 熄灭
                 */
                object.exchange_searchlight("none",object);

                break;
            case "ready" :
                waitting.active = true ;
                //ljh改 开局60s
                object.timer(object , 60) ;
                break;
            case "begin" :
                waitting.active = false ;
                /**
                 * 显示 当前还有多少张底牌
                 * @type {boolean}
                 */
                object.desk_tip.active = true;
                /**
                 * 开始发牌动画，取消所有进行中的计时器
                 */
                object.canceltimer(object);
                break;
            case "play" :
                /**
                 * 一个短暂的状态，等待下一步指令是 定缺 还是直接开始打牌 ， 持续时间的计时器是 2秒
                 */
                object.timer(object , 2) ;
                break   ;
            case "selectcolor" :
                /**
                 * 定缺 ，由服务端确定是否有此个节点，下个版本将会实现流程引擎控制 游戏 节点，一切都在服务端 进行配置工作
                 * @type {boolean}
                 */
                object.exchange_searchlight("current",object);
                selectbtn.active = true ;
                object.timer(object , 5) ;
                break   ;
            case "selectresult" :
                /**
                 * 选择了定缺结果，关闭选择按钮
                 * @type {boolean}
                 */
                selectbtn.active = false ;
                object.canceltimer(object) ;
                break   ;
            case "lasthands" :
                /**
                 * 选择了定缺结果，关闭选择按钮
                 * @type {boolean}
                 */
                banker.active = true ;
                /**
                 * 计时器方向
                 */
                object.timer(object , 8) ;
                break   ;
            case "otherplayer" :
            
                /**
                 * 计时器方向
                 */
                object.timer(object , 8) ;
                break   ;
            case "takecard" :
                /**
                 * 选择了定缺结果，关闭选择按钮
                 * @type {boolean}
                 */
                banker.active = false;
                //object.canceltimer(object) ;
                break   ;
            case "nextplayer" :
                if(object.action ){
                    if(object.action == "two"){
                        // let ani = object.actionnode_two.getComponent(cc.Animation);
                        // ani.play("majiang_action_end") ;
                        var action = cc.moveTo(0.5,1122,-147);
                        object.actionnode_two.runAction(action);
                    }else if(object.action == "three") {
                        let ani = object.actionnode_three.getComponent(cc.Animation);
                        ani.play("majiang_three_action_end") ;
                    }else if(object.action == "deal") {
                        var action = cc.moveTo(0.5,1122,-147);
                        object.actionnode_two.runAction(action);
                        object.actionnode_deal.active = false ;
                    }
                }
                object.action = null ;
                /**
                 * 选择了定缺结果，关闭选择按钮
                 * @type {boolean}
                 */
                object.timer(object , 8) ;
                break   ;
        }
    },
    exchange_searchlight:function(direction , context){
        for(var inx = 0 ; inx<context.searchlight.children.length ; inx++){
            if(direction == context.searchlight.children[inx].name){
                context.searchlight.children[inx].active = true ;
            }else{
                context.searchlight.children[inx].active = false ;
            }
        }
    },
    canceltimer:function(object){
        object.unscheduleAllCallbacks();
        object.mjtimer.string = "00" ;
    },
    timer:function(object , times){
        if(times > 9){
            object.mjtimer.string = times ;
        }else{
            object.mjtimer.string = "0"+times ;
        }

        object.callback = function(){
            times = times - 1 ;
            if(times >= 0){
                let text = times ;
                if(times < 10){
                    text = "0"+times ;
                }
                object.mjtimer.string = text ;
            }
        }
        object.unscheduleAllCallbacks();
        /**
         * 启动计时器，应该从后台传入 配置数据，控制 等待玩家 的等待时长
         */
        object.schedule(object.callback, 1, times, 0);
    },
    onDestroy:function(){
        if(this.ready()) {
            let socket = this.socket();
            socket.disconnect();
        }
    },
    mjOperation : function(event,params,context){
            this.selectfather.active = true;
            //context.card4.getComponent('operation').setAction(event);
            
            for(var i = 0 ; i < params.length;i++ ){
                var b = cc.instantiate(context.card4);
                b.getComponent('operation').setAction({'name':event,'params':params[i]});
                b.width = 47*(params[i].length);
                b.parent = context.selectfather;
                for(var j = 0 ; j< params[i].length; j++){
                    var a = cc.instantiate(context.mjUnit);
                    a.getComponent('DeskCards').init(params[i][j]);
                    a.parent = b;
                    console.log(a.position);
                }
            }
    },
    reinitGame: function(){
        for(let i = 0; i< this.deskcards_current_panel.children.length ;i++){
            this.deskcards_current_panel.children[i].destroy();
        };
        for(let i = 0; i< this.deskcards_left_panel.children.length ;i++){
            this.deskcards_left_panel.children[i].destroy();
        };
        for(let i = 0; i< this.deskcards_right_panel.children.length ;i++){
            this.deskcards_right_panel.children[i].destroy();
        };
        for(let i = 0; i< this.deskcards_top_panel.children.length ;i++){
            this.deskcards_top_panel.children[i].destroy();
        };
        for(let i = 0; i< this.cards_panel.children.length ;i++){
            this.cardpool.put(this.playercards[i])
            this.playercards.splice(i, 1);
        };
        for(let i = 0; i< this.left_panel.children.length ;i++){
            this.left_panel.children[i].destroy();
            this.leftcards.splice(i,1);
        };
        for(let i = 0; i< this.right_panel.children.length ;i++){
            this.right_panel.children[i].destroy();
            this.rightcards.splice(i,1);
        };
        for(let i = 0; i< this.top_panel.children.length ;i++){
            this.top_panel.children[i].destroy();
            this.topcards.splice(i,1);
        };
        for(let i = 0; i< this.gang_current.children.length ;i++){
            this.gang_current.children[i].destroy();
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    cardModle: function(cards,parent,back,fangwei,context){
        if(cards.length == 1){
            var cardOp = findCardForKong(parent,cards[0]) ;
            let card = cc.instantiate(context.dan_current);
            let temp = card.getComponent('DanAction');
            temp.init(cards[i],false,fangwei);
            if ( cardOp.isGang ) {
                card.parent = cardOp.cardNode ;
            } else {
                var count = cardOp.cardNode.children[cardOp.cardNum];
                count.string = Number(Number(count.string)+1);
            }
        }else{
            let cardParent = null ;
            if(fangwei == 'top'){
                cardParent = cc.instantiate(context.top_danLoyad);
            }else if(fangwei == 'left'){
                cardParent = cc.instantiate(context.left_danLoyad);
            }else if(fangwei == 'right'){
                cardParent = cc.instantiate(context.right_danLoyad);
            }else{
                cardParent = cc.instantiate(context.one_card_panel) ;
            }
            for(let i = 0 ; i< cards.length;i++){
                let card = cc.instantiate(context.dan_current);
                
                let temp = card.getComponent('DanAction');
                if ( i == 2 && back == true ) {
                    temp.init(cards[i],false,fangwei);
                } else {
                    temp.init(cards[i],back,fangwei);
                }
                card.parent = cardParent;
            }
            cardParent.parent = parent ;
        }       
    },
    findCardForKong: function(kong,card) {
        var resNode ;
        var isGang ;
        var cardNum
        for ( var i = 0 ; i < kong.children.length ; i++ ) {
            var cards = kong.children[i] ;
            var dans = cards.children ;
            isGang = true ;
            for ( var j = 0 ; j<dans.length; j++ ){
                var cardUnit = dans[j] ;
                if ( card == cardUnit.getComponent("DanAction").value ) {
                    resNode = cards ;
                    cardNum = i;
                } else if ( card != cardUnit.getComponent("DanAction").value) {
                    isGang = false ;
                }
            }
            if ( isGang ){
                resNode = cards ;
                break ;
            }
        }
        return {cardNode:resNode,isGang:isGang,num:cardNum} ;
    },
    handCardRemove: function(data,context){
        if ( data.cards ) {
            for(let i =0 ;i< data.cards.length; i++){
                for(let inx = 0 ; inx < context.playercards.length ; inx++ ){
                    let temp = context.playercards[inx].getComponent("HandCards");
                    if(data.cards[i]== temp.value){
                        context.cardpool.put(context.playercards[inx]) ;
                        context.playercards.splice(inx, 1) ;
                    }
                }
            }
        }
        if ( data.card != -1 ) {
            for(var inx = 0 ; inx < context.playercards.length ; ){
                let temp = context.playercards[inx].getComponent("HandCards");
                if(data.card == temp.value){
                    context.cardpool.put(context.playercards[inx]) ;
                    context.playercards.splice(inx, 1) ;
                    break ;
                }else{
                    inx++ ;
                }
            }
        }
    },
    otherHandCardRemove: function(data,context){
        for(let i = 0 ; i<data.cards.length; i++){
            context.right_panel.children[i].destroy();
            context.rightcards.splice(i,1);
        }      
    },
    dosomething: function (data , context){
        this.cardModle([19,21,12],cc.find("Canvas/content/handcards/leftdesk/kong"),true,'left',context);
        this.cardModle([19,21,12],cc.find("Canvas/content/handcards/leftdesk/kong"),true,'left',context);
        this.cardModle([19,20,12],cc.find("Canvas/content/handcards/rightdesk/kong"),true,'right',context);
        this.cardModle([20,21,12],cc.find("Canvas/content/handcards/rightdesk/kong"),true,'right',context);
        
        this.cardModle([19,20,12],cc.find("Canvas/content/handcards/topdesk/kong"),true,'top',context);
        this.cardModle([19,20,21],cc.find("Canvas/content/handcards/topdesk/kong"),true,'top',context);
        
        this.cardModle([12,20,21],cc.find("Canvas/content/handcards/deskcard/kong"),true,'',context);
        this.cardModle([20,12,21],cc.find("Canvas/content/handcards/deskcard/kong"),true,'',context);
        
    },

});
