// wx-js-sdk授权
// import util from './util.js'

// 获取jssdk需要的签名等参数
export default {
  initConfig: (reqUrl, callback) => {
    // 等接口
    // util.http.post('/api/wx/get/sign', {
    //   reqUrl
    // }).then((resp) => {
    //   if (resp.errno === 0) {
    //     const { signature, appId, nonceStr, timestamp } = resp.data
    //     wx.config({
    //       signature, appId, nonceStr, timestamp, debug: false, jsApiList: ['chooseWXPay', 'chooseImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'getLocalImgData', 'updateAppMessageShareData']
    //     })
    //     if (callback) {
    //       callback()
    //     }
    //   }
    // })
  },
  setShare: (openId) => {
  // wx报错 后续完善功能
  //   const origin = location.origin
  //   wx.ready(function () {
  //     // “分享给朋友”
  //     wx.onMenuShareAppMessage({
  //       title: '掌上医院',
  //       desc: '不断提升服务水平，持续改进医疗质量',
  //       imgUrl: 'http://h5.ztuo.cn/img/shareimg.jpg',
  //       link: origin + '?openId=' + openId
  //     }, function (res) {
  //       // 这里是回调函数
  //     })
  //     // “分享到朋友圈”
  //     wx.onMenuShareTimeline({
  //       title: '掌上医院',
  //       desc: '不断提升服务水平，持续改进医疗质量',
  //       imgUrl: 'http://h5.ztuo.cn/img/shareimg.jpg',
  //       link: origin + '?openId' + openId
  //     }, function (res) {
  //       // 这里是回调函数
  //     })
  //   })
  }
}
