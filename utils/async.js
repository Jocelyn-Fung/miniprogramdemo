// 使用promise 对微信的接口异步转同步
// 封装wx.showModal
export const showModal = (params)=>{
  return new Promise(function(resolve, reject){
    wx.showModal({
      content: params.content,
      success:res=>{
        resolve(res);
      },
      fail:err=>{
        reject(err);
      }
    })
  })
}
// wx.geSetting()
// promise  封装  获取用户的当前设置
export const getSetting = params =>{
  return new Promise(function(resolve,reject){
    wx.getSetting({
      success:(res)=> {
        // console.log(res.authSetting)
       resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
 
// openSetting() 封装    打开用户的设置
export const openSetting = params=>{
  return new Promise(function(resolve, reject){
    wx.openSetting({
      success:(res)=> {
        resolve(res);
        // console.log(res.authSetting)
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}

// 用户的收货地址
export const chooseAddress = params =>{
  return new Promise(function(resolve, reject){
    wx.chooseAddress({
      success:(res)=>{
        resolve(res);
      }, 
      fail:(err)=>{
        reject(err);
      }
    })
  })
}

// 用户登录
export const login = params => {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

// 发起支付
export const requestPayment = pay => {
  return new Promise(function (resolve, reject) {
    wx.requestPayment({
      ...pay,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

// 轻提示封装
export const showToast = params => {
  return new Promise(function (resolve, reject) {
    wx.showToast({
      title: params.title,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}