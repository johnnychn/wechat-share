import JohnnyUtils from 'johnny-utils'

var userAgent = navigator.userAgent.toLowerCase();
var Device = {
    wechat: RegExp("micromessenger").test(userAgent) ? true : false,
};

/**
 * 微信分享
 */
function WechatShare(url, config) {
    this.config = JohnnyUtils.extend(defaults, config || {});
    var self = this;
    JohnnyUtils.jsonp(this.config.api, {url: url}, function (data) {
        self.init(data);
    }, function (err) {
        console.log(err)
    })
}

//默认参数
var defaults = {
    api: '', //授权链接
    debug: false,
    jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
    ],
    shareData: {
        appmessage: {
            title: "",
            desc: "",
            img: "",
            link: ""
        }, timeline: {
            title: "",
            img: "",
            link: ""
        }
    }

};


WechatShare.prototype.setConfig = function (wx_data) {
    var self = this;
    try {
        window.wx.config({
            debug: self.config.debug,
            appId: wx_data.appId,
            timestamp: wx_data.timestamp,
            nonceStr: wx_data.nonceStr,
            signature: wx_data.signature,
            jsApiList: self.config.jsApiList
        });
    } catch (e) {

    }
};


WechatShare.prototype.update = function () {
    try {
        var self = this;

        window.wx.ready(function () {
            window.wx.onMenuShareAppMessage({
                title: self.config.shareData.appmessage.title,
                desc: self.config.shareData.appmessage.desc,
                link: self.config.shareData.appmessage.link,
                imgUrl: self.config.shareData.appmessage.img_url,
                trigger: self.config.shareData.appmessage.trigger,
                success: self.config.shareData.appmessage.success || function () {
                }, cancel: self.config.shareData.appmessage.cancel || function () {
                }, fail: self.config.shareData.appmessage.fail || function () {
                }
            });
            window.wx.onMenuShareTimeline({
                title: self.config.shareData.timeline.title,
                link: self.config.shareData.timeline.link,
                imgUrl: self.config.shareData.timeline.img_url,
                trigger: self.config.shareData.timeline.trigger,
                success: self.config.shareData.timeline.success || function () {
                },
                cancel: self.config.shareData.timeline.cancel || function () {
                },
                fail: self.config.shareData.timeline.fail || function () {
                }
            })
        })
    } catch (e) {
    }
};
WechatShare.prototype.sdkReady = function (callback) {
    if (!window.wx) {
        JohnnyUtils.getScript('//res.wx.qq.com/open/js/jweixin-1.2.0.js', function () {
            callback(window.wx)
        })
    } else {
        callback(window.wx);
    }
};

WechatShare.prototype.init = function (config) {
    var self = this;
    self.sdkReady(function () {
        self.setConfig(config);
        self.update();
    })
};

WechatShare.prototype.set = function () {

    if (arguments.length === 3 && JohnnyUtils.Data.isString(arguments[0]) && JohnnyUtils.Data.isString(arguments[1])) {
        this.config.shareData[arguments[0]][arguments[1]] = arguments[2];
    } else {
        console.log('[WechatShare] set 函数参数错误')
    }
};
WechatShare.prototype.playSound = function (sound, callback) {
    var self = this;

    function doCallback() {
        if (callback) {
            callback(sound.playing())
        }
    }

    if (Device.wechat) {
        self.sdkReady(function (wx) {
            wx.ready(function () {
                sound.play();
                doCallback()

            })
        });
    } else {
        sound.play();
        doCallback()
    }
    // alert(sound.playing())
};

export default WechatShare