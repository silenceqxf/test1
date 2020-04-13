//pages/second_level/clean/clean.js
var api = require('../../../utils/api.js')
var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')

//获取应用实例
var app = getApp()
Page({
  data:{
    currentTab:1,
    userInfo:{},
    "products": [
      {
        "p_id": "1",
        "currentTab":"1",
        "p_icon": "../../../images/clean1-1.jpg",
        "p_title": "擦洗玻璃1",
        "p_priceA": "80",
        "p_type": 1,
        "p_duration": "120"
      },
      {
        "p_id": "2",
        "currentTab": "1",
        "p_icon": "../../../images/clean1-2.jpg",
        "p_title": "窗帘换洗1",
        "p_type": 1,
        "p_priceA": "60",
        "p_duration": "90"
      },
      {
        "p_id": "3",
        "currentTab": "1",
        "p_icon": "../../../images/clean1-3.jpg",
        "p_title": "杂物整理1",
        "p_type": 1,
        "p_priceA": "100",
        "p_duration": "120"
      },
      {
        "p_id": "4",
        "currentTab": "1",
        "p_icon": "../../../images/clean1-4.jpg",
        "p_title": "室内大扫除1",
        "p_type": 1,
        "p_priceA": "100",
        "p_duration": "120"
      },
      {
        "p_id": "5",
        "currentTab": "2",
        "p_icon": "../../../images/clean1-1.jpg",
        "p_title": "擦洗玻璃2",
        "p_type": 2,
        "p_priceA": "80",
        "p_duration": "120"
      },
      {
        "p_id": "6",
        "currentTab": "2",
        "p_icon": "../../../images/clean1-2.jpg",
        "p_title": "窗帘换洗2",
        "p_type": 2,
        "p_priceA": "60",
        "p_duration": "90"
      },
      {
        "p_id": "7",
        "currentTab": "2",
        "p_icon": "../../../images/clean1-3.jpg",
        "p_title": "杂物整理2",
        "p_type": 2,
        "p_priceA": "100",
        "p_duration": "120"
      },
      {
        "p_id": "8",
        "currentTab": "2",
        "p_icon": "../../../images/clean1-4.jpg",
        "p_title": "室内大扫除2",
        "p_type": 2,
        "p_priceA": "100",
        "p_duration": "120"
      }, 
      {
        "p_id": "9",
        "currentTab": "3",
        "p_icon": "../../../images/clean1-1.jpg",
        "p_title": "擦洗玻璃3",
        "p_type": 3,
        "p_priceA": "80",
        "p_duration": "120"
      },
      {
        "p_id": "10",
        "currentTab": "3",
        "p_icon": "../../../images/clean1-2.jpg",
        "p_title": "窗帘换洗3",
        "p_type": 3,
        "p_priceA": "60",
        "p_duration": "90"
      },
      {
        "p_id": "11",
        "currentTab": "3",
        "p_icon": "../../../images/clean1-3.jpg",
        "p_title": "杂物整理3",
        "p_type": 3,
        "p_priceA": "100",
        "p_duration": "120"
      },
      {
        "p_id": "12",
        "currentTab": "3",
        "p_icon": "../../../images/clean1-4.jpg",
        "p_title": "室内大扫除3",
        "p_type": 3,
        "p_priceA": "100",
        "p_duration": "120"
      } 
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.init();
    this.chooseAll();

    //swiper广告
    this.getSwiper();
  },

  onShareAppMessage: function () {
    return {
      title: '生活服务预约',
      desc: '预约小程序',
      path: '/pages/index/index.js'
    }
  },

  init: function () {
    var v = new Date().getTime();
    this.setData({
      version: v
    })
  },

  //筛选
  chooseItemClick: function (e) {
    var ds = e.currentTarget.dataset;
    var clickedTab = ds.tab;
    var currentTab = this.data.currentTab;
    if (currentTab === clickedTab) {
      return;
    }
    this.setData({
      currentTab: ds.tab
    })
    var ct = this.data.currentTab;
    if (ct === 1) {
      this.chooseAll();
    } else if (ct === 2) {
      this.chooseHot();
    } else if (ct === 3) {
      this.chooseRecent();
    } else if (ct === 4) {
      this.chooseMode(1);
    }
  },

  //点击单个
  itemClick: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: './product/product?id=' + ds.id
    })
  },

  getSwiper: function () {
    var that = this;

    api.getSwiperData(config.mid, function (res) {
      var products = res.data.products;
      var swiper = new Array();
      for (var i = 0; i < 3; i++) {
        swiper.push(products[i].p_icon);
      }
      console.log("广告返回：===========" + swiper);
      wx.setStorageSync('swiper', swiper);
      that.setData({
        swiper: swiper
      })
    });
  },

  chooseAll: function () {
    var that = this;
    api.getProductData(config.mid, function a(res) {
      that.setData({
        products: res.data.products
      });
      console.log("请求返回：===========" + res.data.products);
      //存本地
      wx.setStorageSync('products', that.data.products);
    });
  },

  chooseHot: function () {
    var that = this;
    api.getHotProductData(config.mid, function (res) {
      that.setData({
        products: res.data.products
      });
      console.log("请求返回：===========" + res.data.products);
    })
  },

  chooseRecent: function () {
    var that = this;
    api.getRecentProductData(config.mid, function (res) {
      that.setData({
        products: res.data.products
      });
      console.log("请求返回：===========" + res.data.products);
    });
  },

  chooseMode: function (mode) {
    var that = this;
    api.getModeProductData(config.mid, mode, function (res) {
      that.setData({
        products: res.data.products
      });
      console.log("请求返回：===========" + res.data.products);
    })
  },
})

