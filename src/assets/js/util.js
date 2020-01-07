import axios from 'axios'
import moment from 'moment'
import { Indicator, Toast } from 'mint-ui'
import { apiBaseUrl, authUrl } from './config'
let http = {}
http.ajax = axios.create()

// 请求超时时间
http.ajax.defaults.timeout = 20000

// 请求拦截
http.ajax.interceptors.request.use(
  config => {
    Indicator.open()
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
http.ajax.interceptors.response.use(
  res => {
    Indicator.close()
    if (res.data.code === 401) {
      localStorage.removeItem('token')
      Toast({
        message: 'token过期,重新登录',
        duration: 1000,
        className: 'toast'
      })
      window.location.href = authUrl
    } else if (res.data.code === 500) {
      Toast({
        message: res.data.msg,
        duration: 1000,
        className: 'toast'
      })
    }
    return res
  },
  err => {
    Indicator.close()
    console.error(err)
    // 若请求超时，再请求一次
    let originalRequest = err.config
    if (
      err.code === 'ECONNABORTED' &&
      err.message.indexOf('timeout') !== -1 &&
      !originalRequest._retry
    ) {
      Toast({
        message: '请求超时',
        duration: 1000,
        className: 'toast'
      })
      // originalRequest._retry = true
      // return axios.request(originalRequest)
    }
  }
)

// post
http.post = (url, data) => {
  return new Promise((resolve, reject) => {
    http.ajax
      .post(apiBaseUrl + url, data)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res.status)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 时间比较
const compareTime = pro => {
  return (obj1, obj2) => {
    let val1 = moment(obj1[pro], 'YYYY-MM-DD HH:mm:ss').valueOf()
    let val2 = moment(obj2[pro], 'YYYY-MM-DD HH:mm:ss').valueOf()
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
  compareTime
}
