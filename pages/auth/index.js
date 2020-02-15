import {request } from '../../request/request.js';
import {login } from '../../utils/async.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 点击获取用户的信息
  onGetUserInfo: async function(e){
    try{
      // console.log(e) //获取前四个参数
      let { rawData, iv, signature, encryptedData } = e.detail;
      // 调用wx.login()方法获取code 第五个参数
      let {code} = await login()
      // console.log(code)
      // 1. 正式发送请求，获取token
      let res = await request({
        url: '/users/wxlogin',
        method:"POST",
        data: {rawData, iv, signature, encryptedData,code},
      })
      // console.log(res.token)
      // 将获取到的token保存到本地，
      wx.setStorageSync("token", res.token);
      // 返回到上一页
      wx.navigateBack({
        delta:1
      })
    }catch(e){
      console.log(e)
    }
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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