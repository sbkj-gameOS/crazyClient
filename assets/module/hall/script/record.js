cc.Class({
    extends: cc.Component,

    properties: {
		itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        itemID: 0,
		spacing: 0, // space between each item
		totalCount: 0, // how many items we need for the whole list
		spawnCount: 0, // how many items we actually spawn
    },

    onLoad: function () {
		this.content = this.scrollView.content;
        this.items = [];
    	//this.initialize();
		if(cc.beimi.authorization){
            cc.beimi.http.httpGet('/record/perRecord?token='+cc.beimi.authorization+'&page=1&limit=10',this.success,this.error,this);
        };  
    },
	success:function(result,object){
        var data = JSON.parse(result) ;
        if(data.count>0){
			data.count = 4;
            object.content.height += data.count * (object.itemTemplate.height + object.spacing) + object.spacing; // get total content height
			for (let i = 0; i < data.data.length; ++i) { // spawn items, we only need to do this once
				let item = cc.instantiate(object.itemTemplate);
				object.content.addChild(item);
				item.setPosition(0, -item.height * (0.5 + i) - object.spacing * (i + 1));
				var roomNum = data.data[i].roomNum;//房间号
				var gameNum = data.data[i].gameNum;//局数
				var time = data.data[i].time;//时间
				var id = data.data[i].id;//id 
				var gamerInfo = data.data[i].gamerInfo;//id 
				item.getComponent('recordItem').updateItem(roomNum, gameNum, time,id,gamerInfo);
				object.items.push(item);
			}
        }              
    },
	error:function(object){
        console.log('shibai');
    },
	
	scrollEvent: function(sender, event) {
        switch(event) {
            case 0: 
				console.log("Scroll to Top");
               break;
            case 1: 
			debugger
				console.log("Scroll to Bottom");
				var data = {"data":[{"id":"34256789643542135445","playuserId":"59fdd046660b445eab87423b653d52e9","roomNum":"125478","gameNum":"8","time":"Oct 24, 2017 4:55:56 PM","gamerInfo":"测试信息2","createTime":"Oct 24, 2017 4:56:03 PM","isDel":0},{"id":"12312312312312312313","playuserId":"59fdd046660b445eab87423b653d52e9","roomNum":"201254","gameNum":"4","time":"Oct 24, 2017 4:55:22 PM","gamerInfo":"测试信息","createTime":"Oct 24, 2017 4:55:34 PM","isDel":0}],"count":2};
				this.content.height = data.count * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
				for (let i = 0; i < data.data.length; ++i) { // spawn items, we only need to do this once
					let item = cc.instantiate(this.itemTemplate);
					this.content.addChild(item);
					item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
					var roomNum = data.data[i].roomNum;//房间号
					var gameNum = data.data[i].gameNum;//局数
					var time = data.data[i].time;//时间
					var id = data.data[i].id;//id 
					var gamerInfo = data.data[i].gamerInfo;//id 
					item.getComponent('recordItem').updateItem(roomNum, gameNum, time,id,gamerInfo);
					this.items.push(item);
				}
				//let items = this.items;
				//debugger
				//this.content.height += 100;
				//let item = cc.instantiate(this.itemTemplate);
				//item.addComponent('recordItem').updateItem(i, i);
				//this.items.push(item);
            case 4: 
				console.log("Scrolling");
               break;
        }
    },
});
