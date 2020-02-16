// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:[
      {
        index:0,
        value:"功能问题",
        isSelect:true
      },
      {
        index: 1,
        value: "性能问题",
        isSelect: false
      },
      {
        index: 2,
        value: "体验问题",
        isSelect: false
      },
      {
        index: 3,
        value: "其他",
        isSelect: false
      }
    ],
    imgsArray:[], 
    upload_img_count:0
  },
  // 上传图片
  handleUploadImgs: function(){
    wx.chooseImage({
      count:9,
      success: (res) =>{
        // console.log(res)
        this.setData({
          imgsArray: [...this.data.imgsArray, ...res.tempFiles]
        })
      },
    })
  },
  // 提交反馈
  handleSubmit: function(){
    // console.log(this.data.imgsArray)
    // 如果是空的，那么不可以提交
    if (!this.data.imgsArray.length){
      wx.showToast({
        title:'请上传传图片',
        icon:'none'
      })
      return false;
    }
    // 否则就显示下载中
    wx.showLoading({
      title: '图片上传中...',
    })
    // 开始上传图片到云端
    this.data.imgsArray.forEach((v,i)=>{
      wx.uploadFile({
        url: 'https://images.ac.cn/Home/Index/UploadAction/',  //新浪图床
        filePath: v.path,
        name: 'file',
        formData:{},
        success:res=>{
          // console.log(res)
          if(i===this.data.imgsArray.legth -1){
            wx.hideLoading();
            this.setData({
              upload_img_count: i+1
            })
            wx.navigateBack({
              delta:1
            })
          }else{
            this.setData({
              upload_img_count:i+1
            })
          }
        }
      })
    })
  },
  // 点击问题类型
  handlePro:function(e){
    // console.log()
    let index = e.currentTarget.dataset.index
      let types = this.data.types
        types.map(v=>{
          if (index === v.index) {
            v.isSelect = !v.isSelect
            return v;
          }
      })
      this.setData({
        types
      })
  },
  // 长摁删除图片
  handleCancel: function(e){
    let index = e.currentTarget.dataset.index
    // console.log(index)
    // let {imgsArray} = this.data
    let {imgsArray}= this.data
    // console.log(imgsArray)
    imgsArray.splice(index, 1)
    this.setData({
      imgsArray
    })
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