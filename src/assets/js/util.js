import axios from 'axios'
import moment from 'moment'
import { Indicator, Toast } from 'mint-ui'
const BaseUrl = 'http://yun.gdqlyt.com.cn:8197'
let http = {}
http.ajax = axios.create()

// 请求拦截
http.ajax.interceptors.request.use(config => {
  Indicator.open()
  if (localStorage.token) { config.headers.Authorization = localStorage.token }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
http.ajax.interceptors.response.use(res => {
  Indicator.close()
  if (res.data.code === 401) {
    localStorage.removeItem('token')
    Toast({
      message: 'token过期,重新登录',
      duration: 1000,
      className: 'toast'
    })
    window.location.href = 'http://yun.gdqlyt.com.cn/api/user/wx_authorize'
  }
  return res
}, err => {
  console.log('err', err.response)
  return Promise.reject(err)
})

// post
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

// 获取url的param
const getUrlParam = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

// 时间比较
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
