import { getSetting, openSetting, chooseAddress} from '../../utils/async.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chosenGoods:[],
    address:{},
    totalNum:0,
    totalPrice:0
  },

  // 获取页面数据
  getPay: function(){
    let carts = wx.getStorageSync('carts')||[];
    // console.log(carts)
    let totalNum=0;
    let totalPrice=0;
    let chosenGoods =[];
    carts.forEach(v=>{
      if(v.checked){
        chosenGoods.push(v)
        totalNum += v.num
        totalPrice +=v.goods_price*v.num
      }
    })
    // console.log(chosenGoods, totalNum, totalPrice)
    let address = wx.getStorageSync('address')||{};
    this.setData({
      chosenGoods,
      address,
      totalNum,
      totalPrice
    })
  },
  // 当没有地址的时候，点击选择地址的事件处理函数
  getsetting: async function(){
    // 捕捉各种获取权限中可能出现的异常
    try{
      // 通过wx.getSetting 获取当前用户拥有的权限
      let res = await getSetting();
      // 判断用户有没有获取当前地址的权限
      // console.log(res)  //用户授权 scope.address
      if(!res.authSetting["scope.address"]){
        await openSetting();  //授权后成功后点击返回就可以进行地址的选择了
      }
      // 获取用户的地址
      let address = await chooseAddress();
      address.all = address.provinceName +address.cityName+ address.countyName +address.detailInfo;
      wx.setStorageSync("address", address)
      this.setData({
        address
      })


    }catch(e){
      console.log(e)
    }
  },

  // 点击去结算
  handlePay:function(){
    console.log('122')
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
    this.getPay();
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