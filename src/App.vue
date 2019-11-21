<template>
  <div id="app">
    <router-view v-if="$store.state.userInfo !== {}"/>
  </div>
</template>

<script>
import util from '@/assets/js/util'
import config from '@/assets/js/config'
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
    this.wxAuth()
    let wxSign = window.localStorage.getItem('wxSign')
    let _this = this
    if (wxSign) {
      wx.config({
        debug: false,
        appId: config.appId,
        timestamp: wxSign.split('&')[0],
        nonceStr: wxSign.split('&')[1],
        signature: wxSign.split('&')[2],
        jsApiList: ['openLocation', 'getLocation', 'updateAppMessageShareData', 'chooseWXPay']
      })
      wx.error(function (res) {
        if (res.errMsg.includes('invalid signature')) {
          if (_this.count < 1) {
            _this.getSign()
            _this.count++
          }
        }
      })
    } else {
      this.getSign()
    }
    this.$store.commit('updateUserInfo')

    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  methods: {
    wxAuth () {
      if (this.getUrlParam('token')) {
        window.localStorage.setItem('token', this.getUrlParam('token'))
        window.location.href = window.location.href.split('?')[0]
      }

      util.http
        .post('/api/user/vx_perpare', {
          getMode: 'authorize'
        })
        .then(res1 => {
          util.http.post('/api/user/vx_info').then(res2 => {
            if (res2.code === 401) {
              window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res1.data.appid + '&redirect_uri=' + res1.data.redirect_uri + '&response_type=' + res1.data.response_type + '&scope=' + res1.data.scope + '&state=' + res1.data.state + res1.data.wechat_redirect
            }
          }).catch((error) => {
            console.log(error)
          })
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
            appId: config.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signtrue,
            jsApiList: ['openLocation', 'getLocation', 'updateAppMessageShareData']
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
