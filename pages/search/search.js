// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: 5000,
    duration: 500,
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    mvdata: {},
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current; //查询标题序号
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
  	wx.request ({
      url:  "http://localhost:5000/api/getvideo",
      method: 'get',
      success (res) {
        if (res) { 
          for (let index = 0; index < res.data["data"].length; index++) {
            res.data["data"][index]["cover"] = "http://101.133.237.83:8000" + res.data["data"][index]["cover"]
            res.data["data"][index]["url"] = "http://101.133.237.83:8000" + res.data["data"][index]["url"]
          }
          console.log(res.data)  // 打印查看是否请求到接口数据
          that.setData({
          	// 将获取到的数据赋值给数组对象中
            mvdata: res.data["data"],
          })
          // 开始获取数据 eg: textBox(获取文字内容)
        }	else {
          console.log('没有数据')
        }
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showVideo: function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/video/video?id=' + id,
    })
  }
})