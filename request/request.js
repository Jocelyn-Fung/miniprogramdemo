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

  return new Promise(function(resolve,reject){
    wx.request({
      ...params,
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