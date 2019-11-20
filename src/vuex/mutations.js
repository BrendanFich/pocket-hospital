import util from '@/assets/js/util'
const mutations = {
  updateUserInfo (state) {
    util.http.post('/api/user/vx_info').then(res => {
      state.userInfo = res.data.info
      state.visitCardNo = res.data.info.visitCardNo
      state.visitName = res.data.info.visitName
      state.socialCardNo = res.data.info.socialCardNo
    }).catch((error) => {
      console.log(error)
    })
  },
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
  },
  changeTimeFlag (state, timeFlag) {
    state.timeFlag = timeFlag
  }
}

export default mutations
