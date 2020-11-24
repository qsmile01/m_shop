Page({

  /**
   * 页面的初始数据
   */
  data: {
    home:"设置家地址",
    company:"设置公司地址",
    type:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  lookAddress:function(e){
    this.data.type = e.currentTarget.id

    var that = this;
    wx.navigateTo({
      url: '../rq_lookAddress/index',
      events: {
        callback: function (data) {
          that.loadAddress(data)
        },
      }
    })
  },
  loadAddress:function(res){
    console.log(res)

    if(this.data.type == "100"){
      this.setData({
        home:res.data.address
      })
    }

    if(this.data.type == "101"){
      this.setData({
        company:res.data.address
      })
    }
  }
})