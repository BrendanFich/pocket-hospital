import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)
let state = {
  _axiosPromiseCancel: [],
  doctorCode: '',
  doctorName: '',
  timeFlag: '',
  beginTime: '',
  endTime: '',
  Price: '',
  area: '',
  deptCode: '',
  deptName: ''
}

export default new Vuex.Store({
  state,
  mutations
})
