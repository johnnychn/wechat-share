var _ = Smart._;
var Utils = Smart.Utils;

/**
 * 微信分享
 */

function WechatShare(config) {
    this.config = defaults;
    this.init(config);
}


//默认参数
var defaults = {
    sdk: '/wechat/?', //授权链接
    type: 'SDK',// SDK 或者 TXGAME
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

WechatShare.prototype.jsonUrl = function (SDKURL, shareURL) {
    if (!SDKURL) {
        SDKURL = '/wechat/?';
    }
    if (!shareURL) {
        shareURL = encodeURIComponent(location.href.replace(/[\#][\s\S]*/, ''));
    }
    return SDKURL + 'url=' + shareURL;
}


WechatShare.prototype.setConfig = function (wx_data) {
    var self = this;
    try {
        window.wx.config({
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
        Smart.Utils.getScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
            callback(window.wx)
        })
    } else {
        callback(window.wx);
    }
};

WechatShare.prototype.init = function (config) {
    var self = this;
    self.sdkReady(function () {
        self.setConfig(config)
    })
};

WechatShare.prototype.set = function () {

    if (arguments.length === 3 && _.isString(arguments[0]) && _.isString(arguments[1])) {
        this.config.shareData[arguments[0]][arguments[1]] = arguments[2];
    } else {
        console.log('[WechatShare] set 函数参数错误')
    }

};


module.exports = WechatShare;