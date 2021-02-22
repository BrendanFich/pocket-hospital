import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)
let state = {
  _axiosPromiseCancel: [],
  defaultCardNo: '',
  defaultCardPatName: '',
  defaultCardPatIdNo: '',
  defaultCardNation: '',
  defaultCardPatSex: '',
  defaultCardPatMobile: '',
  defaultCardAddressDetail: '',
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
  autoFreshQrcode: '',
  visitCardBanding: ''
}

export default new Vuex.Store({
  state,
  mutations
})
