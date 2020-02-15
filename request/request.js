// 将请求进行封装
// 1.配置通用的url
// 2. 设置发送请求前和发送请求后的遮罩信息
// 3. 使用promise进行封装
import { BASE_URL} from './url.js'
export const request = params =>{
  // 2.遮罩信息
  wx.showLoading({
    title: '正在加载中...',
    mask:true
  })
  // 解构 获取参数里面是否有header
  let header ={...params.header};
  // 判断只要包含了my，那么就设置他的header里面的authorization 的值为token
  if(params.url.includes("/my")){
    header["Authorization"]= wx.getStorageSync("token")
  }
  return new Promise(function(resolve,reject){
    wx.request({
      ...params,
      header:header,  //添加header
      url: BASE_URL + params.url,
      success:res=>{
        resolve(res.data.message)
      },
      fail:err=>{
        reject(err)
      },
      complete:res=>{
        wx.hideLoading()
      }
    })
  })
}