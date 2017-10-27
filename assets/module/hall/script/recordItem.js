cc.Class({
    extends: cc.Component,

    properties: {
		itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
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
		gamerInfos: {
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
	updateItem: function(roomNum, gameNum, time, itemId,gamerInfo) {
        this.itemID = itemId;
		this.label1.string = "房间号："+roomNum;
        this.label2.string = "局数："+gameNum;
		this.label3.string = this.getNowFormatDate(time);
		this.gamerInfos.string = gamerInfo;
    },
	//时间处理返回格式：yyyy-MM-dd HH:MM:SS
	getNowFormatDate:function(time){
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
				+ " " + date.getHours() + seperator2 + date.getMinutes()
				+ seperator2 + date.getSeconds();
		return currentdate;
	},
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
