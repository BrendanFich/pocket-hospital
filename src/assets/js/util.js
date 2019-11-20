import axios from 'axios'
import moment from 'moment'
import { Indicator } from 'mint-ui'
// const BaseUrl = 'http://qlyt.vicp.net:8197'
const BaseUrl = 'http://yun.gdqlyt.com.cn:8197'
let http = {}
http.ajax = axios.create()
// http.ajax.defaults.timeout = 10000
// 请求拦截，添加token至请求头
http.ajax.interceptors.request.use(config => {
  Indicator.open()
  if (localStorage.token) { config.headers.Authorization = localStorage.token }
  // console.log(config.headers.Authorization)
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截，判断token是否过期，过期则跳转，重新获取
http.ajax.interceptors.response.use(res => {
  Indicator.close()
  // token过期时
  // if ((res.code === 500 && res.msg.includes('读取用户数据失败')) || (res.code === 401 && res.msg.includes('没有相应内容'))) {

  if (res.code === 500) {
    localStorage.removeItem('token')
    window.location.href = 'http://yun.gdqlyt.com.cn'
  }
  return res
}, err => {
  // 对响应错误做些什么
  console.log('err', err.response) // 修改后
  console.log('跳转条件')
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

// 获取url中参数
function getUrlParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

function compareTime (pro) {
  return function (obj1, obj2) {
    var val1 = moment(obj1[pro], 'YYYY-MM-DD HH:mm:ss').valueOf()
    var val2 = moment(obj2[pro], 'YYYY-MM-DD HH:mm:ss').valueOf()
    if (val1 < val2) { // 正序
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
