import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    patInfo: [],
    selectedDeptCode: '',
    selectedDeptName: '',
    selectedDocCode: '',
    selectedDocName: '',
    selectedDate: '',
    selectedTime: '',
    price: ''
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
    setPrice (state, price) {
      state.price = price
    },
    changeDept (state, dept) {
      state.selectedDeptCode = dept.deptCode
      state.selectedDeptName = dept.deptName
    },
    changeDoc (state, doc) {
      state.selectedDocCode = doc.docCode
      state.selectedDocName = doc.docName
    },
    changeDate (state, date) {
      state.selectedDate = date
    },
    changeTime (state, time) {
      state.selectedTime = time
    }
  }
})
