import axios from 'axios'
import store from '@/vuex/store'
import { apiBaseUrl, authUrl } from './config'
import { Toast } from 'vant'

let http = {}
const CancelToken = axios.CancelToken
http.ajax = axios.create()

// 请求超时时间
http.ajax.defaults.timeout = 15000

// 请求拦截
http.ajax.interceptors.request.use(
  config => {
    // 切换页面时，中断之前页面的请求
    config.cancelToken = new CancelToken(cancel => {
      store.commit('changePage', cancel)
    })
    Toast.loading()
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    } else {
      process.env.NODE_ENV === 'production' ? (window.location.href = authUrl) : Toast({
        message: 'token过期',
        duration: 1500,
        className: 'toast'
      })
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
          duration: 1500,
          className: 'toast'
        })
      }
    } else if (res.data.code === 500) {
      if (!(res.request.responseURL.indexOf('getInPatInfo') > -1)) {
        Toast({
          message: res.data.msg,
          duration: 1500,
          className: 'toast'
        })
      }
    } else if (res.data.code === 404) {
      Toast({
        message: '出错了',
        duration: 1500,
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
  let reqUrl
  if (url.indexOf('http') !== -1) {
    reqUrl = url
  } else {
    reqUrl = apiBaseUrl + url
  }
  return new Promise((resolve, reject) => {
    http.ajax
      .post(reqUrl, data)
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
export default {
  http
}
