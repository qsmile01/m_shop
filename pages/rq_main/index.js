// const common = require("../../utils/common.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 抽屉控制
    is_drawer: false,
  },

  onLoad: function (options) {

  },

  // 事件处理
  showPopup() {
    this.setData({ is_drawer: true });
  },

  onClose() {
    this.setData({ is_drawer: false });
  },
})