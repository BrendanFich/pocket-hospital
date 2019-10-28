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
      signature: ''
    }
  },
  created () {
    // 获取微信SDK配置签名
    this.getSign()
    // 用户登录，将用户信息存至store
    // if (this.getUrlParam('token')) {
    //   window.localStorage.setItem('token', this.getUrlParam('token'))
    // }
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
    getSign () {
      util.http
        .post('/api/user/vx_sign', { url: location.href.split('#')[0] })
        .then(res => {
          console.log(res)
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
