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
        list: cc.Prefab,
        layout:cc.Node,
        action:{default :null}
    },

    // use this for initialization
    onLoad: function () {
        

    },
    init:function(){
        var userInfo = this.data;
        console.log(userInfo);
        if(userInfo.playOvers){
            for(let i = 0 ; i< userInfo.playOvers.length; i++){
                var list = cc.instantiate(this.list);
                list.getComponent('EndCards').setData(userInfo.playOvers[i]);
                list.parent = this.layout;   
            }
        }
        
    },    /**
     * 结算页面上的 背景的 点击事件，主要是用于事件拦截，禁用冒泡
     * @param event
     */
    onBGClick:function(event){
        //var myAction = event.target.getComponent('SummartClick').action ;
       // oper.setUserData(myAction) ;
        this.node.dispatchEvent(new cc.Event.EventCustom('restar', true));
    },
    /**
     * 结算页面上的关闭按钮 的 点击事件 , 关闭按钮 和 继续按钮 功能是一样的，都是继续游戏
     */
    onCloseClick:function(){

    },
    setData: function(data){
        this.data = data;
        this.init();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
