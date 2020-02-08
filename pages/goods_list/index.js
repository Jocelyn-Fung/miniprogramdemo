import {request} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        index:0,
        value:"综合",
        isActive:true,
      },
      {
        index: 1,
        value: "销量",
        isActive: false,
      },
      {
        index: 2,
        value: "价格",
        isActive: false,
      }
    ],
    tab:0,
    goodsList:[]
  },
  QueryParams:{
    pagenum:1,
    pagesize:10
  },
  totalPages:0,
  // 处理子传父
  handleIndexChange(e){
    // console.log(e.detail)  //获取儿子传过来的index值，接下来发送请求，获取相应的数据
    this.setData({
      tab:e.detail
    })
    // console.log(this.data.tab)
  },
  // 获取数据
  getGoodsList: async function(){
    const GoodsList = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    // console.log(GoodsList)
    // 总页数= 总数据/每页的条数
    this.totalPages = Math.ceil(GoodsList.total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...GoodsList.goods, ...this.data.goodsList]
    })
    wx.stopPullDownRefresh()
    // console.log(this.data.goodsList)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 当前跳转页面栈，微信自带
    const pages = getCurrentPages();
    // console.log('11',pages)
    const currentPage = pages[pages.length-1];
    // console.log(currentPage.options);
    const {cid,query}= currentPage.options
    // console.log(currentPage.options)
    // 如果页面有传cid
    if (cid){
      this.QueryParams['cid'] = cid;
    }
    if (query) {
      this.QueryParams['query'] = query;
    }
    this.getGoodsList();
  },

  // 下拉刷新
  onPullDownRefresh(){
    // 先将goodsList重置为空，
    this.setData({
       goodsList:[]
       })
      //  把页面重置为1
    this.QueryParams.pagenum =1;
    this.getGoodsList();
  },
  // 上拉加载
  onReachBottom: function(){
  //  if(this.totalPages >= this.QueryParams.pagenum){
  //    this.QueryParams.pagenum++;
  //    this.getGoodsList();
  //  }else{
  //    wx.showToast({
  //      title: '没有更多数据了',
  //    })
  //  }
  console.log('我被触发;')
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