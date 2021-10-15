// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    wx.request({
      url: 'http://localhost:5000/api/getvideodetails?id=' + options.id,
      method: "get",
      success (res) {
        if (res) { 
          console.log(res.data)  // 打印查看是否请求到接口数据
          res.data["cover"] = "http://101.133.237.83:8000" + res.data["cover"]
          res.data["url"] = "http://101.133.237.83:8000" + res.data["url"]
          that.setData({
            // 将获取到的数据赋值给数组对象中
            mvinfo: res.data,
          })
          // 开始获取数据 eg: textBox(获取文字内容)
        }	else {
          console.log('没有数据')
        }
      }
    })
    console.log(this.data)
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

  }
})