cc.Class({
    extends: cc.Component,

    properties: {
     jushu: cc.Node,
     hehe : cc.Node,
     count : cc.Prefab,
     quan:cc.Prefab,
     kuangkuang: cc.Node,
     namess: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {

    },
    init: function(data){
        for(let j =0 ; j< data[0].userRoomDetailList.length; j++){
            let str='';            
            let haha  = cc.instantiate(this.quan);
            haha.parent = this.kuangkuang;
            haha.children[0].getComponent(cc.Label).string = '圈：'+data[0].userRoomDetailList[j].gameNum;
         
            for(let i = 0 ; i< data.length; i++){

                let xixi = cc.instantiate(this.namess);
                let dede = xixi.getComponent(cc.Label);
                dede.fontSize = 25;
                dede.string = data[i].userRoomDetailList[j].overPoint;
                xixi.parent = haha.children[1];                
            }

            
            
        
        }
        for(let i = 0 ; i< data.length; i++){
            var node = cc.instantiate(this.namess);
            var sp = node.getComponent(cc.Label);
            
            sp.string ='   ' + data[i].nickname + '  ';
            node.parent = this.jushu;
            var node2 = cc.instantiate(this.namess);
            var sp2 = node2.getComponent(cc.Label);
            sp2.string = '   ' +data[i].totalScores + '  ';
            node2.parent = this.hehe;

            
        }       

    },
    colse: function(event){
        event.target.parent.destroy();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
