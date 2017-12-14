cc.Class({
    extends: cc.Component,

    properties: {
        label0: cc.Label,
        label1: cc.Label,
        label2: cc.Label
    },

    onLoad: function () {
		this.node.on('touchend', function () {
            console.log("Item " + this.itemID + ' clicked');
        }, this);
    },
	updateItem: function(itemId,sourceName, getProfitAmount,getProfitTime) {
		this.itemID = itemId;
		this.label0.string = this.getNowFormatDate(getProfitTime);
		this.label1.string = "金额："+getProfitAmount;
        this.label2.string = "分润人："+sourceName;
    },
	//时间处理返回格式：yyyy-MM-dd HH:MM:SS
	getNowFormatDate:function(time){
		var date = new Date(time);
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
});
