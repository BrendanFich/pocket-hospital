import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    patInfo: [],
    selectedDept: '',
    selectedDoc: '',
    selectedDate: '',
    selectedTime: ''
  },
  mutations: {
    updateUserInfo (state) {
      util.http.post('/api/user/user_info').then(res => {
        state.userInfo = res.data
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    },
    updateUserPatInfo (state, patInfo) {
      state.patInfo = patInfo
    },
    changeDept (state, dept) {
      state.selectedDept = dept
    },
    changeDoc (state, doc) {
      state.selectedDoc = doc
    },
    changeDate (state, date) {
      state.selectedDate = date
    },
    changeTime (state, time) {
      state.selectedTime = time
    }
  }
})
