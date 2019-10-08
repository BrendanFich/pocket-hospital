import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDept: '',
    selectedDoc: '',
    selectedDate: '',
    selectedTime: ''
  },
  mutations: {
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
