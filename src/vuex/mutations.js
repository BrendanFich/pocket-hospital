const mutations = {
  updateDefaultCard (state, visitName, visitCardNo, socialCardNo) {
    state.visitName = visitName
    state.visitCardNo = visitCardNo
    state.socialCardNo = socialCardNo
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
  },
  clearRegInfo (state) {
    state.doctorCode = ''
    state.doctorName = ''
    state.timeFlag = ''
    state.beginTime = ''
    state.endTime = ''
    state.Price = ''
    state.area = ''
    state.deptCode = ''
    state.deptName = ''
    state._axiosPromiseCancel = []
  },
  changePage (state, cancel) {
    state._axiosPromiseCancel = [...state._axiosPromiseCancel, cancel]
  }
}

export default mutations
