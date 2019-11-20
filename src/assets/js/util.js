import axios from 'axios'
import moment from 'moment'
import { Indicator } from 'mint-ui'
const BaseUrl = 'http://yun.gdqlyt.com.cn:8197'
let http = {}
http.ajax = axios.create()
http.ajax.interceptors.request.use(config => {
  Indicator.open()
  if (localStorage.token) { config.headers.Authorization = localStorage.token }
  return config
}, error => {
  return Promise.reject(error)
})

http.ajax.interceptors.response.use(res => {
  Indicator.close()

  if (res.code === 500) {
    localStorage.removeItem('token')
    window.location.href = 'http://yun.gdqlyt.com.cn'
  }
  return res
}, err => {
  console.log('err', err.response)
  return Promise.reject(err)
})

http.post = function (url, data) {
  return new Promise((resolve, reject) => {
    http.ajax.post(BaseUrl + url, data).then((res) => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.status)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

const getUrlParam = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

const compareTime = (pro) => {
  return function (obj1, obj2) {
    var val1 = moment(obj1[pro], 'YYYY-MM-DD HH:mm:ss').valueOf()
    var val2 = moment(obj2[pro], 'YYYY-MM-DD HH:mm:ss').valueOf()
    if (val1 < val2) {
      return 1
    } else if (val1 > val2) {
      return -1
    } else {
      return 0
    }
  }
}
export default {
  http,
  getUrlParam,
  compareTime
}
