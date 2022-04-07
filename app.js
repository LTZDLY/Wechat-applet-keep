// app.js
App({
  onLaunch() {
    var that = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log("login")
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            success(res) {
              if (res.header['set-cookie'] != '') {
                wx.setStorageSync('set-cookie', res.header['set-cookie'])
              }
            },
            url: 'https://api.shinoai.com/wxkeep/api/getOpenid',
            data: {
              code: res.code
            },
            header: {
              'cookie': wx.getStorageSync('set-cookie')
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    wx.request({
      url: "https://api.shinoai.com/wxkeep/api/getvideos",
      method: 'get',
      success(res) {
        if (res) {
          for (let index = 0; index < res.data["data"].length; index++) {
            res.data["data"][index]["cover"] = "https://shinoai.com/file" + res.data["data"][index]["cover"]
            res.data["data"][index]["url"] = "https://shinoai.com/file" + res.data["data"][index]["url"]
          }
          var arr = new Array();
          arr[0] = arr[1] = arr[2] = "";
          console.log(res.data) // 打印查看是否请求到接口数据
          var app = getApp();
          app.globalData.mvdata = res.data["data"];
          if (that.loginCallBack) {
            that.loginCallBack(res)
          }
          // 开始获取数据 eg: textBox(获取文字内容)
        } else {
          console.log('没有数据')
        }
      }
    })

  },
  globalData: {
    userInfo: null,
    mvdata: []
  },
  shuffle(arr) {
    var copy = [...arr];
    var l = copy.length
    var index, temp
    while (l > 0) {
      index = Math.floor(Math.random() * l)
      temp = copy[l - 1]
      copy[l - 1] = copy[index]
      copy[index] = temp
      l--
    }
    return copy
  }
})