import util from './util.js'
import wx from 'weixin-js-sdk'

export default {
  initConfig: (reqUrl, callback) => {
    util.http.post('/api/user/vx_sign', {
      reqUrl
    }).then((res) => {
      if (res.code === 0) {
        const { nonceStr, timestamp } = res.data
        const signature = res.data.signtrue
        const appId = 'wxd8de5e3e19b318ee'
        wx.config({
          signature, appId, nonceStr, timestamp, debug: true, jsApiList: ['getLocation']
        })
        if (callback) {
          callback()
        }
      }
    })
  }
}
