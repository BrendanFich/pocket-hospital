import util from '@/assets/js/util'
// import { Toast } from 'mint-ui'

const mutations = {
  updateDefaultCard (state, visitName, visitCardNo, socialCardNo) {
    state.visitName = visitName
    state.visitCardNo = visitCardNo
    state.socialCardNo = socialCardNo
  },
  updateUserPatInfo (state) {
    util.http
      .post('/api/pat/pat_info')
      .then(res => {
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
          state.userInfo = res.data.info
        }).catch((error) => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
  },
  updateDoctorCode (state, doctorCode) {
    state.doctorCode = doctorCode
  },
  updateDoctorName (state, doctorName) {
    state.doctorName = doctorName
  },
  updateTimeFlag (state, timeFlag) {
    state.timeFlag = timeFlag
  },
  updateBeginTime (state, beginTime) {
    state.beginTime = beginTime
  },
  updateEndTime (state, endTime) {
    state.endTime = endTime
  },
  updatePrice (state, Price) {
    state.Price = Price
  },
  updateArea (state, area) {
    state.area = area
  },
  updateDeptCode (state, deptCode) {
    state.deptCode = deptCode
  },
  updateDeptName (state, deptName) {
    state.deptName = deptName
  }
}

export default mutations
