Page({
  data: {
    background: ["DSC_4471-2.jpg","teachersday.jpg"]
  },
  onShow(){
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../../pages/search/search'
    })
  }
})