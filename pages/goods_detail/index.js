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
    isCollect: false,   //默认未收藏
    goods:0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log('33',options)
    //调用页面加载数据
    this.getGoodsDetail(options);
    this.setData({
      goods: wx.getStorageSync("goodsTotal")
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
    this.collect()  //调用封装，加载得时候获取缓存进行判断
  },
  // 点击图片预览事件处理函数
  handleClick(e) {
    // console.log(e)
    let { pics, current} = e.currentTarget.dataset
    // console.log(pics,current)
    wx.previewImage({
      urls: pics.map(v => v.pics_mid), //将数组中的pics_mid循环遍历生成一个新数组
      current
    })
  },
  //点击收藏，点击取消  
  handleCollect: function() {
    let {goods_id } = this.data.goodsDetail
    // console.log('222',goods_id)
    // 如果用户的收藏数组中没有任何内容，点击就直接收藏改商品
    // 从本地获取数组，没有的话就给个空【】
    // 如果数组长度是0，那么点击的时候就push
    // 否则就进行匹配，在匹配上的时候就取消收藏，否则就保存收藏进缓存
    let goodsIdArray = wx.getStorageSync("goodsIdArray")||[];
    if (!goodsIdArray.length){
      goodsIdArray.push(goods_id)
      // console.log('00',goodsIdArray)
      wx.setStorage({
          key: 'goodsIdArray',
        data: goodsIdArray,
        })
        // console.log(this)
        this.setData({
            isCollect:true
          }),
          wx.showToast({
            title: '收藏成功！',
          })
    } else{
        // 说明本地已经有数组了,那么遍历数组，有一样id的删除，没有的进行保存, -1表示没有符合条件的
      if (goodsIdArray.indexOf(goods_id)===-1) {
        goodsIdArray.push(goods_id)
        // console.log('11',goodsIdArray)
        wx.setStorage({
          key: 'goodsIdArray',
          data: goodsIdArray,
        })
        this.setData({
          isCollect: true
        }),
          wx.showToast({
            title: '收藏成功！',
          })
       } else{
        this.removeByValue(goodsIdArray, goods_id);
        // console.log('22',goodsIdArray)
        wx.setStorage({
          key: 'goodsIdArray',
          data: goodsIdArray,
        })
        this.setData({
          isCollect: false
        }),
          wx.showToast({
            title: '取消收藏！',
          })
       }
    }
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
  // 封装页面加载的时候，是否已收藏
  collect(){
    // 保存商品id
    let goods_id =  this.data.goodsDetail.goods_id
    let goodsIdArray = wx.getStorageSync("goodsIdArray")
    // console.log('fengzhuang',goodsIdArray)
    if (goodsIdArray){
      // console.log(goodsIdArray)
      goodsIdArray.forEach(e=>{
        if (e == goods_id){
          this.setData({
              isCollect: true
            })
        }
      })
    }
  },
  // 点击加入购物车
  addCart: function(){
  //  console.log(this.data.goodsDetail)
  let goodsDetail = this.data.goodsDetail
  let carts = wx.getStorageSync('carts')||[];
  let goods = carts.length
  let index = carts.findIndex(v=>v.goods_id===this.data.goodsDetail.goods_id)
  // 如果index=-1的话，说明当前没有任何商品再数组中，数组的index从0开始
  if(index===-1){
   goodsDetail.num=1  //将数量存进去，以备后需++
   goodsDetail.checked = true; //后面会购物小车用上
    carts.push(goodsDetail)
    this.setData({
      goods:carts.length
    })
    wx.setStorageSync("carts", carts)
    wx.setStorageSync("goodsTotal", carts.length)
    wx.showToast({
      title: '宝贝已放在购物车了,亲！',
    })

  } else{
    //如果数组不是空的，点击就++
    carts[index].num++;
    wx.setStorageSync("carts", carts)
    wx.setStorageSync("goodsTotal", carts.length)
    wx.showToast({
      'title':'宝贝已放在购物车了,亲！'
    })
  }
  },
  // 数组长度加上遍历数组中的num=总商品数量
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