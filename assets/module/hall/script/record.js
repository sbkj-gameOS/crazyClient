var selectlastToggle;
var typeStatus = 1;
cc.Class({
    extends: cc.Component,

    properties: {
        ch : cc.Node,
        wz : cc.Node,
		itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
		itemTemplates:{
			default:null,
			type: cc.Prefab
		},
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        selectOne:{
            default:null,
            type:cc.Toggle,
        },
        itemID: 0,
		spacing: 0, // space between each item
		totalCount: 0, // how many items we need for the whole list
		spawnCount: 0, // how many items we actually spawn
        nullDataText: {
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {
    
		this.content = this.scrollView.content;
        this.items = [];
        this.colorWhite = new cc.Color(255, 255, 255);//白色
        this.colorBrown = new cc.Color(122, 69, 11);//棕色
        //设置第一个选中的状态
        selectlastToggle = this.selectOne;
    	//this.initialize();
    	
		if(cc.beimi.authorization){
			var parm = {
	    		token:cc.beimi.authorization,//12d622d439d747a495204e995f431f7e
	    		page:1,
	    		limit:10
	    	};
            cc.beimi.http.httpPost('/record/perRecord',parm,this.success,this.error,this);
        };
        if(cc.beimi.GameBase.gameModel =='ch'||cc.beimi.GameBase.gameModel =='CH'){
            this.ch.active = true ;
            this.wz.active = false ;
            
        }else{
            this.wz.active = true ;
            this.ch.active = false ;
        }  
    },
    toggleClick: function(toggle) {
    	typeStatus = 1;
        //当前选中文字颜色切换白色
        toggle.node.children[2].color = this.colorWhite;
        //上一个选中文字颜色切换白色
        selectlastToggle.node.children[2].color = this.colorBrown;
        var moShiId = toggle.node.name;
		this.scrollView.content._children = [];
		var gameType;
        if(moShiId == "台炮麻将"){
        	//清空原有数据
            gameType = 1;
        }else if(moShiId == "长春麻将"){
        	//清空原有数据
            gameType = 2;
        }
        selectlastToggle = toggle;
        var parm = {
    		token:cc.beimi.authorization,//12d622d439d747a495204e995f431f7e
    		gameType:gameType,
    		page:1,
    		limit:10
    	};
        cc.beimi.http.httpPost('/record/perRecord',parm,this.success,this.error,this);
    },
    success:function(result,object){
        
        var data = JSON.parse(result);
        //清空数据
        for(var i = 0; i < object.content.children.length;i++){
            object.content.children[i].destroy();
            
        }
        //清空数据
        if(object.items.length != 0){
            for(var i = 0; i < object.items.length;i++){
                object.items[i].destroy(); 
            }
        }
        if(data.count>0){
        	if(typeStatus == 1){
				object.content.height = data.count * (160 + object.spacing) + object.spacing; // get total content height
        	}else{
        		object.content.height += data.count * (160 + object.spacing) + object.spacing; // get total content height
        	}
			for (let i = 0; i < data.data.length; ++i) { // spawn items, we only need to do this once
				let item = cc.instantiate(object.itemTemplates);
				object.content.addChild(item);
				item.setPosition(0, -item.height * (0.5 + i) - object.spacing * (i + 1));
				var roomNum = data.data[i].roomNum;//房间号
				var gameNum = data.data[i].gameNum;//局数
				var time = data.data[i].time;//时间
				var id = data.data[i].id;//id 
				var gamerInfo = data.data[i].overPoint;//id 
				item.getComponent('recordItem').updateItem(roomNum, gameNum, time,id,gamerInfo);
				object.items.push(item);
			}
        }else{
            
            //object.content.addChild(this.nullDataText);
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
            	typeStatus = 2;
				console.log("Scroll to Bottom");
				/**var data = {"data":[{"id":"34256789643542135445","playuserId":"59fdd046660b445eab87423b653d52e9","roomNum":"125478","gameNum":"8","time":"Oct 24, 2017 4:55:56 PM","gamerInfo":"测试信息2","createTime":"Oct 24, 2017 4:56:03 PM","isDel":0},{"id":"34256789643542135445","playuserId":"59fdd046660b445eab87423b653d52e9","roomNum":"125478","gameNum":"8","time":"Oct 24, 2017 4:55:56 PM","gamerInfo":"测试信息2","createTime":"Oct 24, 2017 4:56:03 PM","isDel":0},{"id":"34256789643542135445","playuserId":"59fdd046660b445eab87423b653d52e9","roomNum":"125478","gameNum":"8","time":"Oct 24, 2017 4:55:56 PM","gamerInfo":"测试信息2","createTime":"Oct 24, 2017 4:56:03 PM","isDel":0},{"id":"12312312312312312313","playuserId":"59fdd046660b445eab87423b653d52e9","roomNum":"201254","gameNum":"4","time":"Oct 24, 2017 4:55:22 PM","gamerInfo":"测试信息","createTime":"Oct 24, 2017 4:55:34 PM","isDel":0}],"count":4};
				this.content.height += data.count * (160 + this.spacing) + this.spacing; // get total content height
				for (let i = 0; i < data.data.length; ++i) { // spawn items, we only need to do this once
					let item = cc.instantiate(this.itemTemplates);
					this.content.addChild(item);
					item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
					var roomNum = data.data[i].roomNum;//房间号
					var gameNum = data.data[i].gameNum;//局数
					var time = data.data[i].time;//时间
					var id = data.data[i].id;//id 
					var gamerInfo = data.data[i].gamerInfo;//id 
					item.addComponent('recordItem').updateItem(roomNum, gameNum, time,id,gamerInfo);
					this.items.push(item);
				}**/
				break;
            case 4: 
				console.log("Scrolling");
               break;
        }
    },
});
