import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
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
    price: ''
  },
  mutations: {
    updateUserInfo (state) {
      util.http.post('/api/user/vx_info').then(res => {
        console.log('-----------获取用户信息/api/user/vx_info-----------')
        console.log(res)
        state.userInfo = res.data.info
      }).catch((error) => {
        console.log(error)
      })
    },
    updateUserPatInfo (state) {
      util.http
        .post('/api/pat/pat_info')
        .then(res => {
          console.log('----------获取患者信息-----------')
          console.log(res)
          state.patInfoNobind = res.data.filter(item => (item.visitCardNo === '') && (item.socialHosCardNO === ''))
          let patInfoContent = []
          res.data.filter(item => (item.visitCardNo !== '') || (item.socialHosCardNO !== '')).forEach((item) => {
            if (item.visitCardNo && !item.socialHosCardNO) {
              patInfoContent.push(item)
            }
            if (!item.visitCardNo && item.socialHosCardNO) {
              patInfoContent.push(item)
            }
            if (item.visitCardNo && item.socialHosCardNO) {
              let temp = item.socialHosCardNO
              item.socialHosCardNO = ''
              patInfoContent.push(item)
              let newItem = Object.assign({}, item)
              newItem.socialHosCardNO = temp
              newItem.visitCardNo = ''
              patInfoContent.push(newItem)
            }
          })
          state.patInfoBinded = patInfoContent
          util.http.post('/api/user/vx_info').then(res => {
            console.log('-----------获取用户信息/api/user/vx_info-----------')
            console.log(res)
            state.userInfo = res.data.info
          }).catch((error) => {
            console.log(error)
          })
        })
        .catch(error => {
          console.log(error)
        })
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
