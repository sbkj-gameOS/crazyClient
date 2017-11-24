var beiMiCommon = require("BeiMiCommon");

cc.Class({
    extends: beiMiCommon,
    properties: {
        headimgs:cc.Node,
        peoname:cc.Label,
        count:cc.Label,
        mjloyad: cc.Node,
        mjloyad2:cc.Node,
        mjkong:cc.Node,
        jifan:cc.Label,
        card:cc.Prefab,
        win:cc.Node,
        hu: cc.Label,
        dong:cc.Node,
        xi:cc.Node,
        nan:cc.Node,        
        bei:cc.Node,
        
    },
    
    // use this for initialization
    onLoad: function () {
      
    },
    init: function(){
        let headimg;
        let gang=0; 
        let fan=0;
        let units;
        this.hu.string='';
        if(this.data.gang){
            gang = this.data.gang.count;
        }
        if(this.data.balance){
            units= this.data.balance.units;
            fan = this.data.balance.count ; 
            if(units){
                for(let i =0 ;i< units.length;i++){
                    this.hu.string += (units[i].tip+' ');
                } 
            }   
        }
        this.jifan.string = fan +'番'+'   '+gang +'杠   ';
        let player = cc.find('Canvas').getComponent('MajiangDataBind').playersarray;
        var cardsss = this.decode(this.data.cards);
        function sortNumber(a,b){return a - b}
        cardsss.sort(sortNumber);
        
        for(let i=0;i<player.length;i++){
            let pl = player[i].getComponent('MaJiangPlayer');
            if(pl.data.id == this.data.user){
                if(this[pl.wind]){
                    this[pl.wind].active = true;                    
                }
                headimg = pl.data.headimgurl;
                this.peoname.string = pl.data.username;
            }
        }
        if(headimg){
            var imgurl = headimg;
            var sprite = this.headimgs.getComponent(cc.Sprite);
            var head = this.headimgs;
            cc.loader.load({url:imgurl,type:'jpg'},function(suc,texture){
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                head.width = 52;
                head.height = 47;
            });
        }
        this.count.string= this.data.count;
        if(this.data.win ==true){
            this.mjloyad2.active = true;
            this.win.active = true;
        }
        for(let i = 0;i<this.data.actions.length;i++){
            let kong = cc.instantiate(this.mjkong);
            kong.parent = this.mjloyad;
            let action = this.decode(this.data.actions[i].card);
            function sortNumber(a,b){return a - b};
            action.sort(sortNumber);
                if(this.data.actions[i].action=='gang'&&action.length ==1){
                    let c=[action[0],action[0],action[0],action[0]];
                    for(let h = 0; h<4 ;h++){
                        let card = cc.instantiate(this.card);
                        //console.log(cd[j]);
                        let a = false;
                        if(this.data.actions[i].type=='an'&&(h!=2)){
                            a = true;
                        }
                        let b = card.getComponent('DanAction');
                        b.init(c[h],a,'');
                        b.target.height = 53;
                        b.target.width= 32;
                        card.parent = kong;   
                    }
                }else if(this.data.actions[i].action=='dan'){
                    let mj = cc.find('Canvas').getComponent('MajiangDataBind');
                    let player = mj.player(this.data.user,mj);
                    let card ;
                    if(player.tablepos == 'current' ){
                        card = cc.find('Canvas/content/handcards/deskcard/kong').children[i+1];
                    }else{
                        card = cc.find('Canvas/content/handcards/'+player.tablepos+'desk/kong').children[i+1];
                    }
                    for(let q = 0 ; q< card.children.length; q++){
                        let xiao = cc.instantiate(this.card);
                        let xiaocard = xiao.getComponent('DanAction');
                        let da = card.children[q].getComponent('DanAction');
                        xiaocard.init(da.mjtype,false,'',da.count.string);
                        xiaocard.target.height =53;
                        xiaocard.target.width =32;
                        xiao.parent =kong;
                    }
                }else{
                    for(let j=0;j<action.length;j++){
                        let card = cc.instantiate(this.card);
                        //console.log(cd[j]);
                        let a = false;
                        let c = action[j];
                        let b = card.getComponent('DanAction');                          
                        b.init(c,a,'');
                        b.target.height = 53;
                        b.target.width= 32;
                        card.parent = kong;           
                    }
                }
            }
        {
            let kong = cc.instantiate(this.mjkong);
            for(let i = 0;i<cardsss.length;i++){
                kong.parent = this.mjloyad;
                let card = cc.instantiate(this.card);
                   
                let b = card.getComponent('DanAction');
                b.init(cardsss[i],false,'');
                b.target.height = 53;
                b.target.width= 32;
                card.parent = kong;        
            }
            
        }
        

    },
    setData:function(data){
        this.data = data ; 
        this.init();
    },
    isDan: function(action){
        
        let type = 'yao';
        for(let i = 0 ; i< action.length; i ++){
            if(action[i]<0){
                if(parseInt(action[i]/4)<-3){
                    type = 'wind';
                    break;
                }else{
                    type='xi';
                    break;
                }
            }else{
                if(parseInt((action[i]%36)/4)==8&&((parseInt(parseInt(action[i]/4)/9)==0)||parseInt(parseInt(action[i]/4)/9)==1||parseInt(parseInt(action[i]/4)/9)==2)){
                    type='jiu';
                    break;
                }
            }
        }
        return type;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
