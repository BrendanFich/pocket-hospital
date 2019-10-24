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
    beginTime: '',
    endTime: '',
    price: ''
  },
  mutations: {
    updateUserInfo (state) {
      util.http.post('/api/user/user_info').then(res => {
        console.log('-----------获取用户信息-----------')
        console.log(res)
        state.userInfo = res.data
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
    },
    changeBeginTime (state, beginTime) {
      state.beginTime = beginTime
    },
    changeEndTime (state, endTime) {
      state.endTime = endTime
    }
  }
})
