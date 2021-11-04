Page({
  data: {
    background: ["DSC_4471-2.jpg", "teachersday.jpg"]
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
  }
})