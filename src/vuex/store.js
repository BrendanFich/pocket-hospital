import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)
let state = {
  userInfo: {},
  patList: [],
  visitCardNo: '',
  visitName: '',
  socialCardNo: '',
  patInfoBinded: [],
  patInfoNobind: [],
  selectedDeptCode: '',
  selectedDeptName: '',
  selectedDocCode: '',
  selectedDocName: '',
  selectedDate: '',
  selectedTime: '',
  beginTime: '',
  endTime: '',
  price: '',
  timeFlag: ''
}

export default new Vuex.Store({
  state,
  mutations
})
