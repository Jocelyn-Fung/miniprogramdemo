import {request} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    navbars:[],
    floors:[],
    product_list:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取轮播图数据
  getBanner: async function(){
      const banner = await request({
        url: '/home/swiperdata',
      })
    // console.log(banner)
    this.setData({
      banner
    })
  },
  // 获取导航栏数据
  getNavbars: async function(){
    const navbars = await request({
      url: '/home/catitems'
    })
    // console.log(navbars)
    this.setData({
      navbars
    })
  },
  // 获取楼层数据
  getFloors: async function(){
    const floors = await request({
      url: '/home/floordata'
    })
    // console.log(floors)
    this.setData({
      floors
    })
  },
  onLoad: function (options) {
    // 轮播图请求
  this.getBanner();
    // 导航栏 请求
  this.getNavbars();
      // 楼层请求
  this.getFloors();
  // 封装前的请求写法
      // wx.request({
      // url: 'https://www.linweiqin.cn/api/public/v1/home/floordata',
      //   method: 'get',
      //   success: (res) => {
      //     // console.log(res)
      //     if (res.statusCode === 200) {
      //       this.setData({
      //         floors: res.data.message,
      //         // product_list: res.data.message.product_list
      //       })
      //     }
      //   }
      // })
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
    
  }
  // handleChild(e) {
  //   console.log(e)
  //   console.log(e.detail,"拿到值啦！")
  // }
})