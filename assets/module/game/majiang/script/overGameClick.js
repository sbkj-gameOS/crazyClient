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
        button2:cc.Node,
        nosure:cc.Label,
        labei2:cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.button.active = true;
        this.labei.active = false;
        this.time;
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
        this.labei2.active =false;
        this.time=30;
    },
    overGameClick:function(){
        
        //this.scene("gameMain" , this);
        this.button.active = false;
        this.button2.active = false;
        
        this.labei.active = true;
        this.labei2.active =false;
        // this.daojishi();
        // this.labei2.string = '还有'+this.time +'自动解散'
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
        dialog.destroy();
    },
    leaveGameClick:function(){
        cc.sys.localStorage.setItem('dis','true');        
        this.disconnect();
        this.scene("gameMain" , this);
        //this.node.dispatchEvent( new cc.Event.EventCustom('leaveGame', true) );
            },
    daojishi: function(){
        this.time =this.time-1;
        if(this.labei2){
            this.labei2.getComponent(cc.Label).string = this.time;
            console.log(this.time);
        }
    }
       
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
