// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI, { Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import '@/assets/js/rem'
import wxsdk from '@/assets/js/wxsdk'
import util from '@/assets/js/util'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './vuex'
import VConsole from 'vconsole'
const vConsole = new VConsole()
console.log(vConsole.version)
Vue.use(VueAwesomeSwiper)
Vue.use(MintUI)

Vue.prototype.http = util.http
Vue.prototype.getUrlParam = util.getUrlParam
Vue.prototype.wxsdk = wxsdk
// 等接口，获取js-sdk
// wxsdk.initConfig('http://qlyt.vicp.net:8197')
// wxsdk.initConfig(location.href.split('#')[0])
Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   // 进入每个页面时都需要判断是否为微信浏览器
//   console.log('嘿嘿')
//   next()
// })
router.beforeEach((to, from, next) => {
  Indicator.close()
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
