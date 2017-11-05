var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

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
        button:cc.Node,
        labei: cc.Node,
        txt:cc.Label,
        sure:cc.Label,
        nosure:cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.button.active = true;
        this.labei.active = false;
    },
    // 解散游戏按钮  弹出弹窗
    // overGamenotice:function(){
    //     var mj = cc.find('Canvas').getComponent('MajiangDataBind');
    //     if(mj.alert.size()>0){
    //         var alert = mj.alert.get();
    //         alert.parent = cc.find("Canvas");
    //         let node = alert.getComponent('overGameClick') ;
    //         node.txt.string = '是否发起解散' ;
            
    //     }
    // },
   
    //离开游戏  不结束游戏
    // leaveGameClick:function(){

    //     this.scene("gameMain" , this);
    //     this.node.dispatchEvent( new cc.Event.EventCustom('leaveGame', true) );
    // },
    //点击 确认结束游戏
    init: function(){
        this.button.active = true;
        this.labei.active =false;
    },
    overGameClick:function(){
        
        //this.scene("gameMain" , this);
        this.button.active = false;
        this.labei.active = true;
        this.node.dispatchEvent( new cc.Event.EventCustom('overGame', true) );
        
    },
    //继续游戏 发送一个不退出请求
    goonGameClick: function(){
        let REFUSE = true;
        var oper = new cc.Event.EventCustom('overGame', true) ;
        oper.setUserData(REFUSE) ;
        this.node.dispatchEvent( oper );
        let mj = cc.find('Canvas').getComponent('MajiangDataBind')
        let dialog = cc.find("Canvas/isover") ;
        mj.alert.put(dialog);
        // dailog.destroy();

        //alert();
    },
    dontLeaveGameClick: function(){
        let mj = cc.find('Canvas').getComponent('MajiangDataBind')        
        let dialog = cc.find("Canvas/isleave") ;
        mj.alert.put(dialog);
    },
    leaveGameClick:function(){
        
                this.scene("gameMain" , this);
                this.node.dispatchEvent( new cc.Event.EventCustom('leaveGame', true) );
            },
    // setting:function(){

    //     let mjdata = cc.find('Canvas').getComponent('MajiangDataBind');
    //     var action = cc.moveTo(0.5,336,274);
    //     mjdata.setting_coin.runAction(action);
    //     this.node.dispatchEvent( new cc.Event.EventCustom('settingclick', true) );
        
    // }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
