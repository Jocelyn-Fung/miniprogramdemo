import {
  request
} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    goodsIdArray: [],
    isCollect: "icon-shoucang"
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log('33',options)
    //调用页面加载数据
    this.getGoodsDetail(options)
    // 保存商品id
    let goods_id = options.goods_id
    // 获取本地数据，如果有id说明是收藏的，高亮星星
    wx.getStorage({
      key: 'goodsIdArray',
      success: res => {
        // console.log(res)
        res.data.forEach(e => {
          // console.log(e)
          // 如果本地数组中有匹配项，那么切换类成高亮
          if (e == goods_id) {
            this.setData({
              isCollect: "icon-shoucang_gaoliang"
            })
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
  //点击收藏，点击取消  
  handleCollect: function() {
    let {
      goods_id
    } = this.data.goodsDetail
    let goodsId = this.data.goodsIdArray
    // console.log('222',goods_id)
    // 如果用户的收藏数组中没有任何内容，点击就直接收藏改商品
    wx.getStorage({
      key: 'goodsIdArray',
      // 说明本地还没有这个数组，便创建这个数组，把数据push进去
      fail: () => {
        goodsId.push(goods_id)
        wx.setStorage({
          key: 'goodsIdArray',
          data: goodsId,
        })
        // console.log(this)
        this.setData({
            isCollect: "icon-shoucang_gaoliang"
          }),
          wx.showToast({
            title: '收藏成功！',
          })

      },
      success: (res) => {
        // 说明本地已经有数组了,那么遍历数组，有一样id的删除，没有的进行保存
        // console.log(res.data) //未找到则返回-1
          if (res.data.indexOf(goods_id)===-1) {
            res.data.push(goods_id)
            // console.log(res.data)
            wx.setStorage({
              key: 'goodsIdArray',
              data: res.data,
            })
            this.setData({
                isCollect: "icon-shoucang_gaoliang"
              }),
              wx.showToast({
                title: '收藏成功！',
              })
          } else{
           this.removeByValue(res.data, goods_id);
           wx.setStorage({
             key: 'goodsIdArray',
             data: res.data,
           })
            this.setData({
              isCollect: "icon-shoucang"
            }),
              wx.showToast({
                title: '取消收藏！',
              })
          }
      },
    })
  },

  //删除数组中指定元素 封装函数
  removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
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