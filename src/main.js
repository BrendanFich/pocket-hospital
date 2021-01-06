import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import '@/assets/js/rem'
import wx from 'weixin-js-sdk'
import util from '@/assets/js/util'
import store from './vuex/store'

import {
  NavBar,
  PullRefresh,
  List,
  Cell,
  CellGroup,
  Dialog,
  Row,
  Col,
  Search,
  Tag,
  Rate,
  Icon,
  Button,
  Toast,
  Field,
  TreeSelect,
  Sidebar,
  SidebarItem,
  Tab,
  Tabs,
  Calendar,
  Switch
} from 'vant'

Vue.use(MintUI)
Vue.use(NavBar)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
Vue.use(Search)
Vue.use(Tag)
Vue.use(Rate)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Field)
Vue.use(TreeSelect)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Calendar)
Vue.use(Switch)

Toast.setDefaultOptions('loading', { forbidClick: true, message: '', loadingType: 'spinner', duration: 0 })
Toast.setDefaultOptions('fail', { forbidClick: true, duration: 1000 })
Toast.setDefaultOptions('success', { forbidClick: true, duration: 1500 })
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
Vue.prototype.$post = util.http.post
Vue.prototype.$wx = wx

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  Dialog.close()
  store.state._axiosPromiseCancel.forEach(e => {
    e && e()
  })
  store._axiosPromiseCancel = []
  // Indicator.close()

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
