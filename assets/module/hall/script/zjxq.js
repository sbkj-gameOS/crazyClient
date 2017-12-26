cc.Class({
    extends: cc.Component,

    properties: {
     jushu: cc.Node,
     hehe : cc.Node
    },

    // use this for initialization
    onLoad: function () {

    },
    init: function(data){
        for(let i = 0 ; i< data.length; i++){
            var node = new cc.Node('Label');
            var sp = node.addComponent(cc.Label);
            
            sp.string = data[i].nickname;
            node.parent = this.jushu;
            var node2 = new cc.Node('Label');
            var sp2 = node2.addComponent(cc.Label);
            sp2.string = data[i].totalScores;
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
