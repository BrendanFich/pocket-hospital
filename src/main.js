// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import './utils/rem'
import wxsdk from './utils/wxsdk'
import util from './utils/util'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './vuex'

process.env.MOCK && require('@/mock')

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
