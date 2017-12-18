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
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        model:{
            default:null,
            type: cc.Prefab
        },
		spacing: 0, // space between each item
        label0: cc.Label,
        label1: cc.Label,
        label2: cc.Label,
        ccshuoming: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        this.content = this.scrollView.content;
		this.items = [];
        this.page = 1;
        this.limit = 5;
        this.num = 1;
        if(cc.beimi.authorization!=null){
            cc.beimi.http.httpGet('/presentapp/runHistoryMySelf?token='+cc.beimi.authorization+'&page='+this.page +'&limit='+this.limit,this.success,this.error,this);
        }
    },
    success: function (result,object) {
        var data = JSON.parse(result);
		object.content.height = data.data.length * (object.content.height + object.spacing) + object.spacing;
    	for (let i = 0; i <data.data.length; i++) {
			let item = cc.instantiate(object.model);
    		object.content.addChild(item);
    		item.setPosition(0, -item.height * (0.5 + i) - object.spacing * (i + 1));
			var itemId = data.data[i].id;
			var sourceName = data.data[i].sourceName;
			var getProfitAmount = data.data[i].getProfitAmount;
			var getProfitTime = data.data[i].getProfitTime;
    		item.getComponent('peopleItem').updateItem(itemId,sourceName, getProfitAmount,getProfitTime);
            object.items.push(item);
    	}
    },
    error:function(){
        console.log('error');
    },
    scrolling:function(sender, event) {
        switch(event) {
            case 0: 
				console.log("Scroll to Top");
               break;
            case 1: 
				console.log("Scroll to Bottom1");
				var data = {"data":[{"sourceId":"651c0370c97249fcbe8df80a2bcc46b5","getProfitTime":1508469907000,"id":"ad5fcd2c11e341e29580102eeff898eb","sourceName":"T。篮球疯子爱健身","userName":"T。篮球疯子爱健身","getProfitAmount":0.63,"invitationCode":"14594f4bdbb546d2b3afbaf25659fca1"},{"sourceId":"651c0370c97249fcbe8df80a2bcc46b5","getProfitTime":1508744945000,"id":"b7cf3812d03b4fb4aebc26889f1d9dc7","sourceName":"T。篮球疯子爱健身","userName":"T。篮球疯子爱健身","getProfitAmount":0.84,"invitationCode":"14594f4bdbb546d2b3afbaf25659fca1"}],"count":7};
            case 4: 
				console.log("Scrolling");
               break;
        }
	},
	getPositionInView: function (item) { // 在scrollview的节点空间中获取项目位置
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },
    update: function(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // 我们不需要计算每一帧
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // 滚动方向
        let offset = (this.model.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // 如果离开缓冲区，没有达到内容的顶端
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].setPositionY(items[i].y + offset );
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID - items.length; // update item id
                    item.updateItem(itemId,"123", "123","");
                }
            } else {
                // 如果离开缓冲区，不到达内容的底部
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
					debugger
                    items[i].setPositionY(items[i].y - offset );
                    let item = items[i].getComponent('peopleItem');
                    let itemId = item.itemID + items.length;
                    item.updateItem(itemId,"123", "123","");
                }
            }
        }
        // 更新lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    },
    closeBtn:function(){
        var closrBtn = cc.find("Canvas/heading/js/heading/right2");
        closrBtn.destroy();
    },
    xiangqing: function(){
        let hehe = cc.instantiate(this.ccshuoming);
        hehe.parent = cc.find('Canvas');
    }
});
