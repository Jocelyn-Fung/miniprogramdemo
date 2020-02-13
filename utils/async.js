// 使用promise 对微信的接口异步转同步
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