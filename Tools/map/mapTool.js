const amapFile = require("./amap-wx.js");
const map_key = "d29419316569812b210b055d17fa9acb";
const web_key = "9443dd39a5095b9c9deaae34a9efa828";

function localAddress(func) {
  var that = this;
  var myAmapFun = new amapFile.AMapWX({
    key: map_key
  });

  myAmapFun.getRegeo({
    success: function (data) {
      //成功回调
      return func(1, data);
    },
    fail: function (info) {
      //失败回调
      return func(0, info);
    }
  })
}

function searchAddress(keywords, cityName, func) {
  var url = "https://restapi.amap.com/v3/place/text";

  var params = Object();
  params.keywords = keywords;
  params.city = cityName;
  params.offset = 10;
  params.page = 1;
  params.key = web_key;

  wx.request({
    url: url,
    data: params,
    method: "get",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },

    success: function (res) {
      return func(1, res);
    },
    fail: function () {
      return func(0, res);
    }
  })
}

function messageAddress(location,func){
  var url = "https://restapi.amap.com/v3/geocode/regeo";

  var params = Object();
  params.location = location;
  params.key = web_key;
  
  wx.request({
    url: url,
    data: params,
    method: "get",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },

    success: function (res) {
      return func(1, res);
    },
    fail: function () {
      return func(0, res);
    }
  })
}

module.exports = {
  localAddress: localAddress,
  searchAddress:searchAddress,
  messageAddress:messageAddress
}