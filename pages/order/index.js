import {
  request
} from "../../request/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        index:0,
        value: "全部",
        type:1,
      },
      {
        index: 1,
        value: "待付款",
        type: 2,
      }, {
        index: 2,
        value: "待发货",
        type: 3,
      }
    ],
    tab:0, //默认点击到第一个全部,用于确定当前被点击的是哪一项
    orderList:[],
    create_time:[]
  },
  
  // 处理子传父
  handleIndexChange(e){
    this.setData({
      tab:e.detail
    })

  },
  // 获取数据
  getOrderList: async function(){
    let types = this.data.tabs[0].type
    // console.log(types)
    let res = await request({
      url: "/my/orders/all",
      data: {
        type:types
      },
      method:"GET"
    })
    res.orders.forEach(v=>{
      v.create_time = new Date(v.create_time*1000).toLocaleString();
      // console.log(v.create_time)
      return v;
    })   
    this.setData({
      orderList: res.orders
    })
     console.log(res)
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList();
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
})