var beiMiCommon = require("BeiMiCommon");

cc.Class({
    extends: beiMiCommon,
    //extends: cc.Component,
    properties: {
        tingting: cc.Node,
        top_hua: cc.Node,
        liuju: cc.Node,
        //huaction
        current_hu:cc.Node,

        currentting: cc.Node,
        topting: cc.Node,
        rightting: cc.Node,
        leftting: cc.Node,
        
        tingSelect:cc.Node,
        tingSelectch:cc.Prefab,
        roomInfo: cc.Node,
        
        //总局数和当前局数和玩法
        noticeShare:cc.Node,
        totaljs:cc.Label,
        wanfa:cc.Label,

        duankai: cc.Node,
        duankai2: cc.Node,
        gameSettingClick: cc.Prefab,

        leave_alert: cc.Prefab,
        tuoguan: cc.Node,
        dan_topcurrent:cc.Prefab,
        dan_leftcurrent:cc.Prefab,
        dan_rightcurrent:cc.Prefab,
        dan_mycurrent:cc.Prefab,
        dan_childrend: cc.Node,
        isOver: cc.Prefab,

        buhua_top:cc.Prefab,
        buhua_lef:cc.Prefab,
        buhua_right:cc.Prefab,
        buhua_my:cc.Prefab,

        ready2: cc.Node,
        readybth: cc.Node,
        right_player: cc.Node,
        left_player: cc.Node,
        top_player: cc.Node,
        current_player:cc.Node,
        setting_coin: cc.Node, 
        right_ready: cc.Node,
        left_ready: cc.Node,
        top_ready:cc.Node,
        current_ready:cc.Node,

        left_danLoyad: cc.Node,
        right_danLoyad: cc.Node,
        top_danLoyad: cc.Node,

        allbord: cc.Node,
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
        },

        bkLogoImg:{
            default:null,
            type:cc.Node
        },
        bkLogoImgLG:{
            default:null,
            type:cc.SpriteFrame
        },
        bkLogoImgTP:{
            default:null,
            type:cc.SpriteFrame
        },
        csNode:{
            default:null,
            type:cc.Node
        },
        cs1:{
            default:null,
            type:cc.SpriteFrame
        },
        cs2:{
            default:null,
            type:cc.SpriteFrame
        },
        wxButton: cc.Button,
        ggButton: cc.Button
    },


    // use this for initialization
    /**
     * 重构后，只有两个消息类型
     */
    onLoad: function () {
        this.bgsetting();
        if(cc.beimi.browserType=="wechat"){
            // this.wxButton.node.active = true ;
            let room ='';
            if(cc.beimi.match != 'true'){
                room = cc.beimi.room
            }
            cc.beimi.WXorBlow.shareRoom(room);                    
        }else if(cc.beimi.browserType != null){
            // this.ggButton.node.active = true ;
        }
        var sprite = this.bkLogoImg.getComponent(cc.Sprite);
        //切换游戏首页背景图logo
        var sprite = this.bkLogoImg.getComponent(cc.Sprite);
        
        if(cc.beimi.GameBase.gameModel =='wz'){
            if(cc.beimi.playType == "LG"){
                sprite.spriteFrame = this.bkLogoImgLG;//龙港游戏logo
            }else{
                sprite.spriteFrame = this.bkLogoImgTP;//台炮游戏logo
            }
        }
         if(cc.beimi.cardNum > 14){ 
            this.top_panel.parent.x = -142;
            this.top_panel.parent.y = 258;
            this.cards_panel.parent.y = this.cards_panel.parent.y + 12;
            this.cards_panel.parent.x = this.cards_panel.parent.x - 20;
        }else{
            this.cards_panel.parent.children[0].y = this.cards_panel.parent.children[0].y + 10 ;
        }
         //cc.beimi.playerNum = 2;
        this.noticeShare.cascadeOpacity =false;
        
        this.connect();
        cc.sys.localStorage.removeItem('dis');        
        //ljh追加 房号的显示
        if(cc.beimi.match =='false'){
            this.room_num.getComponent(cc.Label).string = cc.beimi.room;
        }else if(cc.beimi.match == 'true'){
            this.setting_coin.children[0].children[0].children[0].getComponent(cc.Label).string = '退出';
            this.setting_coin.children[1].active = false;
            this.room_num.parent.children[2].active =false;
            this.room_num.parent.children[1].getComponent(cc.Label).string = '比赛模式';
            this.room_num.parent.children[1].x = this.room_num.parent.children[1].x +20;
            this.ready2.active = false;
            this.readybth.x = -4;
        };
        this.maxRound = 0;
        if(cc.beimi.maxRound){
            this.maxRound = cc.beimi.maxRound;
        }
        this.totaljs.string = '圈数  '+this.maxRound;
        
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
        cc.beimi.wanfa=null;

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
        this.alert = new cc.NodePool();
        this.setting = new cc.NodePool();
        this.leave =new cc.NodePool();
        
        this.alert.put(cc.instantiate(this.isOver));
        this.setting.put(cc.instantiate(this.gameSettingClick));
        this.leave.put(cc.instantiate(this.leave_alert));
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
        if(cc.beimi.cardNum){
            for(var i=0;i<cc.beimi.cardNum+1;i++){
                this.cardpool.put(cc.instantiate(this.cards_current));
            }
        }else{
            for(var i=0 ; i<14 ; i++){
                this.cardpool.put(cc.instantiate(this.cards_current));
            }
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
            this.map("isOver" , this.isOver_event);
            this.map("over" , this.over_event);
            this.map("unOver" , this.unOver_event);
            this.map("gameOver",this.gameOver_event);
            this.map("changeRoom",this.changeRoom_event);
            
            
            //this.doSomethingBH({action:'buhua'},this);
            socket.on("command" , function(result){
                var data = self.getSelf().parse(result) ;
                console.log(data.command);
                console.log(data);
                self.getSelf().route(data.command)(data , self);
            });
            /**
             * 接受传送的 玩家列表（含AI）
             */

            socket.on("players" , function(result){
                var data = self.getSelf().parse(result) ;
                console.log('players');
                console.log(data);
                /**
                 * 处理 Players
                 */
                self.getSelf().route("players")(data, self);
            });
            socket.on("talkOnSay" , function(result){
                self.talk_event(result,null) ;
            });
        }
        cc.beimi.socket.on("disconnect" , function(){
            
            let mjs = cc.find('Canvas');   
            if(mjs){
                var mj = mjs.getComponent('MajiangDataBind');
                mj.duankai2.active = true;
                mj.duankai.active = false;                
                if(cc.sys.localStorage.getItem('dis')!='true'){                  
                    cc.director.loadScene('majiang');
                }
            }         
           
           
        });

        /**
         * 发射的事件， 在 出牌双击 / 滑动出牌的时候发射的，此处用于接受后统一处理， 避免高度耦合
         * 之所以这样设计，是因为在TakeMJCard里需要引用 麻将牌的 对象池 和 出牌的对象池，如果采用对象传入或者 通过find获取的方式处理
         * 则会导致高度的 组件耦合，不利于系统 未来扩展，也会导致 业务逻辑交叉/混乱
         * 无论 胡牌/杠/碰/吃，都需要采用这种方式处理
         */
        this.node.on('music',function(event){

        });
        this.node.on('click',function(event){
            let mjdata = cc.find('Canvas').getComponent('MajiangDataBind');
            var action = cc.moveTo(0.5,880,274);
            mjdata.setting_coin.runAction(action);
            mjdata.initcardwidth();
        });
        this.node.on('leaveGame',function(){
            let socket = self.getSelf().socket();
            socket.emit('leaveGame',JSON.stringify({
            }))
        });
        this.node.on('overGame',function(event){
            let socket = self.getSelf().socket();
            if(event.getUserData()){
                socket.emit('overGame',JSON.stringify({
                    REFUSE : event.getUserData()
                }))
            }else{
                socket.emit('overGame',JSON.stringify({
                }))
            }
        });
        this.node.on('duankai',function(event){
            let mj = cc.find('Canvas').getComponent('MajiangDataBind');
            mj.duankai.active = true;    
            cc.sys.localStorage.setItem('duankai','true');
        });
       
        this.node.on('chonglian',function(event){
            let mj = cc.find('Canvas').getComponent('MajiangDataBind');
            mj.duankai.active = false;  
            cc.director.loadScene('majiang');
            
            
        });
        this.node.on('takecard', function (event) {
            var context = cc.find('Canvas').getComponent('MajiangDataBind');             
            cc.beimi.audio.playSFX('select.mp3');                            
            if(cc.sys.localStorage.getItem('take') == 'true'){
                let card = event.target.getComponent("TakeMJCard");
                if(card != null){
                    let cardValue = card.target.getComponent('HandCards');
                    self.getSelf().takecard_event({userid:cc.beimi.user.id,card:cardValue.value},self);
                    let card_script = card.target.getComponent("HandCards") ;
                    /**
                     * 提交数据，等待服务器返回
                     */
    
                        //开始匹配
                    let socket = self.getSelf().socket();
                    
                    if (cc.sys.localStorage.getItem('ting') == 'true') {  
                        context.tingting.active = true ;
                        setTimeout(function(){context.tingting.active = false},2000);
                        cc.beimi.audio.playSFX('nv/ting.mp3');                                
                        let socket = self.getSelf().socket();
                        cc.sys.localStorage.removeItem('ting') ;
                        socket.emit("selectaction" , JSON.stringify({
                            action:"ting",
                            actionCard:[card_script.value]
                        }));
                        self.getSelf().tingAction();    
                    } else {
                        socket.emit("doplaycards" , card_script.value) ;
                    }
                    //cc.find("");
                    self.getSelf().shouOperationMune();
                }
                event.stopPropagation();
            }
        });
        /**
         * ActionEvent发射的事件 ， 点击 杠 , 通知服务器端，用户点击了 杠 动作，服务器端进行处理，处理完毕后通知客户端后续动作
         */
        // this.node.on("gang",function(event){
        //     let socket = self.getSelf().socket();
        //     socket.emit("selectaction" , JSON.stringify({
        //         action:"gang",
        //         actionCard:[]
        //     }));
        //     event.stopPropagation();
        // });
        this.node.on('readyGM',function(event){ 
            //alert();
            var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
            context.current_ready.active = true ;    
            let socket = self.getSelf().socket();
            socket.emit('readyGame',JSON.stringify({
            }))
        });
        this.node.on('restar',function(event){
            if(event.getUserData()){
                cc.director.loadScene('gameMain');
            }else{
                if(cc.sys.localStorage.getItem('clear') != 'true'){
                    var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
                    var bth = cc.find('Canvas/global/main/button/readybtn');
                    if(cc.beimi.match != 'true'){
                        bth.active =true;  
                        bth.x= -10;
                    }
                    var laizi = cc.find('Canvas/global/main/godcard/child').children
                    if(laizi){
                        for(let i =0 ; i < laizi.length ; i ++ ){
                            cc.find('Canvas/global/main/godcard/child').children[i].destroy();
                        }
                    }     
                    context.reinitGame(context);
                }
                cc.sys.localStorage.removeItem('clear');
                self.getSelf().shouOperationMune();
                event.target.parent.destroy(); 
            }        
        });
        this.node.on('mjSelection',function(event){
            let father = cc.find('Canvas').getComponent('MajiangDataBind').selectfather;
            father.active= false;
            father.children[0].children[1].children.splice(0,father.children[0].children[1].children.length);
            let socket = self.getSelf().socket();
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
            //cc.find("");
            self.getSelf().shouOperationMune();
            event.stopPropagation();
        });
        /**
         * ActionEvent发射的事件 ， 点击 碰
         */
        this.node.on("peng",function(event){
            cc.sys.localStorage.removeItem('guo');            
            let socket = self.getSelf().socket();
            socket.emit("selectaction" , JSON.stringify({
                action:"peng",
                actionCard:[]
            }));
            //cc.find("");
            self.getSelf().shouOperationMune();
            event.stopPropagation();
        });
        this.node.on("dan",function(event){
            cc.sys.localStorage.removeItem('guo');            
            var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
            if ( context.dans && context.dans.length > 1 ) {
                cc.sys.localStorage.removeItem('take');
                context.mjOperation('dan', context.dans,context);
            } else {
                let socket = self.getSelf().socket();
                let danParam = [];
                if ( context.dans ) {
                    danParam = context.dans[0] ;
                }
                socket.emit("selectaction" , JSON.stringify({
                    action:'dan',
                    actionCard:danParam
                }));
            }
            //cc.find("");
            self.getSelf().shouOperationMune();
            event.stopPropagation();
        });
        this.node.on("gang",function(event){
            cc.sys.localStorage.removeItem('guo');            
            var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
            if ( context.gangs && context.gangs.length > 1 ) {
                cc.sys.localStorage.removeItem('take');                
                context.mjOperation('gang', context.gangs,context);
            } else {
                let socket = self.getSelf().socket();
                let gangParam = [];
                if ( context.gangs ) {
                    gangParam = context.gangs[0] ;
                }
                socket.emit("selectaction" , JSON.stringify({
                    action:'gang',
                    actionCard:gangParam
                }));
            }
            //cc.find("");
            self.getSelf().shouOperationMune();
            event.stopPropagation();
        });

        /**
         * ActionEvent发射的事件 ， 点击 吃
         */
        this.node.on("chi",function(event){
            cc.sys.localStorage.removeItem('guo');            
            var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
            if ( context.chis && context.chis.length > 1 ) {
                cc.sys.localStorage.removeItem('take');
                let array = [];
                let array2 = [];
                function sortNumber(a,b){return a - b}   
                function sortNum(a,b){return b.id - a.id}              
                for(let i = 0 ;i<context.chis.length;i++){
                    let b = {};
                    context.chis[i].sort(sortNumber);
                    b.id = context.chis[i][0];
                    b.value = context.chis[i];
                    array.push(b);
                }
                array.sort(sortNum);
                for(let i = 0 ; i<array.length;i++){
                    array2.push(array[i].value);
                }
                

                context.mjOperation('chi',array2,context);
            } else {
                let socket = self.getSelf().socket();
                socket.emit("selectaction" , JSON.stringify({
                    action:'chi',
                    actionCard:context.chis[0]
                }));
            }
            //cc.find("");
            self.getSelf().shouOperationMune();
            event.stopPropagation();
        });
        /**
         * ActionEvent发射的事件 ， 点击 听
         */
        this.node.on("ting",function(event){
            cc.sys.localStorage.removeItem('guo');            
            /*let socket = self.getSelf().socket();
            socket.emit("selectaction" , JSON.stringify({
                action:"ting",
                actionCard:[]
            }));*/
            //记录听得状态后，在出牌阶段判断状态并发送听牌事件。
            var context = cc.find('Canvas').getComponent('MajiangDataBind'); 
            cc.sys.localStorage.setItem('ting','true') ;
            cc.sys.localStorage.setItem('alting','true') ;
            context.initcardwidth(true);
            self.getSelf().tingAction();                 
            if (context.tings){
                let length =cc.find('Canvas/content/handcards/deskcard/layout').children.length;
                for(let j = 0 ; j< context.tings.length;j++){
                    let cv = context.tings[j].card;                                    
                    for(let i =0; i<length;i++){
                        let cards =cc.find('Canvas/content/handcards/deskcard/layout').children[i];
                        let button = cc.find('Canvas/content/handcards/deskcard/layout').children[i].children[0];
                        let handCards = cards.getComponent("HandCards");
                        if((cv<0&&parseInt(cv/4 )== parseInt(handCards.value/4 ))||(cv>=0&&handCards.mjtype==parseInt(cv/36)&&parseInt((handCards.value%36)/4)==parseInt((cv%36)/4))){
                             handCards.cardvalue.color = new cc.Color(255, 255, 255);
                             button.getComponent(cc.Button).interactable= true;   
                        }   
                    }
                }
            }
            event.stopPropagation();
            self.getSelf().shouOperationMune();            
        });
        /**
         * ActionEvent发射的事件 ， 点击 胡
         */
        this.node.on("hu",function(event){
            //cc.beimi.audio.playSFX('nv/hu.mp3');            
            cc.sys.localStorage.removeItem('guo');            
            let socket = self.getSelf().socket();
            socket.emit("selectaction" , JSON.stringify({
                action:"hu",
                actionCard:[]
            }));
            //cc.find("");
            self.getSelf().shouOperationMune();
            event.stopPropagation();
        });
        /**
         * ActionEvent发射的事件 ， 点击 过
         */
        this.node.on("guo",function(event){
            //当自己收到的事件是guo时  为true  别人
            if(cc.sys.localStorage.getItem('guo')!='true'||cc.sys.localStorage.getItem('alting')=='true'){
                let socket = self.getSelf().socket();
                socket.emit("selectaction" , JSON.stringify({
                    action:"guo",
                    actionCard:[]
                }));
            }else{
                cc.sys.localStorage.setItem('take','true');                
            }
            cc.sys.localStorage.removeItem('guo');
            self.getSelf().shouOperationMune();
            event.stopPropagation();
        });
        //初始化 干掉所有缓存
        //cc.sys.localStorage.removeItem('take') ;
        cc.sys.localStorage.setItem('count','0');
        cc.sys.localStorage.removeItem('current');
        cc.sys.localStorage.removeItem('right');
        cc.sys.localStorage.removeItem('left');
        cc.sys.localStorage.removeItem('top');
        cc.sys.localStorage.removeItem('altake');      
        cc.sys.localStorage.removeItem('alting');
        cc.sys.localStorage.removeItem('guo');  
        cc.sys.localStorage.removeItem('unOver');      
        cc.sys.localStorage.removeItem('clear');        
        this.joinRoom();
        let playerNum;
        playerNum = cc.beimi.playerNum;
        this.playerNum(playerNum);
    },
    update: function(){
        if(!navigator.onLine&&cc.sys.localStorage.getItem('duankai')!='true'){
            this.node.dispatchEvent( new cc.Event.EventCustom('duankai', true) )
            cc.sys.localStorage.removeItem('chonglian');
        }else if(navigator.onLine&&cc.sys.localStorage.getItem('chonglian')!='true'){
            cc.sys.localStorage.setItem('chonglian','true');
            cc.sys.localStorage.removeItem('duankai');
            this.node.dispatchEvent( new cc.Event.EventCustom('chonglian', true) )
        };
        if(this.readybth.active == true){
            cc.sys.localStorage.removeItem('already');                    
        }else{
            cc.sys.localStorage.setItem('already',true);
        }
    },
    playerNum: function(playerNum){
        cc.beimi.playerNum = playerNum;
        if(cc.beimi.playerNum){
            if(cc.beimi.playerNum == 2){
                this.left_player.active = false;
                this.right_player.active = false;
                this.deskcards_current_panel.width = 650;
                this.deskcards_top_panel.width = 650;
                this.deskcards_top_panel.y =10;
            }else if(cc.beimi.playerNum == 3){
                this.left_player.active = false;      
                this.deskcards_current_panel.width = 600;
                this.deskcards_top_panel.width = 600;  
                this.deskcards_current_panel.x = -154;
                this.deskcards_top_panel.x = -144;     
                this.deskcards_right_panel.x = -83;  
                this.deskcards_top_panel.y =10;
                
            }
            // if(cc.beimi.game.type.model == 'pipei'){
            //     this.tuoguan.active = false;
            // }
        }
    },
    changeRoom_event: function(data,context){
        cc.beimi.playerNum = data.playerNum;
        cc.director.loadScene('majiang');
    },
    joinRoom:function(){
        //开始匹配
        let socket = this.socket();
        var param = {
            token:cc.beimi.authorization,
            playway:cc.beimi.playway,
            orgi:cc.beimi.user.orgi
        } ;
        if ( cc.beimi.room ) {
            param.room = cc.beimi.room ;
        }else{
            param.playway = '402888815e6f0177015e71529f3a0001',
            param.match = 1 ; 
        }
        socket.emit("joinroom" ,JSON.stringify(param)) ;
    },
    /**
     * 解散房间的事件
     */
    isOver_event:function(){

        var mj = cc.find('Canvas').getComponent('MajiangDataBind');
        cc.sys.localStorage.setItem('unOver','true');
        if(mj.alert.size()>0){
            var alert = mj.alert.get();
            alert.parent = cc.find("Canvas");
            let node = alert.getComponent('overGameClick') ;
            node.txt.string = '你的好友请求解散房间' ;
            node.button.active = false;
            node.button2.active = true;
            node.labei.active =false;
            node.labei2.active = true;
            node.time =30;
            mj.t = setInterval(function(){node.daojishi()},1000)  ;  
            
                   
        }
    },
    over_event: function(){
              
        cc.beimi.maxRound =null;
        cc.beimi.op =null;
        cc.beimi.playerNum = null;
        cc.beimi.room=null;
        cc.beimi.cardNum = null;
        cc.sys.localStorage.setItem('dis','true');        
        cc.director.loadScene('gameMain');
        let mj = cc.find('Canvas').getComponent('MajiangDataBind');
        clearTimeout(mj.t);  
        // var desk = require("DeskCards");
        // var jiantou = new desk();
        // jiantou.xiaochu();
    },
    unOver_event: function(){
        let mj = cc.find('Canvas').getComponent('MajiangDataBind')
        cc.sys.localStorage.removeItem('unOver');
        let dialog = cc.find("Canvas/isover") ;
        clearTimeout(mj.t);
        mj.alert.put(dialog);
    },
    /**
     * 新创建牌局，首个玩家加入，进入等待状态，等待其他玩家加入，服务端会推送 players数据
     * @param data
     * @param context
     */
    joinroom_event:function(data , context){
        //如果是2人的模式  就只加自己和对家
        console.log('------------join------');
        console.log(this);
        context = cc.find('Canvas').getComponent('MajiangDataBind') ;
        if(cc.beimi.playerNum == 2){
            if(data.id!=cc.sys.localStorage.getItem('current')&&data.id!=cc.sys.localStorage.getItem('top')){
                var player = context.playerspool.get();
                var playerscript = player.getComponent("MaJiangPlayer");
                var inx = null , tablepos = "";
                if(data.id == cc.beimi.user.id){
                    player.setPosition(-584 , -269);
                    player.parent = context.root();
                    tablepos = "current" ;
                    cc.sys.localStorage.setItem('current',data.id);
                    cc.sys.localStorage.setItem('count','0')
                    
                }else{
                    player.parent= context.top_player;
                    tablepos = "top" ;
                    cc.sys.localStorage.setItem('top',data.id);
                    player.setPosition(0,0);
                    cc.sys.localStorage.setItem('count','2')
                    
                }
                playerscript.init(data , inx , tablepos,Number(cc.sys.localStorage.getItem('count')));
                context.playersarray.push(player) ;
                if(data.status == 'READY'){    
                    cc.find('Canvas/ready/'+tablepos+'_ready').active =true;
                    if(data.id == cc.beimi.user.id){
                        context.readybth.active = false ;
                        context.ready2.active = false ;
                    }  
                }
                
            }else{
                var playerarray = context.playersarray;
                if(playerarray){
                    for(let i =0 ; i< playerarray.length;i++){
                        var playerinfo = playerarray[i].getComponent('MaJiangPlayer');
                        var tablepos = playerinfo.tablepos;      
                        var on_off_line = playerinfo.on_off_line;     
                        var headimg = playerinfo.headimg;
                        if(data.id == playerinfo.data.id) {
                            if(data.status == 'READY'){    
                                cc.find('Canvas/ready/'+tablepos+'_ready').active =true;
                            }
                            if(data.online == false){
                                on_off_line.active = true;
                                headimg.color = new cc.Color(42, 25, 25);
                            }else{
                                on_off_line.active = false;
                                headimg.color = new cc.Color(255, 255, 255);
                            }
                            if(context.desk_cards.string!='136'){
                                context.readyNoActive(context);
                            }
                        }
                            
                    }
                }
            }
            //如果人满了 要求好友的按钮自动消失
            // if(context.playersarray.length == 2){
            //     context.ready2.active = false;
            //     context.readybth.x = -13;
            // }
        }else if(cc.beimi.playerNum == 3){
            if(data.id!=cc.sys.localStorage.getItem('current')&&data.id!=cc.sys.localStorage.getItem('right')&&data.id!=cc.sys.localStorage.getItem('top')){
                var player = context.playerspool.get();
                var playerscript = player.getComponent("MaJiangPlayer");
                tablepos = "";
                var inx = cc.sys.localStorage.getItem('count');
                if(data.id == cc.beimi.user.id){
                    player.setPosition(-584 , -269);
                    player.parent = context.root();
                    tablepos = "current" ;
                    cc.sys.localStorage.setItem('current',data.id);
                    
                }else{
                    if(inx == 0||inx ==2){
                        player.parent= context.right_player;
                        tablepos = "right" ;
                        cc.sys.localStorage.setItem('right',data.id);
                        cc.sys.localStorage.setItem('count','1')
                    }else if(inx == 1){
                        player.parent= context.top_player;
                        tablepos = "top" ;
                        cc.sys.localStorage.setItem('top',data.id);
                        cc.sys.localStorage.setItem('count','2')   
                    }
                    player.setPosition(0,0);
                }
                playerscript.init(data , context.inx , tablepos,Number(cc.sys.localStorage.getItem('count')));
                context.playersarray.push(player) ;
                //这里是用来判定自己重连的时候 如果已经准备了 则准备按钮消失
                if(data.status == 'READY'){    
                    cc.find('Canvas/ready/'+tablepos+'_ready').active =true;
                    if(data.id == cc.beimi.user.id){
                        context.readybth.active = false ;
                        context.ready2.active = false ;
                    }  
                }
            }else{
                var playerarray = context.playersarray;
                if(playerarray){
                    for(let i =0 ; i< playerarray.length;i++){
                        var playerinfo = playerarray[i].getComponent('MaJiangPlayer');
                        var tablepos = playerinfo.tablepos;      
                        var on_off_line = playerinfo.on_off_line;     
                        var headimg = playerinfo.headimg;
                        if(data.id == playerinfo.data.id) {
                            if(data.status == 'READY'){    
                                cc.find('Canvas/ready/'+tablepos+'_ready').active =true;
                                if(data.id == cc.beimi.user.id){
                                    context.readybth.active = false ;
                                    context.ready2.active = false ;
                                }  
                            }
                            if(data.online == false){
                                on_off_line.active = true;
                                headimg.color = new cc.Color(42, 25, 25);
                            }else{
                                on_off_line.active = false;
                                headimg.color = new cc.Color(255, 255, 255);
                            }
                            //如果已经过了发牌阶段  则隐藏所有的准备状态
                            if(context.desk_cards.string !='136'){
                                context.readyNoActive(context);
                            }
                        }    
                    }
                }
            }
        
        }else{
            // 这是默认的4人模式 
            // 因为 加入会触发 改变状态也会触发该事件，所以用getitem保存一个数据 如果有了这个数据则 只判断状态的改变  如果没有则表示新玩家加入
            if(data.id!=cc.sys.localStorage.getItem('current')&&data.id!=cc.sys.localStorage.getItem('right')&&data.id!=cc.sys.localStorage.getItem('left')&&data.id!=cc.sys.localStorage.getItem('top')){
                var player = context.playerspool.get();
                var playerscript = player.getComponent("MaJiangPlayer");
                tablepos = "";
                var inx = cc.sys.localStorage.getItem('count');
                if(data.id == cc.beimi.user.id){
                    player.setPosition(-584 , -269);
                    player.parent = context.root();
                    tablepos = "current" ;
                    cc.sys.localStorage.setItem('current',data.id);
                    
                }else{
                    if(inx == 0||inx ==3){
                        player.parent= context.right_player;
                        tablepos = "right" ;
                        cc.sys.localStorage.setItem('right',data.id);
                        cc.sys.localStorage.setItem('count','1')
                    }else if(inx == 1){
                        player.parent= context.top_player;
                        tablepos = "top" ;
                        cc.sys.localStorage.setItem('top',data.id);
                        cc.sys.localStorage.setItem('count','2')   
                    }else if(inx == 2){
                        player.parent= context.left_player;
                        tablepos = "left" ;
                        cc.sys.localStorage.setItem('left',data.id);
                        cc.sys.localStorage.setItem('count','3')
                    }
                    player.setPosition(0,0);
                }
                playerscript.init(data , context.inx , tablepos,Number(cc.sys.localStorage.getItem('count')));
                context.playersarray.push(player) ;
                //这里是用来判定自己重连的时候 如果已经准备了 则准备按钮消失
                if(data.status == 'READY'){    
                    cc.find('Canvas/ready/'+tablepos+'_ready').active =true;
                    if(data.id == cc.beimi.user.id){
                        context.readybth.active = false ;
                        context.ready2.active = false ;
                    }  
                }
            }else{
                var playerarray = context.playersarray;
                if(playerarray){
                    for(let i =0 ; i< playerarray.length;i++){
                        var playerinfo = playerarray[i].getComponent('MaJiangPlayer');
                        var tablepos = playerinfo.tablepos;      
                        var on_off_line = playerinfo.on_off_line;     
                        var headimg = playerinfo.headimg;
                        if(data.id == playerinfo.data.id) {
                            if(data.status == 'READY'){    
                                cc.find('Canvas/ready/'+tablepos+'_ready').active =true;
                                if(data.id == cc.beimi.user.id){
                                    context.readybth.active = false ;
                                    //context.ready2.active = false ;
                                }  
                            }
                            if(data.online == false){
                                on_off_line.active = true;
                                headimg.color = new cc.Color(42, 25, 25);
                            }else{
                                on_off_line.active = false;
                                headimg.color = new cc.Color(255, 255, 255);
                            }
                            //如果已经过了发牌阶段  则隐藏所有的准备状态
                            if(context.desk_cards.string !='136'){
                                context.readyNoActive(context);
                            }
                        }    
                    }
                }
            }
            // if(context.playersarray.length == 4){
            //     context.ready2.active = false;
            //     var action = cc.moveTo(0.2,-21,-151);
            //     context.readybth.runAction(action);
            }   
    },
    /**
     * 新创建牌局，首个玩家加入，进入等待状态，等待其他玩家加入，服务端会推送 players数据
     * @param data
     * @param context
     */
    //掉线 和上线
    takecard_event:function(data , context){

        context = cc.find('Canvas').getComponent('MajiangDataBind');
        context.qujuju(data);
        let kongcard ; 
        cc.beimi.audio.playSFX('give.mp3');
        let playerss = context.player(data.userid , context);
        if(data.ting){
            if(context[playerss.tablepos+'ting'].active ==false){
                context.tingting.active = true ;
                setTimeout(function(){context.tingting.active = false ;},2000);
                context[playerss.tablepos+'ting'].active = true ; 
            }
        }
        if(data.userid == cc.beimi.user.id) {
            if(!data.ting){
               context.tingnoaction();
        }
            context.initcardwidth();
        
            if(data.ting){
                cc.sys.localStorage.setItem('alting','true'); 
                cc.sys.localStorage.setItem('altings','true');  
                cc.sys.localStorage.setItem('take','true');   

            }else{
                cc.sys.localStorage.removeItem('alting');
            }
            if(cc.sys.localStorage.getItem('take') != 'true'&&cc.beimi.match == 'false'){
                return;
            }
            cc.sys.localStorage.removeItem('altake');
            cc.sys.localStorage.removeItem('take');
            for (var inx = 0; inx < context.playercards.length;i++ ) {
                let handcards = context.playercards[inx].getComponent("HandCards");
                handcards.reinit();
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
                    temp.init(handcards.value,'B');

                    context.deskcards.push(desk_card);
                    desk_card.parent = context.deskcards_current_panel;
                    
                }else{
                    handcards.reinit();
                    if(handcards.selectcolor == true){
                        context.playercards[inx].zIndex = 1000 + handcards.value ;
                    }else{
                        if(handcards.value >= 0){
                            context.playercards[inx].zIndex = handcards.value ;
                        }else{
                            context.playercards[inx].zIndex = 200 + handcards.value ;
                        }

                        if(context.playercards[inx].children[1].active){
                            context.playercards[inx].zIndex = -1;
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

                let desk_card = cc.instantiate(cardprefab);
                let desk_script = desk_card.getComponent("DeskCards");
                desk_script.init(data.card,'R');
                desk_card.parent = deskcardpanel ;

            }else if(temp.tablepos == "left"){
                for(var inx = 0 ; inx < context.left_panel.children.length ; inx++){
                    let left_temp = context.left_panel.children[inx].getComponent("SpecCards");
                    left_temp.reinit();
                }
                cardpanel = context.left_panel ;
                cardprefab = context.takecards_left ;
                deskcardpanel = context.deskcards_left_panel ;

                let desk_card = cc.instantiate(cardprefab);
                let desk_script = desk_card.getComponent("DeskCards");
                desk_script.init(data.card,'L');
                desk_card.parent = deskcardpanel ;
            }else if(temp.tablepos == "top"){
                for(var inx = 0 ; inx < context.top_panel.children.length ; inx++){
                    let top_temp = context.top_panel.children[inx].getComponent("SpecCards");
                    top_temp.reinit();
                }
                cardpanel = context.top_panel ;
                cardprefab = context.takecards_one ;
                deskcardpanel = context.deskcards_top_panel ;

                let desk_card = cc.instantiate(cardprefab);
                let desk_script = desk_card.getComponent("DeskCards");
                desk_script.init(data.card,'B');
                desk_card.parent = deskcardpanel ;
            }
            /**
             * 销毁其中一个对象
             */
            cardpanel.children[cardpanel.children.length - 1].destroy();
            // let desk_card = cc.instantiate(cardprefab);
            // let desk_script = desk_card.getComponent("DeskCards");
            // desk_script.init(data.card);
            // desk_card.parent = deskcardpanel ;
        }
    },
    /**
     * 下一个玩家抓牌的事件， 如果上一个玩家出牌后，没有其他玩家杠、碰、吃、胡等动作，则会同时有一个抓牌的事件，否则，会等待玩家 杠、碰、吃、胡完成
     * @param data
     * @param context
     */
    dealcard_event:function(data , context){   
      
        if(cc.sys.localStorage.getItem('cb') == 'true'&&cc.sys.localStorage.getItem('altings') != 'true'){
            setTimeout(function(){context.dealcards(data,context)},2100);
            cc.sys.localStorage.removeItem('cb');
        }else{
            context.dealcards(data,context);
        }
    },
    dealcards: function(data,context){
        context=cc.find('Canvas').getComponent('MajiangDataBind');  
        context.closeloadding();
        if(cc.beimi.playerNum){
            var peoNum = cc.beimi.playerNum;
        }
        let player = context.player(data.userid , context);
        context.select_action_searchlight(data, context , player);

        //摸牌补花
        if(data.bu){
            var buhua = context.decode(data.bu);//补花
            for(var i = 0;i<buhua.length;i++){
                context.buhuaModle(buhua[i],player.tablepos,'',player.tablepos,context,"");
            }
        }

        if(data.userid == cc.beimi.user.id){
            if(cc.sys.localStorage.getItem('altings') != 'true'){
                context.tingnoaction();
            }
            if(cc.sys.localStorage.getItem('altake')!='true'){
                cc.sys.localStorage.setItem('take','true');
            }else{
                cc.sys.localStorage.removeItem('altake');                
            }
            context.initDealHandCards(context , data);   
            if(context.action123 !='deal'){
                context.shouOperationMune();                                    
            }
        }else{
            context.shouOperationMune();                    
            let inx = 0 ;
            if(player.tablepos == "top"){
                //context.right_panel ;
                inx = 1 ;
            }else if(player.tablepos == "left"){
                inx = 2 ;
            }
            context.initPlayerHandCards(0 , 1 , inx , context , true,peoNum);
        }
        context.desk_cards.string = data.deskcards ;
        if(data.power){
            if(data.powerCard&&data.powerCard.length>0){
                for(let i=0 ; i<cc.find('Canvas/global/main/godcard/child').children.length;i++){
                    cc.find('Canvas/global/main/godcard/child').children[i].destroy();
                }
                cc.beimi.baopai = data.powerCard;
                for(let i= 0 ; i<data.powerCard.length;i++){
                    var laiziZM = cc.instantiate(context.ZM);
                    laiziZM.parent = context.godcard.children[1];
                    var LZH  = laiziZM.getComponent('DeskCards');
                    LZH.init(data.powerCard[i],'B',true);
                    // cc.beimi.baopai = data.powerCard[i];
                }
            }else{
                var laiziFM = cc.instantiate(context.FM);
                var LZH = laiziFM.getComponent('DeskCards');
                //LZH.init(-4);
                laiziFM.parent = context.godcard.children[1];
            }
        }
    },
    select_action_searchlight:function(data , context , player){
        context.exchange_searchlight(player.tablepos , context);
        /**
         */
        context.exchange_state("nextplayer" , context);
    },
    allcards_event:function(data , context){
        //结算界面，
        let playerid;
        cc.sys.localStorage.removeItem('clear');
        for(let i = 0;i<data.playOvers.length;i++){
            if(data.playOvers[i].win==true){
                playerid = data.playOvers[i].user;
                if(data.playOvers[i].balance.huCard>-32){
                    var dan = context.current_hu.children[1].getComponent('DanAction');
                    dan.init(data.playOvers[i].balance.huCard,false,'current','1');                
                    break;
                }else{
                    context.current_hu.children[1].active = false;
                    context.top_hua.active = true;
                    var dan = context.top_hua.getComponent('BuHuaAction');
                    dan.init(data.playOvers[i].balance.huCard,'',false);
                    break;
                }
            }
        }

        context.huaction(playerid);
        setTimeout(function(){context.endList(data,context,playerid)},3000)
        

    },
    endList:function(data,context,playerid,a){
        context.gddesk_cards = context.desk_cards.string;
        context.desk_cards.string = '136';
        let temp = cc.instantiate(context.summary) ;
        temp.parent = context.root() ;
        temp.getComponent('SummaryClick').setData(data); 
        temp.zIndex = 999;
        if(playerid){
            context.huaction2(playerid);
        }else{
            context.liuju.active = false;
        }
        
    },
    gameOver_event: function(data,context){
        let time;
        if(cc.sys.localStorage.getItem('unOver')=='true'){
            time = 0;
            cc.sys.localStorage.removeItem('unOver');
        }else{
            time = 3000;
        }
        setTimeout(function(){context.endGameOver(data,context)},time)   
    },
    endGameOver: function(data,context){
        let temp = cc.instantiate(context.summary) ;
        temp.parent = context.root() ;
        temp.getComponent('SummaryClick').setDataEnd(data); 
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
        context = cc.find("Canvas").getComponent("MajiangDataBind") ;
        //context.collect(context) ;    //先回收资源，然后再初始化
        var inx = 0 ;
        context.arry = [];
        var players = context.playersarray; 
        // player 是 配合 joinroom  joinroom 加入房间  立即显示  然后 player 记录数据   下一个玩家 根据 player 来完成之前的渲染 用joinroom 完成之后的   一旦完成joinroom  又发起player 进行存储
        for(let i=0 ;i<data.players.length;i++){
            var time = data.players[i].createtime;
            context.arry.push(time);
            if(data.players[i].id == cc.beimi.user.id ){
                var mytime = context.arry.length;
            }
        }
        if(cc.beimi.playerNum==2){
            if(mytime==1){
                context.dong(0);
                context.publicData(0,data,'current',context.current_player,0,0,context);
                if(data.players.length==2){          
                    context.publicData(1,data,'top',context.top_player,1,2,context);
                }
            }else{
                context.dong(2);
                context.publicData(0,data,'top',context.top_player,1,2,context);
                context.publicData(1,data,'current',context.current_player,0,0,context);
            }       
        }else if(cc.beimi.playerNum==3){
            if(mytime==1){
                context.dong(0);                
                context.publicData(0,data,'current',context.current_player,0,0,context);
                if(data.players.length==2){          
                    context.publicData(1,data,'right',context.right_player,0,1,context);        
                }else if(data.players.length==3){
                    context.publicData(1,data,'right',context.right_player,0,1,context);        
                    context.publicData(2,data,'top',context.top_player,1,2,context);
                }
            }else if(mytime==2){
                context.dong(1);                
                context.publicData(0,data,'top',context.top_player,1,2,context);
                context.publicData(1,data,'current',context.current_player,0,0,context);
                if(data.players.length==3){
                    context.publicData(2,data,'right',context.right_player,0,1,context);        
                }
            }else if(mytime==3){
                context.dong(2);                
                context.publicData(0,data,'right',context.right_player,0,1,context);
                context.publicData(1,data,'top',context.top_player,1,2,context);
                context.publicData(2,data,'current',context.current_player,0,0,context);
            }
        }else{
            if(mytime==1){
                context.dong(0);                
                context.publicData(0,data,'current',context.current_player,0,0,context);
                if(data.players.length==2){          
                    context.publicData(1,data,'right',context.right_player,0,1,context);         
                }else if(data.players.length ==3){
                    context.publicData(1,data,'right',context.right_player,0,1,context);
                    context.publicData(2,data,'top',context.top_player,1,2,context);                         
                }else if(data.players.length ==4){
                    context.publicData(1,data,'right',context.right_player,0,1,context);    
                    context.publicData(2,data,'top',context.top_player,1,2,context);                
                    context.publicData(3,data,'left',context.left_player,2,3,context);                                      
                }
            }else if(mytime == 2){
                context.dong(3);                
                context.publicData(0,data,'left',context.left_player,2,3,context);
                context.publicData(1,data,'current',context.current_player,0,0,context);         
                if(data.players.length ==3){
                    context.publicData(2,data,'right',context.right_player,0,1,context);
                }else if(data.players.length ==4){
                    context.publicData(2,data,'right',context.right_player,0,1,context);          
                    context.publicData(3,data,'top',context.top_player,1,2,context);         
                }
            }else if(mytime ==3){
                context.dong(2);                
                context.publicData(0,data,'top',context.top_player,1,2,context);  
                context.publicData(1,data,'left',context.left_player,2,3,context);
                context.publicData(2,data,'current',context.current_player,0,0,context);                     
                if(data.players.length ==4){
                    context.publicData(3,data,'right',context.right_player,0,1,context);       
                }
            }else if(mytime == 4){
                context.dong(1);                
                context.publicData(0,data,'right',context.right_player,0,1,context);
                context.publicData(1,data,'top',context.top_player,1,2,context);
                context.publicData(2,data,'left',context.left_player,2,3,context);               
                context.publicData(3,data,'current',context.current_player,0,0,context);
            }
        }     
        var peo = context.playersarray;
        for(let i = 0 ; i< data.players.length;i++){
            
            for(let j=0; j<peo.length; j++){
                var py = peo[j].getComponent('MaJiangPlayer');
                if(data.players[i].id == py.data.id){
                    if(data.players[i].status&&data.players[i].status=='READY'){
                        context.readyTrue(py.tablepos,context);                   
                    }
                }
            }
        }

        //如果不在线的人数比总玩家少于1个人的时候   cc.beimi.gameOver =  true;
        // if(cc.beimi.playerNum -1 ==count){
        //     cc.beimi.gameOver = true ;
        // }else{
        //     cc.beimi.gameOver = false ;
        // }
    },
    readyTrue: function(fangwei,context){
        if(fangwei == 'left'){
            context.left_ready.active = true;
        }else if(fangwei=='right'){
            context.right_ready.active = true;
        }else if(fangwei == 'top'){
            context.top_ready.active = true ;
        }else if(fangwei == 'current'){
            context.current_ready.active = true ;          
        }
    },
    publicData:function(inx,data,fangwei,OPparent,int,count,context){
        if(cc.sys.localStorage.getItem(fangwei)!=data.players[inx].id){
            let player0 = context.playerspool.get();
            let playerscript0 = player0.getComponent("MaJiangPlayer");
            player0.setPosition(0,0);
            context.playersarray.push(player0) ;
            player0.parent = OPparent;
            playerscript0.init(data.players[inx] , int , fangwei,count);                
            cc.sys.localStorage.setItem(fangwei,data.players[inx].id);
            cc.sys.localStorage.setItem('count',count);                                  
        }   
    },
    playerint:function(count){
        for(var inx = 0 ; inx<this.playersarray.length ; inx++){
            let temp = this.playersarray[inx].getComponent("MaJiangPlayer") ;
            if(temp.count == count){
               return temp;
               break;
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
        
        context = cc.find('Canvas').getComponent('MajiangDataBind');
        for(var inx = 0 ; inx<context.playersarray.length ; inx++){
            let temp = context.playersarray[inx].getComponent("MaJiangPlayer") ;
            if(temp.data.id == data.userid){
                cc.beimi.banker = data.userid ; 
                temp.banker(); 
                break ;
            }
        }
    },
    dong: function(count){
        cc.beimi.bankercount = count;         
    },
    windFW: function(context){
        if(cc.beimi.playerNum==4){
            if(cc.beimi.bankercount==0){
                context.playerint(0).winds('dong');
                context.playerint(1).winds('nan');
                context.playerint(2).winds('xi');
                context.playerint(3).winds('bei');
            }else if(cc.beimi.bankercount ==1){
                context.playerint(1).winds('dong');                
                context.playerint(2).winds('nan');
                context.playerint(3).winds('xi');
                context.playerint(0).winds('bei');
            }else if(cc.beimi.bankercount ==2){
                context.playerint(2).winds('dong');
                context.playerint(3).winds('nan');
                context.playerint(0).winds('xi');
                context.playerint(1).winds('bei');
            }else if(cc.beimi.bankercount ==3){                
                context.playerint(3).winds('dong');
                context.playerint(0).winds('nan');
                context.playerint(1).winds('xi');
                context.playerint(2).winds('bei');
            }
        }else if(cc.beimi.playerNum==3){
            if(cc.beimi.bankercount ==0){
                context.playerint(0).winds('dong'); 
                context.playerint(1).winds('nan'); 
                context.playerint(2).winds('xi'); 
            }else if(cc.beimi.bankercount ==2){
                context.playerint(1).winds('dong'); 
                context.playerint(2).winds('nan'); 
                context.playerint(0).winds('xi'); 
            }else if(cc.beimi.bankercount ==1){
                context.playerint(2).winds('dong'); 
                context.playerint(0).winds('nan'); 
                context.playerint(1).winds('xi'); 
            }
        }else if(cc.beimi.playerNum==2){
            if(cc.beimi.bankercount==0){
                context.playerint(0).winds('dong');
                context.playerint(2).winds('xi');
            }else if(cc.beimi.bankercount ==2){
                context.playerint(2).winds('dong');
                context.playerint(0).winds('xi');
            }
        }
    },
    /**
     * 接受服务端的数据，玩家杠碰、吃胡等动作
     * @param data
     * @param context
     */
    action_event:function(data, context){
        context = cc.find('Canvas').getComponent('MajiangDataBind');     
        cc.sys.localStorage.setItem('altake','true');
        cc.sys.localStorage.removeItem('take');
       // if(cc.beimi.user.id == data.userid){
            let gang , peng , chi , hu , guo ,dan,ting;
            if(data.chis){
                context.chis = data.chis;
                for(let i =0; i< data.chis.length; i++){
                    context.chis[i].push(data.card);
                }
            }else{
                context.chis =[];
            }
            context.gangs = data["gangs"]?data["gangs"]:[];
            context.dans = data["dans"]?data["dans"]:[];
            context.tings = data["tings"]?data["tings"]:[];
            if(data.deal == true){  //发牌的动作
                cc.sys.localStorage.setItem('guo','true');
                // let desk_script = context.actionnode_two.getComponent("DeskCards") ;
                // desk_script.init(data.card);
                for(var inx = 0 ; inx < context.actionnode_two_list.children.length ; inx++){
                    let temp = context.actionnode_two_list.children[inx] ;
                    if(temp.name == "gang"){gang = temp ;}
                    if(temp.name == "dan"){dan = temp ;}
                    if(temp.name == "ting"){ting = temp ;}
                    if(temp.name == "hu"){hu = temp ;}
                    if(temp.name == "guo"){guo = temp ;}
                    temp.active = false ;
                    
                }
                var count = 0;
                if(data.hu){
                    hu.active = true ;
                    hu.x = - 250 + count * 110 ;
                    count++;
                }
                if(data.gang){
                    gang.active = true ;
                    gang.x = - 250 + count * 110 ;
                    count++;
                }
                if(data.dan){
                    dan.active = true ;
                    dan.x = - 250 + count * 110 ;
                    count++;
                }
                if(data.ting){
                    ting.active = true ;
                    ting.x = - 250 + count * 110 ;
                    count++;
                }
                {
                    guo.active =true;
                    guo.x = - 250 + count * 110 ;
                    count++;
                }
               
                var action = cc.moveTo(0.1,1140 - count*285,-100);
                //context.actionnode_two.active = true;
                context.actionnode_two.x=(840 - count*100);
                //context.actionnode_two.runAction(action);
                //context.actionnode_deal.active = true ;

                context.action123 = "deal" ;
            }else{
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
                if(data.hu){
                    hu.active = true ;
                    hu.x = - 250 + count * 110
                    count++;
                }
                if(data.gang){
                    gang.active = true ;
                    gang.x = - 250 + count * 110
                    count++;
                }
                if(data.peng){
                    peng.active = true ;
                    peng.x = - 250 + count * 110
                    count++;
                }
                if(data.chi){
                    chi.active = true ;
                    chi.x = - 250 + count * 110
                    count++;
                }
                if(data.deal == false){
                    guo.active = true ;
                    guo.x = - 250 + count * 110
                    count++;
                }  
                var action = cc.moveTo(0.1,1040 - count*285,-100);
                context.actionnode_two.x=(840 - count*100);                
                //context.actionnode_two.runAction(action);
                // let ani = context.actionnode_two.getComponent(cc.Animation);
                // ani.play("majiang_action") ;
                context.action123 = "two" ;
            }
       // }
    },
    selectaction_event:function(data , context){
        //触发音效
        cc.beimi.audio.playSFX('nv/'+data.action+'.mp3');        
        let player = context.player(data.userid , context), opParent, count = 0;
        let jiantou;
        if(data.target){
            jiantou = context.player(data.target , context).tablepos;
        }
        context.exchange_searchlight(player.tablepos , context);
        /**
         * 杠碰吃，胡都需要将牌从 触发玩家的 桌牌 里 移除，然后放入当前玩家 桌牌列表里，如果是胡牌，则放到 胡牌 列表里，首先
         * 首先，需要找到触发对象，如果触发对象不是 all ， 则 直接找到 对象对应的玩家 桌牌列表，并找到 桌牌里 的最后 的 牌，
         * 然后将此牌 移除即可，如果对象是 all， 则不用做任何处理即可
         */
        if(cc.beimi.user.id == data.userid){   
            cc.sys.localStorage.setItem('take','true');             
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
                function sortNumber(a,b){return a - b}
                data.cards.sort(sortNumber);
                data.cards.splice(1,0,data.card);
                opCards = data.cards;
            } else if ( data.action == "peng" ) {
                data.cards.push(data.card); 
                opCards = data.cards;
            } else if ( data.action == "gang" ) {
                if ( data.card != -1 ) {
                    data.cards.push(data.card);
                }
                if ( data.actype == 'an' ){
                    back = true ;
                }
                opCards = data.cards;
            } else if ( data.action == "dan" ) {
                opCards = data.cards;
            }
            context.cardModle(opCards,opParent,back,fangwei,context,data.action,jiantou);//补杠和补蛋的时候，逻辑需要区分。    
        }else{//对家
            opParent = cc.find("Canvas/content/handcards/"+player.tablepos+"desk/kong") ;
            context.otherHandCardRemove(data,context,player.tablepos);
            let opCards , back = false , fangwei = player.tablepos ;
            if(data.action =='chi'){
                function sortNumber(a,b){return a - b}
                data.cards.sort(sortNumber);
                data.cards.splice(1,0,data.card);                
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
            context.cardModle(opCards,opParent,back,fangwei,context,data.action,jiantou);
        }
        if(data.action == 'peng'||(data.action == 'gang'&&data.card!=-1)||data.action=='chi'||data.action == 'hu'){
            //以下代码是用于找到 杠/碰/吃/胡牌的 目标牌  ， 然后将此牌 从 桌面牌中移除
            let temp = context.player(data.target, context), deskcardpanel=null;
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
        context.loadding();                                                
        if(cc.find('Canvas/summary')){
            cc.find('Canvas/summary').destroy();
        }
        {
            cc.sys.localStorage.setItem('clear','true');
            var bth = cc.find('Canvas/global/main/button/readybtn');
            bth.active =true;  
            bth.x= -10;
            var laizi = cc.find('Canvas/global/main/godcard/child').children
            if(laizi){
                for(let i =0 ; i < laizi.length ; i ++ ){
                    cc.find('Canvas/global/main/godcard/child').children[i].destroy();
                }
            }     
            context.reinitGame(context);
        }
        if(cc.find('Canvas/notice')){
            cc.sys.localStorage.setItem('notice','true');
            cc.find('Canvas/notice').active = false;
        }
        
        context.windFW(context);
        cc.beimi.baopai = null;
        context.roomInfo.active = true;                
        context.totaljs.string = '圈数  '+(data.round+1) +'/'+context.maxRound;
        context.wanfa.string = data.op;
        cc.beimi.wanfa = data.op;
        //cc.beimi.op = data.op;
        context = cc.find('Canvas').getComponent('MajiangDataBind');   
        context.readyNoActive(context);   
        /**
         * 改变状态，开始发牌
         * 
         */
        if(cc.beimi.playerNum){
            var peoNum = cc.beimi.playerNum;
        }
        //开局后  头像位移到相应位置
        {
        var action = cc.moveTo(0.2,570,80);
        context.right_player.runAction(action);
        var action = cc.moveTo(0.2,-570,80);
        context.left_player.runAction(action);
        var action = cc.moveTo(0.2,-325,297);
        context.top_player.runAction(action);
        }
        //游戏开始 干掉打牌和听得缓存
        
        cc.sys.localStorage.removeItem('take');
        cc.sys.localStorage.removeItem('ting') ;        
        context.exchange_state("begin" , context);
        var temp_player = data.player ;
        var cards = context.decode(temp_player.cards);
        

        if(cc.beimi.GameBase.gameModel == 'wz'){
            if(temp_player.powerCard){
                var powerCard = context.decode(temp_player.powerCard);
                cc.beimi.powerCard = powerCard;
                context.csNode.active = true;
                //切换财神图片
                var sprite = context.csNode.getComponent(cc.Sprite);
                if(powerCard.length == 1){//财神个数
                    sprite.spriteFrame = context.cs1;
                    context.csNode.width = 65;
                    context.csNode.setPosition(-568,301);
                    context.godcard.children[1].x = -570;
                    
                }else{
                    sprite.spriteFrame = context.cs2;
                    context.csNode.width = 110; 
                    context.csNode.setPosition(-551,301);
                    context.godcard.children[1].x = -555;                    
                }
                if(powerCard&&powerCard.length>0){
                    for(let i=0 ; i<cc.find('Canvas/global/main/godcard/child').children.length;i++){
                        cc.find('Canvas/global/main/godcard/child').children[i].destroy();
                    }
                    cc.beimi.baopai = powerCard;
                    for(let i= 0 ; i<powerCard.length;i++){
                        cc.beimi.caishenCard += powerCard[i]+",";
                        var laiziZM = cc.instantiate(context.ZM);
                        laiziZM.parent = context.godcard.children[1];
                        var LZH  = laiziZM.getComponent('DeskCards');
                        LZH.init(powerCard[i],'B',true);
                    }
                }
            }
        }else{
            cc.find('Canvas/global/main/godcard').children[0].active =true;
            if(data.player.powerCard&&data.player.powerCard.length>0){
                cc.find('Canvas/global/main/godcard/child').children[0].destroy();
                for(let i= 0 ; i<data.player.powerCard.length;i++){
                    var laiziZM = cc.instantiate(context.ZM);
                    laiziZM.parent = context.godcard.children[1];
                    var LZH  = laiziZM.getComponent('DeskCards');
                    LZH.init(data.player.powerCard[i],'B',true);
                }
            }else{
                context.godcard.children[1].x = -560;                
                var laiziFM = cc.instantiate(context.FM);
                var LZH = laiziFM.getComponent('DeskCards');
                LZH.init(-3,'Z',true);
                laiziFM.parent = context.godcard.children[1];
            }
        }
        //当前玩家补花 data.player
        var buhua;
        if(temp_player.buHua){
            buhua = context.decode(temp_player.buHua);//补花
            console.log(buhua);
            let temp = context.player(temp_player.playuser, context);
            //console.log(temp.tablepos);
            for(var i = 0;i<buhua.length;i++){
                context.buhuaModle(buhua[i],temp.tablepos,'',temp.tablepos,context,"");
            }
        }

        //其他玩家补花 data.players
        for(var i = 0; i <data.players.length;i++){
            if(data.players[i].buHua){
                buhua = context.decode(data.players[i].buHua);//补花
                console.log(buhua);
                let temp = context.player(data.players[i].playuser, context);
                //console.log(temp.tablepos);
                for(var j = 0;j<buhua.length;j++){
                    context.buhuaModle(buhua[j],temp.tablepos,'',temp.tablepos,context,"");
                }
            }
        }
		

        //var cards = temp_player.cards;
        setTimeout(function(){
            context.calcdesc_cards(context , 136 , data.deskcards) ;
        } , 0) ;
        var groupNums = 0 ;
        var pTimes;
        if(cc.beimi.GameBase.gameModel =='wz'){
            pTimes = 5;
        }else{
            pTimes = 4;
        }
        for(var times = 0 ; times < pTimes ; times++){
            for(let h=0 ;h<data.players.length;h++){
                var players = data.players[h];
                //这里有一个判定 如果是重连的话 就不用setouttime   
                if(data.player.played||players.played||data.player.actions.length>0||players.action){
                    cc.sys.localStorage.setItem('cb','true');
                    context.initMjCards(groupNums , context , cards , temp_player.banker) ;

                    /**
                     * 初始化其他玩家数据
                     */
                    var inx = 0 ;
                    var sabi = 0;
                    for(var i=0 ; i<data.players.length ; i++){
                        if(data.players[i].playuser != cc.beimi.user.id){               
                            //通过判断 id 来确定位置上的牌的张数
                            var arry = context.playersarray;
                            for(let j =0 ; j< arry.length;j++){
                                var card = arry[j].getComponent('MaJiangPlayer');                            
                                if(data.players[i].playuser==card.data.id&&card.tablepos!='current'){
                                    if(card.tablepos=='left'){
                                        sabi = 2;
                                        break;
                                    }else if(card.tablepos=='top'){
                                        sabi = 1;
                                        break;
                                    }   
                                    sabi=0;
                                    break;
                                }
                            }
                            context.initPlayerHandCards(groupNums , data.players[inx++].deskcards , sabi,context ,false, data.players[i].banker,peoNum);
                        }
                    }
                    groupNums = groupNums + 1 ;
                }else{
                    setTimeout(function(){
                        context.initMjCards(groupNums , context , cards , temp_player.banker) ;
                        /**
                         * 初始化其他玩家数据
                         */
                        var inx = 0 ;
                        var sabi = 0;
                        for(var i=0 ; i<data.players.length ; i++){
                            if(data.players[i].playuser != cc.beimi.user.id){
                                
                                //通过判断 id 来确定位置上的牌的张数
                                var arry = context.playersarray;
                                for(let j =0 ; j< arry.length;j++){
                                    var card = arry[j].getComponent('MaJiangPlayer');                            
                                    if(data.players[i].playuser==card.data.id&&card.tablepos!='current'){
                                        if(card.tablepos=='left'){
                                            sabi = 2;
                                            break;
                                        }else if(card.tablepos=='top'){
                                            sabi = 1;
                                            break;
                                        }   
                                        sabi=0;
                                        break;
                                    }
                                }
                                context.initPlayerHandCards(groupNums , data.players[inx++].deskcards , sabi,context ,false, data.players[i].banker,peoNum);
                            }
                        }
                        groupNums = groupNums + 1 ;
                    } , (times+1) * 200);
                }    
            }
        }
        setTimeout(function(){
            cc.beimi.audio.playSFX('shuffle.mp3');            
            let ani = context.cards_panel.getComponent(cc.Animation);
            ani.play("majiang_reorder") ;
            var maxvalue  = -100;
            var maxvalluecard ;
            //排序 
            for(var i=0 ; i<context.playercards.length ; i++ ){
                if(context.playercards[i].children[1].active == false){
                    let temp_script = context.playercards[i].getComponent("HandCards") ;
                    if(temp_script.value >= 0){
                        context.playercards[i].zIndex = temp_script.value ;
                    }else{
                        context.playercards[i].zIndex = 200+ temp_script.value ;
                    }
                    if(context.playercards[i].zIndex > maxvalue){
                        maxvalue = context.playercards[i].zIndex ;
                        maxvalluecard = context.playercards[i] ;
                    } 
                }

            }
            context.initcardwidth(); 
            if(temp_player.banker == true&&!data.player.played){
                //maxvalluecard.getComponent("HandCards").lastone() ;
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
        
            
        
        setTimeout(function(){
            //重连判断action
            var istake =false;
            for(let i=0;i<data.players.length;i++){
                if(data.players[i].played){
                    istake =true;
                }
                if(data.players[i].actions.length>0){
                    istake=true;
                }
                if(data.players[i].ting){
                    let playerss = context.player(data.players[i].playuser , context);
                    context[playerss.tablepos+'ting'].active = true;
                }
            }
            if(data.player.banker == true){
                let datas ={};
                datas.userid = data.player.playuser;
                context.banker_event(datas,context);
            }
            if(data.player.ting){
                context.currentting.active = true ; 
                cc.sys.localStorage.setItem('alting','true');
                cc.sys.localStorage.setItem('altings','true');
                cc.sys.localStorage.setItem('take','true')
                context.tingAction(true);                
            }
            //如果自己有已经打的牌或者其他人有打牌 或者有action的时候
            if(data.player.played||istake||data.player.actions.length>0){
                cc.sys.localStorage.setItem('cl','true');
                //重连判断deskcard
                if(data.player.played){
                    var deskcards  = context.decode(data.player.played);
                    for(let i=0;i <deskcards.length;i++){
                        let desk_card = cc.instantiate(context.takecards_one);
                        let temp = desk_card.getComponent("DeskCards");
                        temp.init(deskcards[i],'B');
                        context.deskcards.push(desk_card);
                        desk_card.parent = context.deskcards_current_panel;
                    }
                }
                var action = data.player.actions;
                for(let i = 0;i< action.length;i++){
                    var isGang = false;
                    var cards = context.decode(action[i].card);
                    //console.log(cards);
                    
                    if(action[i].type =='an'){
                        isGang =true;
                    }
                    if(cards.length<4||isGang||action[i].action=='gang'||action[i].action=='peng'||action[i].action=='chi'){
                        if(action[i].action=='gang'&&cards.length==1){
                            let a =cards.concat(cards);
                            let b = a.concat(a)
                            context.cardModle(b,cc.find('Canvas/content/handcards/deskcard/kong'),isGang,'',context,action[i].action);  
                        }else{
                            function sortNumber(a,b){return a - b}
                            cards.sort(sortNumber);
                            context.cardModle(cards,cc.find('Canvas/content/handcards/deskcard/kong'),isGang,'',context,action[i].action);  
                        }
                    }else {
                        var a = cards.slice(0,3);
                        context.cardModle(a,cc.find('Canvas/content/handcards/deskcard/kong'),isGang,'',context,action[i].action);
                        for(let h =3 ; h<cards.length; h++){
                            context.selectaction_event({userid:cc.beimi.user.id,cards:[cards[h]],card:-1,action:'dan'},context);            
                        }            
                    }
                }
            }  
                //重连判断 其他人的desk和action
                for(let i=0 ; i< data.players.length;i++){
                    //判断谁是庄家
                var player = context.player(data.players[i].playuser, context);
                var datas={}
                if(data.players[i].banker==true){
                    datas.userid = data.players[i].playuser;
                    context.banker_event(datas,context);
                    // for(var inx = 0 ; inx<context.playersarray.length ; inx++){
                    //     let temp = context.playersarray[inx].getComponent("MaJiangPlayer") ;
                    //     if(temp.data.id == data.players[i].playuser){
                    //         temp.banker(); break ;
                    //     }
                    // }
                }
                //其他玩家的kong 牌
                if(data.touchPlay ){
                    let player = context.player(data.touchPlay , context)
                    context.exchange_searchlight(player.tablepos , context);
                    if(data.touchPlay == cc.beimi.user.id){
                        cc.sys.localStorage.setItem('take','true');
                    }   
                }
                if(!data.player.played&&data.player.banker){
                    cc.sys.localStorage.setItem('take','true');
                }
                if(data.players[i].actions.length>0){            
                    var action = data.players[i].actions;                    
                    for(let j =0 ; j< action.length ;j++){
                        var isGang =false;
                        var cards = context.decode(action[j].card);
                        
                        if(action[j].type =='an'){
                            isGang =true;
                        }
                        if(cards<4||isGang||action[j].action=='gang'||action[j].action=='peng'||action[j].action=='chi'){
                            if(action[j].action=='gang'&&cards.length==1){
                                let a =cards.concat(cards);
                                let b = a.concat(a)
                                context.cardModle(b,cc.find('Canvas/content/handcards/'+player.tablepos+'desk/kong'),isGang,player.tablepos,context,action[j].action);   
                            }else{
                                function sortNumber(a,b){return a - b}
                                cards.sort(sortNumber);
                                context.cardModle(cards,cc.find('Canvas/content/handcards/'+player.tablepos+'desk/kong'),isGang,player.tablepos,context,action[j].action);   
                            }
                            }else {
                            let a = cards.slice(0,3);
                            context.cardModle(a,cc.find('Canvas/content/handcards/'+player.tablepos+'desk/kong'),isGang,player.tablepos,context,action[j].action);
                            for(let h =3 ; h<cards.length; h++){
                                context.selectaction_event({userid:player.data.id,cards:[cards[h]],card:-1,action:'dan'},context)                             
                            }                        
                        }                
                    }
                }
                //其他玩家的桌牌     
                if(data.players[i].played){
                    var deskcardss = context.decode(data.players[i].played); 
                    var player = context.player(data.players[i].playuser, context);
                    for(let j =0 ; j< deskcardss.length;j++){
                        context.initDeskCards(deskcardss[j],player.tablepos,context)
                    }
                }
            } 
                context.closeloadding();
        },2000)      
    },
    /**
     * 此为恢复麻将状态  1、宽度 2、缩回来 3、颜色 
     * ting  true 为听牌时的状态
     */
    initcardwidth: function(ting){
        let length  = cc.find('Canvas/content/handcards/deskcard/layout').children.length; 
        for(let i =0; i<length;i++){
            let target =cc.find('Canvas/content/handcards/deskcard/layout').children[i];
            let card = target.getComponent('HandCards');
            card.take=false;
            if(cc.beimi.cardNum > 14){ 
                card.cardvalue.width = 67.5;
                card.cardvalue.height = 102.5;
                target.width=65.5;
            }else{
                target.width=73;    
            }
            card.target.y = 0; 
            //ting牌的时候 和 财神的牌是灰色的   听牌听完恢复 财神为持续状态
            if(!ting&&!card.caishen&&cc.sys.localStorage.getItem('ting')!='true'){
                card.cardvalue.color = new cc.Color(255, 255, 255); 
            }
        }
        cc.find('Canvas/content/handcards/deskcard/layout').sortAllChildren();
    },
    initDeskCards: function(card,fangwei,context){
        if(fangwei =='left'){
            let desk_card = cc.instantiate(context.takecards_left);
            let desk_script = desk_card.getComponent("DeskCards");
            desk_script.init(card,'L');
            desk_card.parent = context.deskcards_left_panel ;
        }else if(fangwei == 'right'){
            let desk_card = cc.instantiate(context.takecards_right);
            let desk_script = desk_card.getComponent("DeskCards");
            desk_script.init(card,'R');
            desk_card.parent = context.deskcards_right_panel ;
        }else if(fangwei=='top'){
            let desk_card = cc.instantiate(context.takecards_one);
            let desk_script = desk_card.getComponent("DeskCards");
            desk_script.init(card,'B');
            desk_card.parent = context.deskcards_top_panel ;
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
    huaction: function(playerid){
        if(playerid){
            cc.beimi.audio.playSFX('nv/hu.mp3');                    
            let hu_hu = this.current_hu.getComponent(cc.Animation);
            let player = this.player(playerid , this);
            let action = cc.scaleTo(1.5,1.5);
            player.target.runAction(action);
            if(player.tablepos == 'top'){
                hu_hu.node.children[0].x = 7 ;
                hu_hu.node.children[0].y = 142 ;
                hu_hu.node.children[1].x = 7 ;
                hu_hu.node.children[1].y = 142 ;

                hu_hu.node.children[2].x = 11 ;
                hu_hu.node.children[2].y = 121 ;
                hu_hu.node.children[3].x = -156 ;
                hu_hu.node.children[3].y = 146 ;
            }else if(player.tablepos == 'left'){
                hu_hu.node.children[0].x = -369 ;
                hu_hu.node.children[0].y = 76 ;
                hu_hu.node.children[1].x = -369 ;
                hu_hu.node.children[1].y = 76 ;

                hu_hu.node.children[2].x = -365 ;
                hu_hu.node.children[2].y = 55 ;
                hu_hu.node.children[3].x = -358 ;
                hu_hu.node.children[3].y = -72 ;              
            }else if(player.tablepos == 'right'){
                hu_hu.node.children[0].x = 383 ;
                hu_hu.node.children[0].y = -31 ;
                hu_hu.node.children[1].x = 383 ;
                hu_hu.node.children[1].y = -31 ;
                hu_hu.node.children[2].x = 387 ;
                hu_hu.node.children[2].y = -52 ;   
                hu_hu.node.children[3].x = 372 ;
                hu_hu.node.children[3].y = 115 ;             
            }else{
                hu_hu.node.children[0].x = 7 ;
                hu_hu.node.children[0].y = -69 ;
                hu_hu.node.children[1].x = 7 ;
                hu_hu.node.children[1].y = -69 ;
                hu_hu.node.children[2].x = 11 ;
                hu_hu.node.children[2].y = -90 ;
                hu_hu.node.children[3].x = 219 ;
                hu_hu.node.children[3].y = -65 ;              
            }
            this.current_hu.active =true;
            let ani = this.current_hu.getComponent(cc.Animation);
            ani.play("current_hu") ;
        }else{
            this.liuju.active = true;
        }
    },
    huaction2:function(playerid){
        let ani = this.current_hu.getComponent(cc.Animation);
        this.current_hu.active =false;
        ani.stop("current_hu") ;
        let player = this.player(playerid , this);
        player.target.scale = 0.91;
        

    },
    /**
     * 开始打牌，状态标记
     * @param data
     * @param context
     */
    lasthands_event:function(data, context){
        context = cc.find('Canvas').getComponent('MajiangDataBind');        
        if(data.userid == cc.beimi.user.id){    //该我出牌 , 庄家出牌，可以不用判断是否庄家了 ，不过，庄家数据已经传过来了
            context.exchange_state("lasthands" , context);
            context.exchange_searchlight("current",context);
            cc.sys.localStorage.setItem('take','true');            
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
        context.initcardwidth();
        if(true){
            let temp = context.cardpool.get();
            let temp_script = temp.getComponent("HandCards") ;
            context.playercards.push(temp);
            temp_script.init(data.card);
            temp_script.lastone();
            temp.zIndex = 2000; //直接放到最后了，出牌后，恢复 zIndex
            temp.parent = context.cards_panel ;  //庄家的最后一张牌
        }   
    },
    /**
     * 初始化其他玩家手牌，
     * @param groupNums
     * @param deskcards
     * @param inx
     * @param context
     * @param spec 是否特殊的牌，即刚抓起来的牌
     */
    initPlayerHandCards:function(groupNums , deskcards , inx , context , spec,banker,peoNum){
        let parent = context.right_panel  ;
        let cardarray = context.rightcards;
        let prefab = context.cards_right ;
        if(peoNum == 2){
            parent = context.top_panel  ;
            cardarray = context.topcards   ;
            prefab = context.cards_top ;
        }else if(peoNum ==3&&inx ==1){
            parent = context.top_panel  ;
            cardarray = context.topcards   ;
            prefab = context.cards_top ;
        }else{   
            if(inx == 1){
                parent = context.top_panel  ;
                cardarray = context.topcards   ;
                prefab = context.cards_top ;
            }else if(inx == 2){
                parent = context.left_panel  ;
                cardarray = context.leftcards;
                prefab = context.cards_left ;
            }
        }
      
        context.initOtherCards(groupNums , context , deskcards , prefab , cardarray , parent , spec , inx,banker);    //左侧，
    },
    initOtherCards:function(group , context , cards , prefab , cardsarray, parent , spec , inx,banker){
    context = cc.find('Canvas').getComponent('MajiangDataBind');        
        for(let i = 0 ; i < parent.children.length; i ++){
            parent.children[i].getComponent('SpecCards').node.height = 0;
            parent.children[i].getComponent('SpecCards').node.width = 0 ;
        }
        for(var i=group*4 ; i< cards && i<(group+1)*4 ; i++) {
            let temp = cc.instantiate(prefab) ;
            let temp_script = temp.getComponent("SpecCards") ;
            temp_script.init(spec,inx);

            temp.parent = parent ;
            cardsarray.push(temp) ;
        }
    },
    initMjCards:function(group , context , cards , banker){
        //context = cc.find('Canvas').getComponent('MajiangDataBind');        
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
        context= cc.find('Canvas').getComponent('MajiangDataBind');
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
        object = cc.find('Canvas').getComponent('MajiangDataBind');
        let readybtn = null , waitting = null , selectbtn = null , banker = null ,ready2 = null ;

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
            }else if(target.name == 'ready2'){
                ready2 = target;
            }
            target.active = false ;
           
        };
        switch(state){
            case "init" :
                object.desk_tip.active = false;
                readybtn.active = true ;
                if(cc.beimi.room.length ==6){
                    ready2.active = true ;
                }
                object.actionnode_deal.active =false ;

                /**
                 * 探照灯 熄灭
                 */
                object.exchange_searchlight("none",object);

                break;
            case "ready" :
                waitting.active = true ;
                //ljh改 开局60s
                //object.timer(object , 60) ;
                break;
            case "begin" :
                object.readyNoActive(object); 
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
                object.readyNoActive(object); 
                object.timer(object , 0) ;
                break   ;
            case "selectcolor" :
                /**
                 * 定缺 ，由服务端确定是否有此个节点，下个版本将会实现流程引擎控制 游戏 节点，一切都在服务端 进行配置工作
                 * @type {boolean}
                 */
                object.exchange_searchlight("current",object);
                selectbtn.active = true ;
                object.timer(object , 0) ;
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
                if(cc.beimi.match){
                    object.timer(object , 15) ;             
                }else{
                    object.timer(object , 8) ; 
                }
                break   ;
            case "otherplayer" :
            
                /**
                 * 计时器方向
                 */
                if(cc.beimi.match){
                    object.timer(object , 15) ;             
                }else{
                    object.timer(object , 8) ; 
                }
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
                    }else if(object.action == "three") {
                        let ani = object.actionnode_three.getComponent(cc.Animation);
                        ani.play("majiang_three_action_end") ;
                    }else if(object.action == "deal") {
                        object.actionnode_deal.active = false ;
                    }
                }
                object.action = null ;
                /**
                 * 选择了定缺结果，关闭选择按钮
                 * @type {boolean}
                 */
                if(cc.beimi.match){
                    object.timer(object , 15) ;             
                }else{
                    object.timer(object , 8) ; 
                }
                break   ;
        }
    },
    exchange_searchlight:function(direction , context){
        cc.sys.localStorage.removeItem('cl');      
        context = cc.find('Canvas').getComponent('MajiangDataBind');
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
                // if(times< 5){
                //     cc.beimi.audio.playSFX('timeup_alarm.mp3');                    
                // }
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
                b.parent = context.dan_childrend;
                for(var j = 0 ; j< params[i].length; j++){
                    var a = cc.instantiate(context.mjUnit);
                    a.getComponent('HandCards').init(params[i][j],true);
                    a.parent = b;
                }
            }
    },
    reinitGame: function(context){
        context.tingnoaction();        
        context.destroycards('deskcard',context);
        context.destroycards('leftdesk',context);
        context.destroycards('rightdesk',context);
        context.destroycards('topdesk',context);
        context.destroyPlayer(context);  
        context.tingactivefalse();  
        context.inintBuHuan();
        //清空补花数据
        context.destroybuhuas('left',context);
        context.destroybuhuas('right',context);
        context.destroybuhuas('top',context);
        context.destroybuhuas('my',context);

        cc.sys.localStorage.removeItem('altake');
        cc.sys.localStorage.removeItem('alting');
        cc.sys.localStorage.removeItem('guo');
     },
     inintBuHuan: function(){
        cc.beimi.powerCard = null;  
     },
     destroybuhuas:function(fangwei,context){
        let buhua,buhuaList;
        if(fangwei == "my"){
            buhuaList = cc.find('Canvas/content/handcards/my/bh-bottom');
        }else{
            buhuaList = cc.find('Canvas/content/handcards/'+fangwei+'/buhua');
        }
        for(let i = 0;i< buhuaList.children.length;i++ ){
            buhuaList.children[i].destroy(); 
        }
     },
     destroyPlayer: function(context){
        var array = context.playersarray;
        for(let i=0;i<array.length;i++){
            array[i].getComponent('MaJiangPlayer').creator.active =false;
            //array[i].getComponent('MaJiangPlayer').nowind();
        }
     },
     tingactivefalse: function(){
         this.currentting.active =false;
         this.topting.active =false;
         this.rightting.active =false;
         this.leftting.active =false;
         
     },
     destroycards :function(fangwei,context){
        let handcard =cc.find('Canvas/content/handcards/'+fangwei+'/layout').children.length;
        let deskcard =cc.find('Canvas/content/deskcards/'+fangwei+'/layout').children.length;
        let kong =cc.find('Canvas/content/handcards/'+fangwei+'/kong').children.length;
        if(fangwei == 'deskcard'){
            for(let i =0 ; i< handcard; i++){
                let handcards = context.playercards[i].getComponent("HandCards");
                handcards.csImageTop.active = false;
                handcards.target.zIndex = 0;
                handcards.target.children[0].getComponent(cc.Button).enabled = true;
                handcards.cardvalue.color = new cc.Color(255, 255, 255);
                handcards.reinit();
                context.cardpool.put(context.playercards[i]);
                }
                context.playercards = [];
        }else{
            for(let i =0 ; i< handcard; i++){
                cc.find('Canvas/content/handcards/'+fangwei+'/layout').children[i].destroy();
            }
                if(fangwei == 'leftdesk'){
                   this.leftcards=[];
                }else if(fangwei == 'rightdesk'){
                   this.rightcards=[];
                }else{
                   this.topcards=[];                                                          
                }   
        }
        for(let i = 0;i< deskcard;i++ ){
            cc.find('Canvas/content/deskcards/'+fangwei+'/layout').children[i].destroy();
                
        }
        for(let i = 1;i< kong;i++ ){
            cc.find('Canvas/content/handcards/'+fangwei+'/kong').children[i].destroy();
        }
    },
	buhuaModle:function(cards,parent,back,fangwei,context,action){
        let opParent;
        if(parent == "current"){
            opParent = cc.find("Canvas/content/handcards/my/bh-bottom");
        }else{
            opParent = cc.find("Canvas/content/handcards/"+parent+"/buhua");
        }

        var card,temp;
        if(fangwei == 'top'){
            card = cc.instantiate(context.buhua_top);
            temp = card.getComponent('BuHuaAction');
        }else if(fangwei == 'left'){
            card = cc.instantiate(context.buhua_lef);
            temp = card.getComponent('BuHuaAction');
        }else if(fangwei == 'right'){
            card = cc.instantiate(context.buhua_right);
            temp = card.getComponent('BuHuaAction');
        }else{
            card = cc.instantiate(context.buhua_my);
            temp = card.getComponent('BuHuaAction');
        }
        // for(var i = 0; i<cards.length;i++){
            //填充内容元素
            temp.init(cards,fangwei);
            //挂载父节点元素
            card.parent = opParent;
        // }
    },
    cardModle: function(cards,parent,back,fangwei,context,action,target){
        if(cards.length == 1){
            var cardOp,card,temp;
            if(fangwei == 'top'){
                cardOp = context.findCardForKong(parent,cards[0],action) ;
                card = cc.instantiate(context.dan_topcurrent);
                temp = card.getComponent('DanAction');
            }else if(fangwei == 'left'){
                cardOp = context.findCardForKong(parent,cards[0],action) ;
                card = cc.instantiate(context.dan_leftcurrent);
                temp = card.getComponent('DanAction');
            }else if(fangwei == 'right'){
                cardOp = context.findCardForKong(parent,cards[0],action) ;
                card = cc.instantiate(context.dan_rightcurrent);
                temp = card.getComponent('DanAction');
            }else{
                cardOp = context.findCardForKong(parent,cards[0],action) ;
                card = cc.instantiate(context.dan_mycurrent);
                temp = card.getComponent('DanAction');
            } 
            temp.init(cards[i],false,fangwei,'1');
            if ( cardOp.isGang ) {
                card.zIndex=1;
                card.parent = cardOp.cardNode ;
                cardOp.cardNode.sortAllChildren();
            } else {
                var dan = cardOp.cardNode.children[cardOp.cardNum].getComponent('DanAction');
                dan.count.string = Number(Number(dan.count.string)+1);
                dan.countactive();
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
                if(fangwei == 'top'){
                    var card = cc.instantiate(context.dan_topcurrent);
                }else if(fangwei == 'left'){
                    var card = cc.instantiate(context.dan_leftcurrent);
                }else if(fangwei == 'right'){
                    var card = cc.instantiate(context.dan_rightcurrent);
                }else{
                    var card = cc.instantiate(context.dan_mycurrent);             
                }          
                var temp = card.getComponent('DanAction');
                if ( i == 2 && back == true ) {
                    temp.init(cards[i],false,fangwei,'1');
                }else if(action!='dan'&& i == 1&&back != true){
                    temp.init(cards[i],false,fangwei,'1',target);                    
                }else {
                    temp.init(cards[i],back,fangwei,'1');
                }
                if(71<cards[i]&&cards[i]<76&&action!='chi'){                  
                    card.zIndex =9999;
                }else {
                    card.zIndex =0;
                }
                card.parent = cardParent;
                //马上进行排序如果不这个方法 会在所有方法执行完后再排序。
                cardParent.sortAllChildren();               
                //cardParent.sortAllChildren ( )         
            }
            cardParent.getComponent('Kongcards').init(action);
            cardParent.parent = parent ;
        }       
    },
    findCardForKong: function(kong,card,action) {
        var resNode ;
        var isGang ;
        var cardNum;
        //遍历整个kong 的子集  cards、
        for ( let i = 0 ; i < kong.children.length ; i++ ) {
            var cards = kong.children[i] ;
            var kcards = cards.getComponent('Kongcards');
            var kaction = kcards.action;//获取 事件
            var length = kcards.length;    //获取子集长度
            var type =kcards.type; //获取类型  当为dan 事件时用来判定
            
            var cardcolors = parseInt(card/4 ) ;
            var cardtype  = parseInt(cardcolors / 9);
            var dans = cards.children ;
            //当这个牌是妖姬时
            if(cardtype==2&& parseInt((card%36)/4)==0&&cards.children.length>0&&type!='yao'&&action=='dan'){
                resNode = cards ;
                cardNum = 0;
                isGang = false;
                break;
            //当这个牌不是妖姬时
            }else{
                //cards是peng   action 为gang时
                if(action == 'gang'&&dans.length>0&kaction == 'peng'){
                    for(let j = 0 ; j<dans.length; j++){
                        var cardUnit = dans[j] ;
                        if ((parseInt((card%36)/4 ) == cardUnit.getComponent("DanAction").mjvalue &&parseInt(card / 36)==cardUnit.getComponent("DanAction").cardtype)||(card<0&&parseInt(card/4 )==cardUnit.getComponent("DanAction").cardcolors)){
                            resNode = cards ;
                            cardNum = j;
                            isGang = true;
                            break;
                        }
                    }
                //当action 为dan
                }else if(action == kaction&&dans.length>0){
                    isGang = false;
                    //有两种情况  一种长度为4 和长度为3   
                   
                    for(let j = 0 ; j<dans.length; j++){

                        var cardUnit = dans[j] ; 
                        
                        if(dans.length ==3 &&type=='wind'&&parseInt(card/4 )>=-7&&parseInt(card/4 )<=-4){
                            isGang =true;
                            for(let h = 0 ; h< dans.length;h++){
                                let cardUnit = dans[h]
                                if ( parseInt(card/4 ) == cardUnit.getComponent("DanAction").cardcolors ){
                                    isGang = false;
                                    resNode = cards;
                                    cardNum = h;
                                    break;              
                                }
                                    resNode = cards;
                                    cardNum = h; 
                            }
                            break;  
                        }else if(card <0&&((type=='wind'&&parseInt(card/4 )>=-7&&parseInt(card/4 )<=-4)||(type =='xi'&&parseInt(card/4 )>=-3&&parseInt(card/4 )<=-1))){
                            if ( parseInt(card/4 ) == parseInt(cardUnit.getComponent("DanAction").value/4) ){   
                                resNode = cards ;
                                cardNum = j;
                                break;
                            }else if(cardUnit.getComponent("DanAction").cardtype == 2 && parseInt((cardUnit.getComponent("DanAction").value%36)/4) == 0){
                                cardUnit.getComponent("DanAction").setValue(card);
                                resNode = cards ;
                                cardNum = j;
                                break;
                            }
                        }else if(card >0&&((type == 'yao'&&parseInt((card%36)/4 )==0)||(type == 'jiu'&&parseInt((card%36)/4 )==8))){
                            if(parseInt((card%36)/4 ) == parseInt((cardUnit.getComponent("DanAction").value%36)/4 )&&parseInt(cardUnit.getComponent("DanAction").value/36)==parseInt(card/36)){
                                resNode = cards ;
                                cardNum = j;
                                break;
                            }else if(cardUnit.getComponent("DanAction").cardtype == 2 && parseInt((cardUnit.getComponent("DanAction").value%36)/4) == 0){
                                cardUnit.getComponent("DanAction").setValue(card);
                                resNode = cards ;
                                cardNum = j;
                                break;
                            }
                        }
                    }
                }
            }
        }   
        return {cardNode:resNode,isGang:isGang,cardNum:cardNum} ;
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
    otherHandCardRemove: function(data,context,tablepos){
        for(let i = 0 ; i<data.cards.length; i++){
            if(tablepos =='top'){
                context.top_panel.children[i].destroy();
                context.topcards.splice(i,1);
            }else if(tablepos =='right'){
                context.right_panel.children[i].destroy();
                context.rightcards.splice(i,1);
            }else if(tablepos =='left'){
                context.left_panel.children[i].destroy();
                context.leftcards.splice(i,1);
            }
        }      
    },
    shouOperationMune: function(){
        var action = cc.moveTo(0.5,1122,-100);
        this.actionnode_two.x=1122;
        //this.actionnode_two.runAction(action);
        //this.actionnode_two.active = false;
        
    },
    getSelf: function(){
        var self =cc.find("Canvas").getComponent("MajiangDataBind");
        return self;
    },
    talk_event:function(data,context){
        var mj = cc.find('Canvas').getComponent('MajiangDataBind');
        // var audio = cc.beimi.audiocontext ;
        // var source = audio.createBufferSource();
        var datas = JSON.parse(data) ;
        var time = new Date(datas.end - datas.start).getSeconds();  
        let player = mj.player(datas.userid , mj);
        var dz = cc.find('Canvas/music/'+player.tablepos);
        dz.active = true;        
        setTimeout(function(){
            dz.active = false;                    
        },time*1000);
        cc.beimi.WXorBlow.talkPlay(datas);
       

        console.log('talk--------'+time);
        console.log(datas); 
    },
   

    tingAction: function(dd){
        let length =cc.find('Canvas/content/handcards/deskcard/layout').children.length;
        for(let i =0; i<length;i++){
            let cards =cc.find('Canvas/content/handcards/deskcard/layout').children[i];
            let button = cc.find('Canvas/content/handcards/deskcard/layout').children[i].children[0];
            let handCards = cards.getComponent("HandCards");
            if(dd){
                handCards.cardvalue.color = new cc.Color(255, 255, 255); 
            }else{
                handCards.cardvalue.color = new cc.Color(118, 118, 118);                
            }
            button.getComponent(cc.Button).interactable= false;
        }
    },
    tingnoaction:function(){
        let length =cc.find('Canvas/content/handcards/deskcard/layout').children.length;
        for(let i =0; i<length;i++){
            let cards =cc.find('Canvas/content/handcards/deskcard/layout').children[i];
            let button = cc.find('Canvas/content/handcards/deskcard/layout').children[i].children[0];
            let handCards = cards.getComponent("HandCards");
            handCards.cardvalue.color = new cc.Color(255, 255, 255);
            button.getComponent(cc.Button).interactable= true;
        }
        if(cc.find('Canvas/tingselect')){
            cc.find('Canvas/tingselect').active = false;
        }
    },
    readyNoActive: function(context){
        context.right_ready.active = false;
        context.left_ready.active = false;
        context.top_ready.active = false;
        context.current_ready.active =false;  
    },
    qujuju: function(data){
        let player = this.player(data.userid , this);
        let opParent;
        if(player.tablepos == 'current'){
            opParent = cc.find("Canvas/content/handcards/deskcard/kong") ;
        }else{
            opParent = cc.find("Canvas/content/handcards/"+player.tablepos+"desk/kong") ;
        }
        if(opParent.children.length>1){
            opParent.children[opParent.children.length-1].children[1].getComponent('DanAction').jujufei();            
        }
    },
    bgsetting: function(){
        let bg = cc.find('Canvas/global/main/bg/背景');
        if(cc.sys.localStorage.getItem('bgcolor')=='green'){
            bg.children[0].active = true ;
            bg.children[1].active = false;
            bg.children[2].active = false;                
        }else if(cc.sys.localStorage.getItem('bgcolor')=='blue'){
            bg.children[0].active = false ;
            bg.children[1].active = true;
            bg.children[2].active = false; 
        }else if(cc.sys.localStorage.getItem('bgcolor')=='red'){
            bg.children[0].active = false ;
            bg.children[1].active = false;
            bg.children[2].active = true; 
        }
    },
    cardsetting: function(){
        let he = this;
        //手牌颜色变化
        for(let i = 0; i< he.cards_panel.children.length;i++){
            he.cards_panel.children[i].getComponent('HandCards').cardcolor();
        };
        he.foreachCards(he.top_panel,'SpecCards');
        he.foreachCards(he.left_panel,'SpecCards');
        he.foreachCards(he.right_panel,'SpecCards');
        //桌面牌颜色变化
        he.foreachCards(he.deskcards_current_panel,'DeskCards');
        he.foreachCards(he.deskcards_left_panel,'DeskCards');
        he.foreachCards(he.deskcards_right_panel,'DeskCards');
        he.foreachCards(he.deskcards_top_panel,'DeskCards');
        //宝牌颜色变化
        he.foreachCards(he.godcard.children[1],'DeskCards');        
        //补花颜色变化 判断如果有的情况
        he.foreachCards(cc.find('Canvas/content/handcards/my/bh-bottom'),'BuHuaAction');
        he.foreachCards(cc.find("Canvas/content/handcards/right/buhua"),'BuHuaAction');
        he.foreachCards(cc.find("Canvas/content/handcards/left/buhua"),'BuHuaAction');
        he.foreachCards(cc.find("Canvas/content/handcards/top/buhua"),'BuHuaAction');
        
        //king里面啊的牌变化

        he.foreachDancrads(cc.find("Canvas/content/handcards/deskcard/kong"));
        he.foreachDancrads(cc.find("Canvas/content/handcards/topdesk/kong"));
        he.foreachDancrads(cc.find("Canvas/content/handcards/leftdesk/kong"));
        he.foreachDancrads(cc.find("Canvas/content/handcards/rightdesk/kong"));
       

    },
    foreachDancrads: function(fangwei){
        for(let i = 0 ; i < fangwei.children.length; i++){
            this.foreachCards(fangwei.children[i],'DanAction');
        }    
    },
    foreachCards: function(fangwei,ff){
        for(let i = 0; i< fangwei.children.length;i++){
            if(fangwei.children[i]!=null){
                fangwei.children[i].getComponent(ff).cardcolor();                
            }
        }
    },
    dosomething: function (context){
        context.gameOver_event({playOvers:[{huCount:1,dianCount:20,touchBao:3,bankerCount:4,pointCount:15},{huCount:1,dianCount:2,touchBao:3,bankerCount:4,pointCount:-5},{huCount:1,dianCount:2,touchBao:3,bankerCount:4,pointCount:5},{huCount:1,dianCount:2,touchBao:3,bankerCount:4,pointCount:5}]},context)
        // this.selectaction_event({userid:cc.beimi.user.id,cards:[45,57,13],action:'dan'},context)   
        //  this.selectaction_event({userid:cc.beimi.user.id,cards:[6,8,34],action:'dan'},context)   
        //  this.cardModle([11,12,13,14],cc.find('Canvas/content/handcards/leftdesk/kong'),true,'left',context)
        //  this.cardModle([11,12,13,14],cc.find('Canvas/content/handcards/leftdesk/kong'),true,'left',context)
        //  this.cardModle([11,12,13,14],cc.find('Canvas/content/handcards/rightdesk/kong'),true,'right',context)
        //  this.cardModle([-8,-9,-10],cc.find('Canvas/content/handcards/deskcard/kong'),false,'',context,'peng')
    },
    dosomethings: function (data , context){
        this.selectaction_event({userid:cc.beimi.user.id,cards:[-11,-11,-11,-11],card:-1,action:'gang',actype:'an' },context)  ;
        this.selectaction_event({userid:'b4eedc06b616467bb9a2d4e1c2f25789',cards:[-11,-11,-11,-11],card:-1,action:'gang',actype:'an' },context)  ;
        this.selectaction_event({userid:"5ada0da075ec443c9f1f23a218ee2bcb",cards:[-11,-11,-11,-11],card:-1,action:'gang',actype:'an' },context)  ;
        this.selectaction_event({userid:"f7bf579d16534dcda9eb3cf20c5e7f39",cards:[-11,-11,-11,-11],card:-1,action:'gang',actype:'an' },context)  ;
   },
   dosomethings2: function (data , context){
    this.selectaction_event({userid:cc.beimi.user.id,cards:[1,37,74],card:1,action:'chi'},context) 
},
dosomethings3: function (data , context){
    // this.selectaction_event({userid:'54f40e2d56fc4d519d0c0bf282894b85',cards:[72],card:-1,action:'dan'},context)
    // this.selectaction_event({userid:'b84edfa4ccae4e299da17a8b2111fdb4',cards:[72],card:-1,action:'dan'},context)
    // this.selectaction_event({userid:'512fa36b5894479ebf9f43579d00e314',cards:[72],card:-1,action:'dan'},context)
    this.selectaction_event({userid:cc.beimi.user.id,cards:[72],card:-1,action:'dan'},context)  
},
dosomethings4: function (data , context){
    this.selectaction_event({userid:cc.beimi.user.id,cards:[1],card:-1,action:'dan'},context) 
},
doSomethingBH: function (data , context){
    let opParent = cc.find("Canvas/content/handcards/right/buhua");
    context.buhuaModle('',opParent,'','right',context,data.action);
},
});
