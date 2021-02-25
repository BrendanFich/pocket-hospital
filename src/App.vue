<template>
  <div id="app">
    <Header />
    <router-view class="middleContent" v-if="show"></router-view>
    <Tabbar />
  </div>
</template>

<script>
import { authUrl } from '@/assets/js/config'
import BackButton from '@/base/BackButton/BackButton'
import Tabbar from '@/base/Tabbar/Tabbar'
import Header from '@/base/Header/Header'
import VConsole from 'vconsole'
let vConsole = ''
export default {
  name: 'App',
  components: { BackButton, Header, Tabbar },
  data () {
    return {
      timestamp: '',
      nonceStr: '',
      signature: '',
      count: 0,
      debug: false,
      show: false
    }
  },
  async created () {
    if (this.getUrlParam('token')) {
      window.localStorage.setItem('token', this.getUrlParam('token'))
      window.location.href = window.location.href.split('?')[0]
    }
    if (this.getUrlParam('msg')) {
      let errorMsg = decodeURIComponent(this.getUrlParam('msg'))
      this.$dialog.confirm({
        title: '登录失败',
        message: errorMsg
      }).then(() => {
        window.location.href = authUrl
      }).catch(() => {
        window.location.href = authUrl
      })
    } else {
      window.location.href = window.location.href.split('?')[0]
      let wxSign = window.localStorage.getItem('wxSign')
      let self = this
      await this.getConfig()
      if (wxSign) {
        this.$wx.config({
          debug: this.debug,
          appId: wxSign.split('&')[0],
          timestamp: wxSign.split('&')[1],
          nonceStr: wxSign.split('&')[2],
          signature: wxSign.split('&')[3],
          jsApiList: [
            'openLocation',
            'getLocation',
            'updateAppMessageShareData',
            'chooseWXPay',
            'chooseImage',
            'getLocalImgData'
          ]
        })
        this.$wx.error(function (res) {
          if (
            res.errMsg.includes('invalid signature') ||
            res.errMsg.includes('config:fail')
          ) {
            if (self.count < 1) {
              self.getSign()
              self.count++
            }
          }
        })
      } else {
        this.getSign()
      }
      this.show = await this.setDefaultCard()
      console.log(this.$store.state, '=============')
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
    getConfig () {
      return new Promise((resolve, reject) => {
        this.$post('/api/web/config')
          .then(res => {
            document.title = res.data.web_title
            this.$store.commit('setLocation', res.data)
            this.$store.commit('setHealthCardBaseUrl', res.data.gdcard_url)
            this.$store.commit('setAutoFreshQrcode', res.data.auto_fresh_qrcode)
            this.$store.commit('setVisitCardBanding', res.data.visitCardBanding ? res.data.visitCardBanding : '0')
            this.debug = res.data.is_debug
            if (res.data.is_debug) {
              vConsole = new VConsole()
              console.log(vConsole.version)
            }
            resolve()
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    setDefaultCard () {
      return new Promise((resolve, reject) => {
        this.$post('/api/user/vx_info')
          .then(res => {
            if (res.data.info.visitCardNo) {
              let index = res.data.info.pat_list.findIndex(i => {
                return i.visitCardNo === res.data.info.visitCardNo
              })
              console.log(index > -1 ? res.data.info.pat_list[index] : {})
              this.$store.commit('setDefaultCard', index > -1 ? res.data.info.pat_list[index] : {})
            }
            resolve(true)
          })
          .catch(error => {
            console.log(error)
            resolve(true)
          })
      })
    },
    getSign () {
      this.$post('/api/user/vx_sign', { url: location.href.split('#')[0] })
        .then(res => {
          window.localStorage.setItem(
            'wxSign',
            [
              res.data.appId,
              res.data.timestamp,
              res.data.nonceStr,
              res.data.signature
            ].join('&')
          )
          this.$wx.config({
            debug: this.debug,
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'openLocation',
              'getLocation',
              'updateAppMessageShareData',
              'chooseWXPay',
              'chooseImage',
              'getLocalImgData'
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

<style lang="sass">
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input
  margin: 0
  padding: 0
  border: 0
  font-size: 100%
  font-weight: normal
  vertical-align: baseline

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, menu, nav, section
  display: block

body
  line-height: 1

blockquote, q
  quotes: none

blockquote:before, blockquote:after,
q:before, q:after
  content: none
table
  border-collapse: collapse
  border-spacing: 0

/* custom */
a
  color: #7e8c8d
  text-decoration: none
  -webkit-backface-visibility: hidden

li
  list-style: none
::-webkit-scrollbar
  width: 5px
  height: 5px

::-webkit-scrollbar-track-piece
  background-color: rgba(0, 0, 0, 0.2)
  -webkit-border-radius: 6px

::-webkit-scrollbar-thumb:vertical
  height: 5px
  background-color: rgba(125, 125, 125, 0.7)
  -webkit-border-radius: 6px

::-webkit-scrollbar-thumb:horizontal
  width: 5px
  background-color: rgba(125, 125, 125, 0.7)
  -webkit-border-radius: 6px

html, body
  width: 100%

body
  -webkit-text-size-adjust: none
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
#app
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif
  width: 750px
.icons-warp
  border-radius: 50px
  .float-icon-item
    border-radius: 50px
    display: flex
    align-items: center
    justify-content: center
    position: relative
    width: 100px
    height: 100px
    border: none
body
  -webkit-text-size-adjust: 100% !important
  text-size-adjust: 100% !important
  -moz-text-size-adjust: 100% !important
  .van-toast
    padding: 10px 15px
    border-radius: 10px
  .van-dialog__confirm .van-button__text
    color: $color-primary
  .noData
    width: 366px
    margin: 100px 0  0 200px
  .van-sidebar-item--select
    background: $color-primary
    border: none
  .van-sidebar-item
    padding: 13px
</style>
