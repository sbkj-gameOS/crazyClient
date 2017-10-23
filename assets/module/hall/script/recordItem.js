cc.Class({
    extends: cc.Component,

    properties: {
		label1: {
            default: null,
            type: cc.Label
        },
		label2: {
            default: null,
            type: cc.Label
        },
		label3: {
            default: null,
            type: cc.Label
        },
		win: {
            default: null,
            type: cc.Label
        },
		lose: {
            default: null,
            type: cc.Label
        },
		itemID: 0,
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
    },

    // use this for initialization
    onLoad: function () {
		this.node.on('touchend', function () {
            console.log("Item " + this.itemID + ' clicked');
        }, this);
    },
	updateItem: function(tmplId, itemId) {
		debugger
        this.itemID = itemId;
		this.label1.string = "房间号："+tmplId;
        this.label2.string = "局数："+tmplId;
		this.label3.string = "2017-07-10 17：59";
		this.win.string = "赢："+tmplId;
		this.lose.string = "输："+tmplId;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
