Page({
  data: {
    background: ["10000.jpg", "10001.jpg", "10002.jpg", "10003.jpg", "10004.jpg"]
  },
  onload: function (options) {
    //调用models组件
    var userInfo = wx.getStorageSync("userinfo");
    if (!userInfo) {
      var modelLogo = this.selectComponent("#Models");
      modelLogo.getShow();
      return;
    }
    this.setData({
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl
    })
    //登录交互
    wx.login({
      success(res) {
      }
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    var app = getApp()
    var that = this;
    //使用回调函数Callback函数给变量赋值
    app.loginCallBack = function () {
      that.setData({
        mvshow: app.shuffle(app.globalData.mvdata)
      })
    }

  },
  bindViewTap() {
    wx.navigateTo({
      url: '../../pages/search/search'
    })
  },
  unusable: function (e) {
    wx.showToast({
      icon: 'none',
      title: '前面的区域，以后再来探索吧',
    })
  }
})