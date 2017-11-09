var beiMiCommon = require("BeiMiCommon");

cc.Class({
    extends: beiMiCommon,
    properties: {
        headimg:cc.Node,
        peoname:cc.Label,
        count:cc.Label,
        mjloyad: cc.Node,
        mjloyad2:cc.Node,
        mjkong:cc.Node,
        jifan:cc.Label,
        card:cc.Prefab,
        win:cc.Label,
    },
    
    // use this for initialization
    onLoad: function () {
      
    },
    init: function(){
        var cardsss = this.decode(this.data.cards);
        function sortNumber(a,b){return a - b}
        cardsss.sort(sortNumber);
        console.log(cardsss);
        if(this.data.headimgurl){
            var imgurl = playerdata.headimgurl;
            var sprite = this.headimg.getComponent(cc.Sprite);
            var head = this.headimg;
            cc.loader.load({url:imgurl,type:'jpg'},function(suc,texture){
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                head.width = 64;
                head.height = 64;
            });
        }
        this.peoname.string = this.data.name;
        console.log(this.data.name);
        this.count.string= this.data.count;
        this.jifan.string = this.data.jifan;
        if(this.data.win ==true){
            this.mjloyad2.active = true;
            this.win.string = 'win~';
        }
        for(let i = 0;i<this.data.actions.length;i++){
            let kong = cc.instantiate(this.mjkong);
            kong.parent = this.mjloyad;
            let action = this.decode(this.data.actions[i].card);
            for(let j=0;j<action.length;j++){
                let card = cc.instantiate(this.card);
                //console.log(cd[j]);
                let a = false;
                if(this.data.actions[i].type=='an'){
                    a = true;
                }
                if(action[3]&&this.data.actions[i].type=='an'){
                    a =false;
                }
                if(this.data.actions[i].action=='gang'&&action.length ==1){
                    c=[action[j],action[j],action[j],action[j]];
                }
                let b = card.getComponent('DanAction');
                let c = action[j];
               
                b.init(c,a,'');
                b.target.height = 53;
                b.target.width= 32;
                card.parent = kong;            }
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
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
