import {request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.getGoodsDetail(options)
  },
  // 获取数据
  getGoodsDetail: async function(params){
    const goodsDetail = await request({
      url: '/goods/detail',
      data: params,
    })
    console.log(goodsDetail)
    this.setData({
      goodsDetail
    })
  },
  // 点击图片预览事件处理函数
  handleClick(e){
    // console.log(e)
    let {pics, current} = e.currentTarget.dataset
    // console.log(pics,current)
    wx.previewImage({
      urls: pics.map(v=>v.pics_mid), //将数组中的pics_mid循环生成一个新数组
      current
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