// wx-js-sdk授权
import util from './util.js'
import wx from 'weixin-js-sdk'

// 获取jssdk需要的签名等参数
export default {
  initConfig: (reqUrl, callback) => {
    util.http.post('/api/user/vx_sign', {
      reqUrl
    }).then((res) => {
      if (res.code === 0) {
        const { nonceStr, timestamp } = res.data
        const signature = res.data.signtrue // 字段拼写有误
        const appId = 'wxd8de5e3e19b318ee'
        wx.config({
          signature, appId, nonceStr, timestamp, debug: true, jsApiList: ['getLocation']
        })
        if (callback) {
          callback()
        }
      }
    })
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
