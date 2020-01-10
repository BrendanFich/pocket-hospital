import Vue from 'vue'
import MintUI, { Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import '@/assets/js/rem'
import wxsdk from '@/assets/js/wxsdk'
import util from '@/assets/js/util'
import 'swiper/dist/css/swiper.css'
import store from './vuex/store'
import moment from 'moment'
import { NavBar, PullRefresh, List, Cell } from 'vant'

import VConsole from 'vconsole'
const vConsole = new VConsole()
console.log(vConsole.version)

Vue.use(MintUI)
Vue.use(NavBar)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)

Vue.prototype.$post = util.http.post
Vue.prototype.wxsdk = wxsdk

moment.locale('zh-cn')

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  Indicator.close()
  switch (to.fullPath) {
    case '/index' :
      document.title = '首页'
      break

    case '/reserve/sDept' :
      document.title = '选择科室'
      break
    case '/reserve/sDayDoc' :
      document.title = '选择医生'
      break
    case '/reserve/sTime' :
      document.title = '选择时间'
      break
    case '/reserve/confirm' :
      document.title = '选择挂号信息'
      break
    case '/iHospital' :
      document.title = '互联网医院'
      break

    case '/mine' :
      document.title = '个人中心'
      break
    case '/mine/cardManage' :
      document.title = '就诊卡管理'
      break
    case '/mine/cardManage/bindCard' :
      document.title = '就诊卡绑定'
      break
    default:
      document.title = '掌上医院'
  }
  // console.log(to.fullPath)
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
