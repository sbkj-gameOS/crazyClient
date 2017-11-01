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
    onClick:function(){
        let handCards = this.target.getComponent("HandCards")
        let self = this ;
        if( handCards.take == true){
            //出牌
            this.node.dispatchEvent( new cc.Event.EventCustom('takecard', true) );
        }else{
    
            const length  = cc.find('Canvas/content/handcards/deskcard/layout').children.length;
            for(let i =0; i<length;i++){
                let cards =cc.find('Canvas/content/handcards/deskcard/layout').children[i];
                let handCards = cards.getComponent("HandCards");
                handCards.take = false;
                cards.y=0;
                cards.width = 59;
                handCards.mj.color = new cc.Color(255, 255, 255);
            }
            this.target.y = this.target.y + 20 ;
            handCards.mj.color = new cc.Color(230, 190, 190);
            handCards.take = true;
            }    
       }
});
