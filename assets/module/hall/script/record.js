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
    	this.initialize();
    },
	
	initialize: function () {
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
    	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
    		let item = cc.instantiate(this.itemTemplate);
    		this.content.addChild(item);
    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
    		item.getComponent('recordItem').updateItem(i, i);
            this.items.push(item);
    	}
    },
	scrollEvent: function(sender, event) {
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
});
