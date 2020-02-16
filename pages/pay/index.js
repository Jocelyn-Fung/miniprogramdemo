import {
  getSetting,
  openSetting,
  chooseAddress,
  requestPayment,
  showToast
} from '../../utils/async.js';
import {
  request
} from '../../request/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chosenGoods: [],
    address: {},
    totalNum: 0,
    totalPrice: 0,
  },

  // 获取页面数据
  getPay: function() {
    let carts = wx.getStorageSync('carts') || [];
    let totalNum = 0;
    let totalPrice = 0;
    let chosenGoods = [];
    carts.forEach(v => {
      if (v.checked) {
        chosenGoods.push(v)
        totalNum += v.num
        totalPrice += v.goods_price * v.num
      }
    })
    // console.log(chosenGoods, totalNum, totalPrice)
    let address = wx.getStorageSync('address') || {};
    this.setData({
      chosenGoods,
      address,
      totalNum,
      totalPrice
    })
  },
  // 当没有地址的时候，点击选择地址的事件处理函数
  getsetting: async function() {
    // 捕捉各种获取权限中可能出现的异常
    try {
      // 通过wx.getSetting 获取当前用户拥有的权限
      let res = await getSetting();
      // 判断用户有没有获取当前地址的权限
      // console.log(res)  //用户授权 scope.address
      if (!res.authSetting["scope.address"]) {
        await openSetting(); //授权后成功后点击返回就可以进行地址的选择了
      }
      // 获取用户的地址
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address)
      this.setData({
        address
      })


    } catch (e) {
      console.log(e)
    }
  },

  // 点击去结算
  handlePay: async function() {
    try {
      let token = wx.getStorageSync('token');
      // 判断如果没有授权拿到token的话，就先跳转页面auth去授权
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      }
      // 2.在系统中创建订单  
      // 2.1 先拿到被选中的商品的goods_id,goods_number,goods_price===》goods
      let goods_id = 0;
      let goods_number = 0;
      let goods_price = 0;
      let goods = [];
      // 2.2 循环数组，拿到上面的参数
      this.data.chosenGoods.forEach(v => {
        let params = {};
        params['goods_id'] = v.goods_id;
        params['goods_number'] = v.num;
        params['goods_price'] = v.goods_price;
        goods.push(params);
      })
      // console.log(goods)
      // 2.3 获取请求需要的order_price,consignee_addr,参数
      let consignee_addr = this.data.address.all
      let order_price = this.data.totalPrice
      // console.log(consignee_addr, order_price)
      // 发送请求获取支付参数需要的订单编号
      let {
        order_number
      } = await request({
        url: '/my/orders/create',
        data: {
          order_price,
          consignee_addr,
          goods
        },
        method: 'POST'
      })
      // console.log(order_number)
      // 3.订单创建成功后，获取支付参数
      let {
        pay
      } = await request({
        url: '/my/orders/req_unifiedorder',
        data: {
          order_number
        },
        method: 'POST',
      })
      // console.log(pay)
      // 4.发起支付
      let payment = await requestPayment(pay);
      // 5.查询支付是否成功
      let res = await request({
        url: '/my/orders/chkOrder',
        data: {
          order_number
        },
        method: 'POST',
      })
      // console.log(res)
     await showToast({
       title:'支付成功'
     })
      // 6.手动删除购物车已经支付的商品
      let carts = wx.getStorageSync("carts")||[];
      // v.checked 是已勾选的，反之没勾选的留在购物车，勾选的就是已支付的，那么应该删除
      let newCarts = carts.filter(v=>!v.checked);
      // console.log(newCarts)
      wx.setStorageSync("carts", newCarts);
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.getPay();
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