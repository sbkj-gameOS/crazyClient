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
        scroll: cc.Node,
        model: cc.Node,
        label0: cc.Label,
        label1: cc.Label,
        label2: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.content = this.scroll.content;
        this.page = 1;
        this.limit = 5;
        this.num = 1;
        if(cc.beimi.authorization!=null){
            cc.beimi.http.httpGet('/presentapp/runHistoryMySelf?token='+cc.beimi.authorization+'&page='+this.page +'&limit='+this.limit,this.success,this.error,this);
        }
    },
    success: function (result,object) {
        var data = JSON.parse(result);
        object.content.height = object.scroll.height*data.data.length*object.num; // get total content height
    	for (let i = 0; i <data.data.length; i++) { // spawn items, we only need to do this once
    		let item = cc.instantiate(object.model);
    		this.content.addChild(item);
    		item.setPosition(7, -item.height * (0.5 + i)-43);
    		//item.getComponent('Item').updateItem(i, i);
            object.updateItem(data.data[i]);
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
    scrolling:function(sender, event){
        if(event ==6){
            this.page++;
            this.num++;
            if(cc.beimi.authorization!=null){
                cc.beimi.http.httpGet('/presentapp/runHistoryMySelf?token='+cc.beimi.authorization+'&page='+this.page +'&limit='+this.limit,this.success,this.error,this);
            }
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
