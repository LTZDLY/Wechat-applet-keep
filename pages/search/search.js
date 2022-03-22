// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: ["10000.jpg", "10001.jpg", "10002.jpg", "10003.jpg", "10004.jpg"],
    currentTabs: [], //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    num: 3,
    tabs: ["初级", "中级", "高级"],
    unum: 9,
    utabs: ["肩", "胸", "臂", "背", "腹", "腰", "臀", "腿", "全身"]
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
    var id = e.target.dataset.id; //查询标题序号
    if (this.data.currentTabs[id] == cur) {
      return false;
    } else {
      var txt = e.target.dataset.txt;
      var temp = this.data.tags;
      var temp1 = this.data.currentTabs;
      temp[id] = txt;
      temp1[id] = cur;
      console.log(id)
      if (id == 0) {
        if (txt == "有氧") {
          temp[2] = "";
          temp1[2] = "";
        }
        if (txt == "无氧") {
          temp[1] = "";
          temp1[1] = "";
        }
      }
      console.log(temp)
      console.log(temp1)
      this.setData({
        currentTabs: temp1,
        tags: temp,
      })
      this.sift(temp);
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
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
  sift: function (e) {
    console.log(this.data.mvdata)
    var temp = new Array();
    for (let i = 0; i < this.data.mvdata.length; i++) {
      var f = true;

      if (e[0] == "") {
        if (this.data.mvdata[i]["tags"].indexOf("有氧") != -1) {
          if (e[1] != "" && this.data.mvdata[i]["tags"].indexOf(e[1]) == -1)
            f = false;
        } else if (this.data.mvdata[i]["tags"].indexOf("无氧") != -1) {
          if (e[2] != "" && this.data.mvdata[i]["tags"].indexOf(e[2]) == -1)
            f = false;
        }
      } else {
        for (let j = 0; j < e.length; j++)
          if (e[j] == "")
            continue;
          else if (this.data.mvdata[i]["tags"].indexOf(e[j]) == -1) {
          f = false;
          break;
        }
      }
      if (f) {
        temp.push(this.data.mvdata[i]);
      }
    }
    this.setData({
      mvshow: temp,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var arr = new Array();
    var app = getApp();
    arr[0] = arr[1] = arr[2] = "";
    var tabs = [...arr];
    this.setData({
      // 将获取到的数据赋值给数组对象中
      mvdata: app.globalData.mvdata,
      mvshow: app.globalData.mvdata,
      tags: arr,
      currentTabs: tabs,
    })
    // 开始获取数据 eg: textBox(获取文字内容)
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
  }
})