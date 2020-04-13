// pages/forum/forum.js
var app = getApp()
var that
Page({
  /*页面的初始数据*/
  data: {
    DataSource: [1, 1, 1, 1, 1],
    avatar: 'http://images.liqucn.com/img/h1/h2/img201805261411490_info300X300.jpg',
    content: '现有安昕雅苑3号楼6单元22层内三室一厅户型对外出租，房间全部朝阳，采光极好、精装修、家电（电视、冰箱、空调、洗衣机、热水器等）、家具齐全，通天然气，面积120平米，可以直接拎包入住。承租人不能养宠物。价格面议。中介勿扰。联系人：王建国，电     话：13789464599',
      resource: ['https://imgwcs3.soufunimg.com/viewimage/agents1/2020_03/19/wap/newcertificate/43e712c3-3151-41a8-8353-bd94ea53137d/690x440c.png',
  'https://imgwcs3.soufunimg.com/viewimage/agents1/2020_03/04/wap/newcertificate/c9b81635-453d-4e90-a2e8-fa0818df2a2e/690x440c.png',
        'https://imgwcs3.soufunimg.com/viewimage/agents1/2019_12/11/wap/newcertificate/48e9f17b-73da-4259-9129-13aea2cea715/690x440c.jpg',
        'https://imgwcs3.soufunimg.com/viewimage/agents1/2020_02/19/wap/newcertificate/0e7416ea-ed39-49bb-897b-3b52e1be02ca/690x440c.jpg',
        'https://imgwcs3.soufunimg.com/viewimage/agents1/2020_03/10/wap/newcertificate/796dd5e1-1e80-46c8-978f-f811d1d02b52/690x440c.jpg'
      ],
      zanSource: ['李明', '王倩', '刘军', '孙晓雅', '马超', '王宝'],
      contnet: [{
        'firstname': '李明',
        'content': '房子好整洁呀！！'
      },
      {
        'firstname': '王倩',
        'content': '刚好我有个朋友想租房。'
      },
      {
        'firstname': '刘军',
        'content': '租金多少？'
      },
      {
        'firstname': '孙晓雅',
        'content': '房子不错，什么时候能去看下房？'
      }
    ],
    photoWidth:wx.getSystemInfoSync().windowWidth/5,
    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框
  },
  /*生命周期函数——监听页面加载*/
  onLoad:function(options){
    that = this
  },
  //点击图片进行大图查看
  lookPhoto:function(e){
    wx.previewImage({
      current:e.currentTarget.dataset.photourl,
      urls:this.data.resource,
    })
  },
  //点击点赞的人
  touchZanUser:function(e){
    wx.showModal({
      title:e.currentTarget.dataset.name,
      showCancel:false
    })
  },
  //删除朋友圈
  delete:function(){
    wx.showToast({
      title:'删除成功',
    })
  },
  //点击了点赞评论
  touchDiscuss:function(e){
    //this.data.isShow = !this.data.isShow
    //动画
    var animation = wx.createAnimation({
      duration:300,
      timingFunction:'linear',
      delay:0,
    })

    if(that.data.isShow === false){
      that.setData({
        popTop:e.target.offsetTop - (e.detail.y-e.target.offsetTop) / 2,
        popWidth:0,
        isShow:true
      })
      //0.3秒后滑动
      setTimeout(function(){
        animation.width(0).opacity(1).step()
        that.setData({
          animation:animation.export(),
        })
      },100)
    }else{
      //0.3秒后滑动
       setTimeout(function(){
         animation.width(120).opacity(1).step()
         that.setData({
           animation:animation.export(),
         })
       },100)
       
      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: false
      })
    }
  }
})