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
        noticeall: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        this.noticecount = 0;
        let he = this;
        this.set = setInterval(function(){he.gundong()},4000);
    },
    gundong:function(){
        if(cc.find('Canvas/notice')){
            if(cc.sys.localStorage.getItem('notice')=='true'){
                cc.sys.localStorage.removeItem('notice');
                clearTimeout(this.set);
            }else{
                cc.find('Canvas/notice').active = true;
                if(this.noticecount ==0){
                    this.noticeall.string = '房卡购买问题请联系官方客服';
                }else if(this.noticecount ==1){
                    this.noticeall.string ='游戏问题请截图联系官方客服';
                }else if(this.noticecount ==2){
                    this.noticeall.string ='遇到游戏异常，请联系官方客服，有丰厚奖品';
                }else if(this.noticecount ==3){
                    this.noticeall.string = '游戏单局最长20分钟';
                }else if(this.noticecount ==4){
                    this.noticeall.string ='大厅右上角帮助可查看游戏规则';
                }else if(this.noticecount ==5){
                    this.noticeall.string ='设置中可调节音量和音效';
                }else if(this.noticecount ==6){
                    this.noticeall.string ='任何建议请在公众号留言'  ;
                }else if(this.noticecount ==7){
                    this.noticeall.string ='20分钟未开始游戏会被踢出房间';
                }else if(this.noticecount ==8){
                    this.noticeall.string ='如遇问题可尝试退出房间后重新登录解决';
                    this.noticecount = -1;
                } 
                this.noticecount = this.noticecount+1;
            }
        }else{
            clearTimeout(this.set);
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
