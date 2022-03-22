// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    subscribe: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: 'http://101.133.237.83:5000/api/getvideodetails?id=' + options.id,
      method: "get",
      success(res) {
        if (res) {
          // console.log(res.data) // 打印查看是否请求到接口数据
          res.data["cover"] = "http://101.133.237.83:8000" + res.data["cover"]
          res.data["url"] = "http://101.133.237.83:8000" + res.data["url"]
          var vid = res.data["id"]

          wx.request({
            url: 'http://101.133.237.83:5000/api/getsubscribe',
            header: {
              'content-type': 'application/json; charset=utf-8',
              'cookie': wx.getStorageSync("set-cookie") //读取本地保存好的上一次cookie
            },
            success(res) {
              if (res) {
                var subscribe = 0
                for (const i of res.data.data) {
                  if (i["id"] == vid) {
                    subscribe += 1;
                    break;
                  }
                }
                that.setData({
                  subscribe: subscribe,
                })
              }
            }
          })

          var l = []
          app.globalData.mvdata.some(function (element) {
            // 使用 some 模拟 foreach continue
            if (element["id"] == res.data["id"]) {
              return;
            }
            res.data["tags"].every(function (v) {
              // 使用 every 模拟 foreach break
              if (element["tags"].indexOf(v) != -1) {
                l.push(element);
                return false;
              } else {
                return true;
              }
            });
          });
          that.setData({
            // 将获取到的数据赋值给数组对象中
            mvinfo: res.data,
            tags: res.data.tag,
            related: l,
            subscribe: 0,
          })

          // 开始获取数据 eg: textBox(获取文字内容)
        } else {
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
  showVideo: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/video/video?id=' + id,
    })
  },
  subscribe: function (e) {

    var that = this;
    wx.request({
      url: 'http://101.133.237.83:5000/api/subscribe',
      method: 'POST',
      data: {
        "videoid": this.data.mvinfo["id"],
        "subscribe": this.data.subscribe + 1
      },
      header: {
        'content-type': 'application/json; charset=utf-8',
        'cookie': wx.getStorageSync("set-cookie") //读取本地保存好的上一次cookie
      },
      success(res) {
        if (res) {
          that.setData({
            subscribe: 1 - that.data.subscribe
          })
        }
      }
    })
  }
})