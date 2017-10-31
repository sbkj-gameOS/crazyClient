var beiMiCommon = require("BeiMiCommon");
var Common = require("common");
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
        agree:{
            default:null,
            type: cc.Node
        },
		protocol1:{
			default:null,
            type: cc.Prefab
		},
		protocol2:{
			default:null,
            type: cc.Prefab
		}
    },

    // use this for initialization
    onLoad: function () {
		
    },
	onProtocol1Click:function(event){
		cc.beimi.dialog = cc.instantiate(this.protocol1) ;
        cc.beimi.dialog.parent = this.root();
	},
	onProtocol2Click:function(){
		cc.beimi.dialog = cc.instantiate(this.protocol2) ;
        cc.beimi.dialog.parent = this.root();
	},
    tongyiBtn:function(){
        localStorage.setItem("xySuccess","1");
        var bmc = new Common();
        bmc.login();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
