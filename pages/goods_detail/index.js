import {
  request
} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    goodsId:[],
    // isCollect:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log('33',options)
    //调用页面加载数据
    this.getGoodsDetail(options)
    // 保存商品id
    let goods_id  = options.goods_id
    // 获取本地数据，如果有id说明是收藏的，高亮星星
    wx.getStorage({
      key: 'goodsIdArray',
      success: function (res) {
        console.log(res)
        res.data.forEach(function (e) {
          // console.log(e)
          // 如果本地数组中有匹配项，那么切换类成高亮
          if (e == goods_id) {
            
          }
        })

      },
    })
  },
  // 获取数据
  getGoodsDetail: async function(params) {
    const goodsDetail = await request({
      url: '/goods/detail',
      data: params,
    })
    // console.log(goodsDetail)
    this.setData({
      goodsDetail
    })
  },
  // 点击图片预览事件处理函数
  handleClick(e) {
    // console.log(e)
    let {
      pics,
      current
    } = e.currentTarget.dataset
    // console.log(pics,current)
    wx.previewImage({
      urls: pics.map(v => v.pics_mid), //将数组中的pics_mid循环遍历生成一个新数组
      current
    })
  },
  //处理收藏 
  handleCollect: function() {
    let {goods_id} = this.data.goodsDetail
    // console.log('222',goods_id)
    let goodsId = this.data.goodsId
      goodsId.push(goods_id)
      // console.log(goodsId)
      wx.setStorage({
        key: 'goodsIdArray',
        data: goodsId,
      })
      wx.showToast({
        title: '收藏成功',
      })
    

    // 判断，如果在本地中已经有匹配的goods_id,那么再次点击就是删除收藏
    // if(goods_id){

    // }

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