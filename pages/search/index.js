import {
  request
} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  // 获取输入框的内容,双向数据绑定
  inputContent: function(e) {
    // console.log(e)
    this.setData({
      inputVal: e.detail.value
    })
  },
  // 发送请求获取符合输入内容的数据 点击搜索
  handleSearch: async function(e) {
    const {
      inputVal
    } = this.data
    // console.log(inputVal)
    if (!inputVal || inputVal.trim()==='') {
      wx.showToast({
        title: '请输入搜索内容！',
        duration:  2000,
        icon: "none"
      })
      return false;
    }
    //请求后台数据
    const searchList = await request({
      url: '/goods/qsearch',
      data: {
        query: inputVal
      }
    })
    //判断一下goods_list 是否为空
    if (searchList.length === 0) {
      wx.showToast({
        title: "查无数据！",
        icon: "none",
        duration: 2000
      })
    }
    // console.log(searchList)
    this.setData({
      searchList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})