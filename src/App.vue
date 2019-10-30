<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import util from './utils/util'
import wx from 'weixin-js-sdk'
export default {
  name: 'App',
  data () {
    return {
      timestamp: '',
      nonceStr: '',
      signature: '',
      count: 0
    }
  },
  created () {
    // this.getWxLoginInfo()
    // 获取微信SDK配置签名
    let wxSign = window.localStorage.getItem('wxSign')
    let _this = this
    if (wxSign) {
      wx.config({
        debug: false,
        appId: 'wxd8de5e3e19b318ee',
        timestamp: wxSign.split('&')[0],
        nonceStr: wxSign.split('&')[1],
        signature: wxSign.split('&')[2],
        jsApiList: ['openLocation']
      })
      wx.error(function (res) {
        // 如果签名过期，再重新获取
        if (res.errMsg.includes('63002')) {
          console.log('--------------签名过期获取新签名--------------')
          if (_this.count < 5) {
            _this.getSign()
            _this.count++
          }
        }
      })
    } else {
      this.getSign()
    }
    // 用户登录，将用户信息存至store
    this.$store.commit('updateUserInfo')

    window.addEventListener('pageshow', function (e) {
      // 通过persisted属性判断是否存在 BF Cache
      if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent) && e.persisted) {
        location.reload()
      }
    })
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  methods: {
    getWxLoginInfo () {
      util.http
        .post('/api/user/vx_perpare')
        .then(res => {
          console.console.log('======/api/user/vx_perpare=======')
          console.log(res)
          this.wxLoginInfo = res.data
          // const token = this.getUrlParam('token')
          // if (!token) {
          //   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.wxLoginInfo.appid + '&redirect_uri=' + this.wxLoginInfo.redirect_uri + '&response_type=' + this.wxLoginInfo.response_type + '&scope=' + this.wxLoginInfo.scope + '&state=' + this.wxLoginInfo.state + this.wxLoginInfo.wechat_redirect
          // }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSign () {
      util.http
        .post('/api/user/vx_sign', { url: location.href.split('#')[0] })
        .then(res => {
          console.log(res)
          window.localStorage.setItem(
            'wxSign',
            [res.data.timestamp, res.data.nonceStr, res.data.signtrue].join('&')
          )
          wx.config({
            debug: false,
            appId: 'wxd8de5e3e19b318ee',
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signtrue,
            jsApiList: ['openLocation']
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getUrlParam (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return decodeURI(r[2])
      return null
    }
  }
}
</script>

<style lang="scss" >
#app {
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  width: 750px;
}
.toast {
  line-height: 60px;
  border-radius: 10px;
  .mint-toast-text {
    font-size: 30px;
    margin: 0 30px;
  }
}
body {
  .mint-msgbox {
    border-radius: 10px;
    .mint-msgbox-header {
      display: none;
    }
    .mint-msgbox-content {
      padding: 50px 52px;
      .mint-msgbox-message {
        text-align: left;
        font-size: 30px;
        color: #333333;
        line-height: 56px;
      }
    }
    .mint-msgbox-btns {
      height: 75px;
      .mint-msgbox-btn {
        font-size: 30px;
        line-height: 75px;
      }
      .mint-msgbox-cancel {
        color: #999999;
      }
      .mint-msgbox-confirm {
        color: #09cf74;
      }
    }
  }
}
</style>
