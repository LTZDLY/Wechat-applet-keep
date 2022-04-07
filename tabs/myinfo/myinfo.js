Page({
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    var that = this;
    wx.request({
      url: 'https://api.shinoai.com/wxkeep/api/getsubscribe',
      header: {
        'content-type': 'application/json; charset=utf-8',
        'cookie': wx.getStorageSync("set-cookie") //读取本地保存好的上一次cookie
      },
      success(res) {
        if (res) {
          for (let index = 0; index < res.data["data"].length; index++) {
            res.data["data"][index]["cover"] = "https://shinoai.com/file" + res.data["data"][index]["cover"]
            res.data["data"][index]["url"] = "https://shinoai.com/file" + res.data["data"][index]["url"]
          }
          console.log(res)
          that.setData({
            subscribe: res.data["data"],
            mvshow: res.data["data"]
          })
        }
      }
    })
    wx.request({
      url: 'https://api.shinoai.com/wxkeep/api/gethistory',
      header: {
        'content-type': 'application/json; charset=utf-8',
        'cookie': wx.getStorageSync("set-cookie") //读取本地保存好的上一次cookie
      },
      success(res) {
        if (res) {
          for (let index = 0; index < res.data["data"].length; index++) {
            res.data["data"][index]["cover"] = "https://shinoai.com/file" + res.data["data"][index]["cover"]
            res.data["data"][index]["url"] = "https://shinoai.com/file" + res.data["data"][index]["url"]
          }
          console.log(res)
          that.setData({
            history: res.data["data"]
          })
        }
      }
    })
  },
  data: {
    currentTabs: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    subscribe: [],
    history: [],
    mvshow: [],
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current; //查询标题序号
    if (this.data.currentTabs == cur) {
      return false;
    } else {
      this.setData({
        currentTabs: cur,
      })
      if (this.data.currentTabs == 0) {
        this.setData({
          mvshow: this.data.subscribe
        })
      }
      else if (this.data.currentTabs == 1) {
        this.setData({
          mvshow: this.data.history
        })
      }
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../../pages/logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showVideo: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/video/video?id=' + id,
    })
  }
})