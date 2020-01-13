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
  switch (to.name) {
    case 'index' :
      document.title = '首页'
      break

    case 'sDept' :
      document.title = '选择科室'
      break
    case 'sDayDoc' :
      document.title = '选择医生'
      break
    case 'sTime' :
      document.title = '选择时间'
      break
    case 'confirm' :
      document.title = '选择挂号信息'
      break
    case 'iHospital' :
      document.title = '互联网医院'
      break
    case 'mine' :
      document.title = '个人中心'
      break
    case 'cardManage' :
      document.title = '就诊卡管理'
      break
    case 'bindCard' :
      document.title = '就诊卡绑定'
      break
    case 'regOrder' :
      document.title = '挂号订单'
      break
    case 'unpaid' :
    case 'paid' :
    case 'outOrderInfo':
      document.title = '缴费订单'
      break
    case 'cardInfo' :
      document.title = '就诊卡信息'
      break
    default:
      document.title = '掌上医院'
  }
  console.log(to.name)
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
