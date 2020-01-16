import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import '@/assets/js/rem'
import wxsdk from '@/assets/js/wxsdk'
import util from '@/assets/js/util'
import store from './vuex/store'
import moment from 'moment'
import {
  NavBar,
  PullRefresh,
  List,
  Cell,
  Dialog,
  Row,
  Col,
  Search,
  Tag,
  Rate
} from 'vant'

import VConsole from 'vconsole'
const vConsole = new VConsole()
console.log(vConsole.version)

Vue.use(MintUI)
Vue.use(NavBar)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
Vue.use(Search)
Vue.use(Tag)
Vue.use(Rate)

Vue.prototype.$post = util.http.post
Vue.prototype.wxsdk = wxsdk

moment.locale('zh-cn')

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  store.state._axiosPromiseCancel.forEach(e => {
    e && e()
  })
  store._axiosPromiseCancel = []
  // Indicator.close()
  switch (to.name) {
    case 'index':
      document.title = '首页'
      break
    case 'hospitalInfo':
      document.title = '医院信息'
      break
    case 'doctorIntro':
      document.title = '医生介绍'
      break
    case 'reportsKind':
      document.title = '报告查询'
      break
    case 'examination':
      document.title = '检查报告'
      break
    case 'bodyExam':
      document.title = '检验报告'
      break
    case 'drugIndex':
    case 'drugSearchPage':
      document.title = '药品查询'
      break
    case 'serverIndex':
    case 'ServerSearchPage':
      document.title = '医疗服务查询'
      break
    case 'parking':
      document.title = '车位查询'
      break
    case 'suggestion':
      document.title = '意见提交'
      break
    case 'nav':
      document.title = '住院服务'
      break
    case 'sSymptom':
      document.title = '智能导诊'
      break
    case 'cConfirm':
      document.title = '就诊报到'
      break
    case 'sDept':
      document.title = '选择科室'
      break
    case 'sDayDoc':
      document.title = '选择医生'
      break
    case 'sTime':
    case 'gSTime':
      document.title = '选择时间'
      break
    case 'confirm':
      document.title = '确认挂号信息'
      break
    case 'iHospital':
      document.title = '互联网医院'
      break
    case 'mine':
      document.title = '个人中心'
      break
    case 'cardManage':
      document.title = '就诊卡管理'
      break
    case 'bindCard':
      document.title = '就诊卡绑定'
      break
    case 'regOrder':
      document.title = '挂号订单'
      break
    case 'unpaid':
    case 'paid':
    case 'outOrderInfo':
      document.title = '缴费订单'
      break
    case 'reportDetail':
      document.title = '报告详情'
      break
    case 'cardInfo':
      document.title = '就诊卡信息'
      break
    default:
      document.title = '掌上医院'
  }
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
