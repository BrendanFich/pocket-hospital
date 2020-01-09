<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { appId, authUrl } from '@/assets/js/config'
import wx from 'weixin-js-sdk'

export default {
  name: 'App',
  data () {
    return {
      errorMsg: '',
      timestamp: '',
      nonceStr: '',
      signature: '',
      count: 0
    }
  },
  created () {
    if (this.getUrlParam('token')) {
      window.localStorage.setItem('token', this.getUrlParam('token'))
      console.log(this.getUrlParam('token'))
      window.location.href = window.location.href.split('?')[0]
    }
    if (this.getUrlParam('msg')) {
      this.errorMsg = decodeURIComponent(this.getUrlParam('msg'))
      console.log(this.errorMsg)
      this.$messagebox.alert(this.errorMsg, '登录失败')
        .then(action => {
          window.location.href = authUrl
        })
    } else {
      window.location.href = window.location.href.split('?')[0]
      let wxSign = window.localStorage.getItem('wxSign')
      let _this = this
      if (wxSign) {
        wx.config({
          debug: false,
          appId,
          timestamp: wxSign.split('&')[0],
          nonceStr: wxSign.split('&')[1],
          signature: wxSign.split('&')[2],
          jsApiList: [
            'openLocation',
            'getLocation',
            'updateAppMessageShareData',
            'chooseWXPay'
          ]
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
      this.TestToken()
    }

    if (localStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem('store'))
        )
      )
    }
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  methods: {
    TestToken () {
      this.$post('/api/user/vx_info').then(res => {
      }).catch((error) => {
        console.log(error)
      })
    },
    getSign () {
      this.$post('/api/user/vx_sign', { url: location.href.split('#')[0] })
        .then(res => {
          console.log(res)

          window.localStorage.setItem(
            'wxSign',
            [res.data.timestamp, res.data.nonceStr, res.data.signtrue].join('&')
          )
          wx.config({
            debug: false,
            appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'openLocation',
              'getLocation',
              'updateAppMessageShareData'
            ]
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

<style lang="scss">
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
