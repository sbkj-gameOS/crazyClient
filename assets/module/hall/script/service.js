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
    
    },

    // use this for initialization
    onLoad: function () {

    },
    copyNum1:function(event){
        let clip = new Clip(event.target);
        let num = this.kefu1.string ;
    
    },
    copyNum2:function(){
    
        let num = this.kefu2.string ;
        window.clipboardData.setData('text', num); 
        if(window.clipboardData.getData('text')==''){ 
          if(i==1){ 
            alert("复制失败，请手动Ctrl+C快捷键复制！"); 
          }else{ 
            alert("复制失败，请重新复制！"); 
            i = 1; 
          } 
        }else{ 
           alert("内容已经复制到剪贴板！"); 
        }
        
	},
	Copy:function(str) {
        var save = function (e) {
            e.clipboardData.setData('text/plain', str);
            e.preventDefault();
        }
        document.addEventListener('copy', save);
        document.execCommand('copy');
        document.removeEventListener('copy', save);
    },
});
