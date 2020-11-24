const map = require("../../Tools/map/mapTool.js");

Page({
  // 进度条开始加载与终止
  startProgress() {
    this.setData({
      loadProgress: this.data.loadProgress + 1
    })

    if (this.data.loadProgress < 99) {
      this.data.timeProgressId = setTimeout(() => {
        this.startProgress();
      }, 100)
    }
  },
  stopProgress() {
    this.setData({
      loadProgress: 0,
    })
    clearTimeout(this.data.timeProgressId)
  },

  /**
   * 页面的初始数据
   */
  data: {
    // 进度条
    loadProgress: 0,
    timeProgressId: null,

    searchContent: "",
    cityName: "",
    items: [],

    spaceColor: "#ffffff"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCity();
  },

  loadCity: function () {
    var that = this;
    map.localAddress(function (res, data) {
      if (res == 1) {
        var city = data[0].regeocodeData.addressComponent.city;
        that.setData({
          cityName: city
        })
      }
      that.loadData(that.data.cityName)
    });
  },

  // 内容聚焦
  focusEvent: function (e) {
    this.setData({
      searchContent: ""
    })
  },

  // 内容输入
  inputEvent: function (e) {
    this.loadData(e.detail.value)
  },

  loadData:function(content){
    var that = this;
    map.searchAddress(content, this.data.cityName, function (res, data) {
      if (res == 1) {
        that.data.items = [];
        var pois = data.data.pois;
        for (var i = 0; i < pois.length; i++) {
          var obj = Object();
          obj.address = pois[i].name;
          obj.detail = pois[i].address;
          obj.location = pois[i].location;

          that.data.items.push(obj);
        }

        that.setData({
          items: that.data.items
        })

        if (that.data.items.length > 0) {
          that.setData({
            spaceColor: "#f3f3f3"
          })
        } else {
          that.setData({
            spaceColor: "#ffffff"
          })
        }
      }
    })
  },
  touchEvent: function (e) {
    var that = this;
    var obj = this.data.items[e.currentTarget.dataset.index];
    map.messageAddress(obj.location, function (res, data) {
      if (res == 1) {
        var temp = Object();
        temp.adcode = data.data.regeocode.addressComponent.adcode;
        temp.citycode = data.data.regeocode.addressComponent.citycode;
        temp.adName = data.data.regeocode.addressComponent.district;
        temp.latitude = obj.location.split(",")[1];
        temp.longitude = obj.location.split(",")[0];
        temp.address = obj.address;

        //获取到上级页面的事件频道
        let sender = that.getOpenerEventChannel();
        //此处第一个参数就是上级页面设置的回调函数的函数名
        sender.emit('callback', {
          data: temp
        });
        wx.navigateBack();
      }
    })
  }
})