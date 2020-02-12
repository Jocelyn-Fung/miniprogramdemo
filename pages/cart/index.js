// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [], // 缓存购物车内的商品信息，用于数据同步
    totalPrice: 0, //产品的总价格
    totalNum: 0, // 商品总数量
    checkAll: false //全选
  },

  // 从本地获取存在购物车的信息
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let carts = wx.getStorageSync('carts') || [];
    this.getCarts(carts); //调用封装函数
    //应该获取全选的状态
    let checkAll = wx.setStorageSync('checkAll', false);
  },

  //封装函数获取数据，渲染页面，方便后续计算总价格和商品总个数
  getCarts: function(carts) {
    let checkAll = true; //假设为真
    let totalPrice = 0;
    let totalNum = 0;

    // for(let i=0; i<carts.length; i++){
    //   if(!carts[i].checked){
    //     checkAll=false;
    //   }else{
    //     totalPrice += carts[i].goods_price * carts[i].num;
    //     totalNum += carts[i].num;
    //   }
    // }
    carts.forEach(v=>{
      if (!v.checked) {
        checkAll = false;
        // console.log(v.checked);
      } else{
         totalPrice +=v.goods_price*v.num;
         totalNum +=v.num;
      }
    })
   
    this.setData({
      carts, totalNum,totalPrice, checkAll
    });
    wx.setStorageSync('checkAll', checkAll)
    wx.setStorageSync('carts', carts)
  },

  // 点击单选按纽
  handleSelect: function(e) {
    let {
      goods_id
    } = e.currentTarget.dataset //获取当前点击的商品的goods_id
    this.data.carts.forEach(e => {
      if (e.goods_id === goods_id) {
        e.checked = !e.checked //取反切换
        wx.setStorageSync('carts', this.data.carts); //同步缓存
        this.getCarts(wx.getStorageSync('carts')); //同步数据获取
      }
    });
  },

  // 点击全选按钮事件
  handleSelectAll: function(e) {
    // 从this.data中获取 购物车数据和checkAll的数据
    let {checkAll, carts} = this.data
    //点击全选的时候状态取反
    checkAll = !checkAll;
    // 对购物车的carts中的checked进行循环，让每一项都等于checkAll， 然后在加载页面
    carts.forEach(v=>{v.checked = checkAll});
    this.setData({
      checkAll
    })
    this.getCarts(carts);
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