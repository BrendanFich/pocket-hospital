// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import './utils/rem'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import store from './vuex'

process.env.MOCK && require('@/mock')
Vue.prototype.$axios = axios

Vue.use(VueAwesomeSwiper)

Vue.use(MintUI)
Vue.config.productionTip = false

/*
router.beforeEach((to, from, next) => {
  // // 网页授权之获取code
  // const code = getUrlParam("code"),
  //   openId = window.localStorage.getItem("openId");
  // if (!openId && !code) {
  //   const appid = "wxd8de5e3e19b318ee",
  //     url = encodeURIComponent(location.href.split('#')[0]);
  //   window.location.href = 'http://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  // }
  // //获取url中参数
  // function getUrlParam(name) {
  //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //   var r = window.location.search.substr(1).match(reg);
  //   if (r != null) return decodeURI(r[2]);
  //   return null;
  function getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null
  }
  let code = getUrlParam('code')

  if (sessionStorage.getItem('store')) {
    this.$store.replaceState(
      Object.assign(
        {},
        this.$store.state,
        JSON.parse(sessionStorage.getItem('store'))
      )
    )
  }
  console.log(code)
  // 获取url中参数
  const appid = 'wxd8de5e3e19b318ee'
  const url = encodeURIComponent('http://qlyt.vicp.net:8197/api/user/vx_login')
  if (!sessionStorage.getItem('code')) {
    window.location.href = 'http://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  }
})
*/
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
