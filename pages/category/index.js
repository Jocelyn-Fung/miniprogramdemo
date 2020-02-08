import {
  request
} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category_list:[],
    currentTab:0,
    scroll_top:0 //右边滚动条的位置
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
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/categories',
    //   method: 'get',
    //   success: res => {
    //     // console.log(res)
    //     this.setData({
    //       category_list: res.data.message,
    //     })
    //   }
    // })
    //1 先从缓存中获取数据
    // 2 判断数据是否过期，如果没有就使用本地数据，过期则发送新的请求
    let cates = wx.getStorageSync('categoryList');
    // console.log(cates)
    if(!cates){   //如果没有data就发送请求， 否则判断时间是否有效
      this.getCategoryList();
    }else{
      if(Date.now()-cates.time>1000*10){ //判断时间是否已经过期 >10s，重新发送请求
        this.getCategoryList();
      }else{   //符合时间，在本地拿数据， 进行赋值
        let categoryList = cates.data
        this.setData({
          category_list: categoryList
        })
      }
    }
    
  }, 
  getCategoryList: async function(){
    const categoryList = await request({
      url: '/categories'
    });
    // console.log(categoryList)
    // 每次拿到数据之后先把数据存在缓存里面，同时设置缓存时间， 
    // // 在规定时间内不再发送请求， 超出时间就再次请求数据
    wx.setStorageSync('categoryList', {
      time: Date.now(),
      data: categoryList
    })
    this.setData({
      category_list: categoryList
    })
  },
  Tofilter(e) {
    // console.log(e)
    this.setData({
      currentTab: e.currentTarget.dataset.id,
      scroll_top: 0  //点击的时候让它滚动位置在0
    })
    // console.log(this.data.currentTab)
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