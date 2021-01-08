import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)
let state = {
  _axiosPromiseCancel: [],
  defaultCard: {},
  doctorCode: '',
  doctorName: '',
  timeFlag: '',
  beginTime: '',
  endTime: '',
  Price: '',
  area: '',
  deptCode: '',
  deptName: '',
  gpsAddress: '',
  gpsLatitude: '',
  gpsLongitude: '',
  gpsName: '',
  healthCardBaseUrl: '',
  autoFreshQrcode: ''
}

export default new Vuex.Store({
  state,
  mutations
})
