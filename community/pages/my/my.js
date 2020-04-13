// pages/my/my.js
var mta = require('../../utils/mta_analysis.js');
var common = require('../../utils/common.js');
const app = getApp();

Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad:function(){
    // var that = this;
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   console.log(userInfo);
    //   //更新数据
    //   that.setDate({
    //     userInfo:userInfo
    //   })
    // }),

    // 展示用户信息
    var userInfo = common.getStorage('userInfo', true);
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
    }
    // 腾讯分析
    mta.Page.init();
  },

  //监听页面显示
  onShow: function (options) {
    // 保证用户已登录
    var uniqueID = common.getStorage('uniqueID', true);
    if (!uniqueID) {
      this.getUserInfo();
    }
  },

  //点击头像
  bindViewTap: function () {
  },

  //获取用户信息
  getUserInfo: function (e) {
    var $that = this;
    // 登录
    wx.login({
      success: res => {
        console.log("微信登录", res);
        var code = res.code;
        var encryptedData;
        var iv;
        // 获取用户信息
        wx.getUserInfo({
          success: res => {
            console.log("获取用户信息", res);
            // 可以将 res 发送给后台解码出 unionId
            common.setStorage('userInfo', res.userInfo, false);
            encryptedData = res.encryptedData;
            iv = res.iv;
            $that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            });
            common.getUniqueID(code, encryptedData, iv, function (data) {
              console.log("服务器登录", data);
              var uniqueID = {
                openid: data.openid,
                unionid: data.unionid,
              };
              common.setStorage('uniqueID', uniqueID, false);
            });

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (app.userInfoReadyCallback) {
              app.userInfoReadyCallback(res)
            }
          },
          fail: res => {
            // 用户主动点击时询问是否更改授权
            if (e) {
              wx.showModal({
                title: '权限管理',
                content: '您已拒绝授权，是否前往开启。',
                success: res => {
                  if (res.confirm) {
                    wx.openSetting();
                  }
                }
              });
            }
          }
        });
      }
    });
  },

  //模拟打电话
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '400-9915591' //仅为示例，并非真实的电话号码
    })
  },
})