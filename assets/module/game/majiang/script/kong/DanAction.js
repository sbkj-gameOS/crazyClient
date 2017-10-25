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
        beimi0: {
            default: null,
            type: cc.SpriteAtlas
        },
        count: cc.Label,
        target:{
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {

    },
    init: function(cvalue){
    
        this.value = cvalue
        let cardcolors = parseInt(this.value/4 ) ;
        let deskcard ;
        let cardframe ;
        if(cardcolors < 0){
            deskcard = "wind"+(cardcolors + 8) ; //东南西北风 ， 中发白
            cardframe = this.beimi0.getSpriteFrame('麻将牌-牌面-'+deskcard);
            this.target.getComponent(cc.Sprite).spriteFrame = cardframe;
            this.count.string = 1;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
