  ```javascript
  
var option = {
    api: 'http://h5.2smart.cn/wechat/js/', //授权链接
    debug: false,
    jsApiList: [ ],
    shareData: {
        appmessage: {
            title: "",//好友分享标题
            desc: "",//好友分享描述
            img_url: "",//好友分享图片
            link: "" //好友分享链接
        }, timeline: {
            title: "",//朋友圈分享标题
            img_url: "",//朋友圈分享图片
            link: ""//朋友圈分享链接
        }
    }
};

// var share = new WechatShare('http://h5.2smart.cn',option);
 var share = new WechatShare(option);
 share.set('appmessage', 'title', "使用 set 函数重新设置标题");
 share.set('appmessage', 'link', "http://h5.2smart.cn");
 share.update()//更新分享内容

```
 