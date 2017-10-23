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
        model: cc.Node,
		spacing: 0, // space between each item
        label0: cc.Label,
        label1: cc.Label,
        label2: cc.Label
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
        //设置scrollView宽度
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
    updateItem:function(data){
        var num = data.getProfitTime;
        var time = new Date(num);
        this.label0.string = time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate()+'  '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
        this.label1.string = data.sourceName;
        this.label2.string = data.getProfitAmount;
    },
    scrolling:function(sender, event) {
        switch(event) {
            case 0: 
				console.log("Scroll to Top");
               break;
            case 1: 
				console.log("Scroll to Bottom");
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
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
