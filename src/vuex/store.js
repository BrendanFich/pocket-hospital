import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)
let state = {
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
