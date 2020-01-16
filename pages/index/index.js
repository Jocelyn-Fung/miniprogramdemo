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
  onLoad: function (options) {
    wx.request({
      url:'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      method:'get',
      success:(res)=>{
        // console.log(res)
        if(res.statusCode===200){
          this.setData({
            banner: res.data.message
          })
        }
      }
    }),
    // 导航栏
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
        method: 'get',
        success: (res) => {
          // console.log(res)
          if (res.statusCode === 200) {
            this.setData({
              navbars: res.data.message
            })
          }
        }
      }),
      // 楼层
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
        method: 'get',
        success: (res) => {
          // console.log(res)
          if (res.statusCode === 200) {
            this.setData({
              floors: res.data.message,
              // product_list: res.data.message.product_list
            })
          }
        }
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
  // handleChild(e) {
  //   console.log(e)
  //   console.log(e.detail,"拿到值啦！")
  // }
})