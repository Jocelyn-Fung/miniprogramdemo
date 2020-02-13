// pages/cart/index.js
import { showModal } from '../../utils/async.js'
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
    // 遍历数组，如果有一项的checked都是假的，那么全选就重新赋值成假的，否则就时两个都是真的，不需要修改状态
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

// 点击减号减1，点击加号＋1
  handleOperation: async function(e){
    let {goods_id, operation} = e.currentTarget.dataset;
    let carts = wx.getStorageSync('carts');
    // 遍历数组，找到与goods_id一致的商品，明确用户点击的是哪一个商品
    // 如果operation=-1,说明点击的是减号，在对应的商品中减-1
    // 当点击-1 最后要等于0的时候，给用户提示，是否真的要删除这个商品了
    let index = carts.findIndex(v=>v.goods_id==goods_id);
    // console.log(operation)
    if (operation == -1 && carts[index].num-1 == 0){
      const res = await showModal({
        content: '确定要删除人家吗，亲'
      })
      if(res.confirm){
        carts.splice(index,1)
      }
    } 
     else{
      carts[index].num +=operation 
    }
    this.getCarts(carts);
    wx.setStorageSync('goodsTotal', carts.length)
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