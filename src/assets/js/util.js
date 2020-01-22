import axios from 'axios'
import moment from 'moment'
import store from '@/vuex/store'
import { apiBaseUrl, authUrl } from './config'
import { Toast } from 'vant'
let http = {}
const CancelToken = axios.CancelToken
http.ajax = axios.create()

// 请求超时时间
http.ajax.defaults.timeout = 35000

// 请求拦截
http.ajax.interceptors.request.use(
  config => {
    // 切换页面时，中断之前页面的请求
    config.cancelToken = new CancelToken(cancel => {
      store.commit('changePage', cancel)
    })
    Toast.loading()
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
    Toast.clear()
    if (res.data.code === 401) {
      localStorage.removeItem('token')

      if (process.env.NODE_ENV === 'production') {
        window.location.href = authUrl
      } else {
        Toast({
          message: 'token过期',
          duration: 1000,
          className: 'toast'
        })
      }
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
    Toast.clear()
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
    if (http.ajax.isCancel(err)) {
      // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
      return new Promise(() => {})
    } else {
      return Promise.reject(err)
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
