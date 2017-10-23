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
		spacing: 0, // space between each item
		totalCount: 0, // how many items we need for the whole list
		spawnCount: 0, // how many items we actually spawn
    },

    // use this for initialization
    onLoad: function () {
		this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
		
    	this.initialize();
    },
	
	initialize: function () {
		debugger
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
    	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
    		let item = cc.instantiate(this.itemTemplate);
    		this.content.addChild(item);
    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
    		//item.getComponent('Item').updateItem(i, i);
			this.updateItem(i, i);
            this.items.push(item);
    	}
    },
	updateItem: function(tmplId, itemId) {
        this.itemID = itemId;
		this.label1.string = "房间号："+tmplId;
        this.label2.string = "局数："+tmplId;
		this.label3.string = "2017-07-10 17：59";
		this.win.string = "赢："+tmplId;
		this.lose.string = "输："+tmplId;
    },
	scrollEvent: function(sender, event) {
        switch(event) {
            case 0: 
				console.log("Scroll to Top");
               break;
            case 1: 
				console.log("Scroll to Bottom");
               break;
            case 4: 
				console.log("Scrolling");
               break;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
