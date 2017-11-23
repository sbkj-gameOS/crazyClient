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
        target:{
            default:null ,
            type : cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        
    },
    onClick:function(event){
        let context = cc.find('Canvas').getComponent('MajiangDataBind');         
        let handCards = this.target.getComponent("HandCards")
        let self = this ;
        if( handCards.take == true){
            //出牌
            if (context.tings&&cc.sys.localStorage.getItem('ting')=='true'){
                context.tingSelect.active = false;
                let tinglength = context.tingSelect.children[0].children.length;
                for(let i = 0 ; i< tinglength ; i++){
                    context.tingSelect.children[0].children[i].destroy();
                }
            }
            this.node.dispatchEvent( new cc.Event.EventCustom('takecard', true) );
        }else{
            
            const length  = cc.find('Canvas/content/handcards/deskcard/layout').children.length;
            for(let i =0; i<length;i++){
                let cards =cc.find('Canvas/content/handcards/deskcard/layout').children[i];
                let handCards = cards.getComponent("HandCards");
                handCards.take = false;
                let button = cc.find('Canvas/content/handcards/deskcard/layout').children[i].children[0];                
                
                let card = cards.getComponent('HandCards');
                if(cc.beimi.cardNum > 14){ 
                    card.cardvalue.width = 61;
                    cards.width=59; 
                }else{
                    cards.width=73;    
                }
                handCards.target.y = 0;
                if(button.getComponent(cc.Button).interactable){
                    handCards.cardvalue.color = new cc.Color(255, 255, 255);
                }
            }
            handCards.target.y = handCards.target.y + 20 ;
            handCards.cardvalue.color = new cc.Color(230, 190, 190);
            handCards.take = true;
            if (context.tings&&cc.sys.localStorage.getItem('ting')=='true'){
                let tinglength = context.tingSelect.children[0].children.length;
                for(let i = 0 ; i< tinglength ; i++){
                    context.tingSelect.children[0].children[i].destroy();
                }
                let chuqu = false;
                for(let j = 0 ; j< context.tings.length;j++){
                    let cv = context.tings[j].card; 
                    if((cv<0&&parseInt(cv/4 )==parseInt(handCards.value/4 ))||(cv>=0&&handCards.mjtype==parseInt(cv/36)&&parseInt((handCards.value%36)/4)==parseInt((cv%36)/4))){
                        let tingcards = context.decode(context.tings[j].cards);
                        console.log(tingcards);
                        context.tingSelect.active = true;                            
                        for(let s = 0 ; s< tingcards.length;s++){
                            let limian = cc.instantiate(context.tingSelectch);
                            if(context.tings[i].counts[s]){
                                limian.getComponent('tingAction').label.string = '还剩:'+context.tings[j].counts[s]+'张';
                            }
                            let cccc = limian.getComponent('tingAction').target.getComponent('HandCards');
                            cccc.init(tingcards[s],true);
                            limian.parent = context.tingSelect.children[0];
                            chuqu = true;
                        }
                        break;
                    }  
                }
            }
        }    
    },   
});
