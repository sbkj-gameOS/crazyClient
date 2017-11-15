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
        win:cc.Node,
        hu: cc.Label
    },
    
    // use this for initialization
    onLoad: function () {
      
    },
    init: function(){
        this.jifan.string = '';
        this.hu.string='';
        let dan = [];
        let dan2= [];
        let headimg;
        let units = this.data.gang.units;
        let units2;
        if(this.data.balance){
            units2 = this.data.balance.units;    
        }
        
        let player = cc.find('Canvas').getComponent('MajiangDataBind').playersarray;
        var cardsss = this.decode(this.data.cards);
        function sortNumber(a,b){return a - b}
        cardsss.sort(sortNumber);
        
        for(let i=0;i<player.length;i++){
            let pl = player[i].getComponent('MaJiangPlayer');
            if(pl.data.id == this.data.user){
                headimg = pl.data.headimgurl;
                this.peoname.string = pl.data.username;
            }
        }
        if(headimg){
            var imgurl = headimg;
            var sprite = this.headimg.getComponent(cc.Sprite);
            var head = this.headimg;
            cc.loader.load({url:imgurl,type:'jpg'},function(suc,texture){
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                head.width = 64;
                head.height = 64;
            });
        }
        this.count.string= this.data.count;
        if(this.data.win ==true){
            this.mjloyad2.active = true;
            this.win.active = true;
        }

        for(let i ;i< units.length;i++){
            if(units[i].point>0){
                dan.push(units[i]);
            }
        }
        if(units2!=null){
            for(let i ;i< units2.length;i++){
                if(units2[i].point>0){
                    dan2.push(units2[i]);
                }
            }
            for(let i ;i<dan2.length;i++){
                let tip = dan2[i].tip;
                let point = dan2[i].point;
                this.hu.string +=  tip +':';
                this.hu.string +=  point +'  ';
            }
        }
        
        for(let i ;i<dan.length;i++){
            let tip = dan[i].tip;
            let point = dan[i].point;
            this.jifan.string +=  tip +':';
            this.jifan.string +=  point +'  ';
        }
        
        for(let i = 0;i<this.data.actions.length;i++){
            let kong = cc.instantiate(this.mjkong);
            kong.parent = this.mjloyad;
            let action = this.decode(this.data.actions[i].card);
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

                    for(let i =0 ;i<3 ;i++){
                        let card =cc.instantiate(this.card);    
                        let b = card.getComponent('DanAction');  
                        var c = action[i];                        
                        b.init(c,false,'');
                        b.target.height = 53;
                        b.target.width= 32;
                        card.parent = kong;                               
                    }
                    for(let j=3 ; j<action.length;j++){
                        let card = action[j];   
                        let jia =true;
                        for(let h=0 ;h<kong.children.length;h++){
                            let kcard = kong.children[h];
                            let b = kcard.getComponent('DanAction');
                            if((card < 0 && parseInt(card/4 ) == b.cardcolors)||(card>0&&parseInt((card%36)/4 ) == parseInt(((b.value)%36)/4)&&b.cardtype==parseInt(card/36))){              
                                b.count.string = Number(Number(b.count.string)+1);
                                b.countactive();
                                jia = false;
                                break;
                            }
                        }
                        if(jia){
                            let card =cc.instantiate(this.card);    
                            let b = card.getComponent('DanAction');  
                            var c = action[j];                        
                            b.init(c,false,'');
                            b.target.height = 53;
                            b.target.width= 32;
                            card.parent = kong;   
                        }     
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
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
