
const app = getApp()

Page({
  data: {
    cover:"cover"
  },
  showSearch:function() {
    wx.navigateTo({
      url: '../searchVideo/searchVideo',
    })
  },
  showIndex: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  showMine: function () {
    var user = app.getGlobalUserInfo();

    if (user == null || user == undefined || user == '') {
      wx.navigateTo({
        url: '../userLogin/login',
      })
    } else {
      wx.navigateTo({
        url: '../mine/mine',
      })
    }
  },
  showPublisher: function () {
    var me = this;

    var user = app.getGlobalUserInfo();

    var videoInfo = me.data.videoInfo;
    var realUrl = '../mine/mine#publisherId@' + videoInfo.userId;

    if (user == null || user == undefined || user == '') {
      wx.navigateTo({
        url: '../userLogin/login?redirectUrl=' + realUrl,
      })
    } else {
      wx.navigateTo({
        url: '../mine/mine?publisherId=' + videoInfo.userId,
      })
    }

  },

})