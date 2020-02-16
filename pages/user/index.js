// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tools:[
      {
        index:0,
        content:"待付款",
        icon:"icon-icon-test",
      },
      {
        index: 1,
        content: "待收货",
        icon: "icon-daishouhuo",
      },
       {
        index: 2,
        content: "退货/退款",
         icon: "icon-tuikuan",
      },
      {
        index: 2,
        content: "全部订单",
        icon: "icon-quanbudingdan",
      }
    ],
    tab:0  //当前被点击的index
  },
 handleClick:function(e){
  //  console.log(e.currentTarget.dataset)
   let tab = e.currentTarget.dataset.index
   this.setData({
     tab
   })
 },
  // 点击登录获取用户信息
  handleUserInfo: function(e){
    this.setData({
      userInfo: e.detail.userInfo
    })
    wx.setStorageSync("userInfo", e.detail.userInfo);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync("userInfo") || {};
    this.setData({
      userInfo
    })
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