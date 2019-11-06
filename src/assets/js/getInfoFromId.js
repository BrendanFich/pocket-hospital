export default {
  getBirth (idNum) {
    return idNum.substring(6, 10) + '-' + idNum.substring(10, 12) + '-' + idNum.substring(12, 14)
  },
  getSex (idNum) {
    return (parseInt(idNum.substr(16, 1)) % 2 === 1) ? '1' : '2'
    // return 1
  },
  getAge (idNum) {
    var myDate = new Date()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    var age = myDate.getFullYear() - idNum.substring(6, 10) - 1
    if ((idNum.substring(10, 12) < month || idNum.substring(10, 12) === month) && idNum.substring(12, 14) <= day) {
      age++
    }
    if (age <= 0) {
      age = 1
    }
    return age
  },
  getIdType (idNum) {
    return this.getAge(idNum) >= 18 ? '1' : '2'
  }
}
