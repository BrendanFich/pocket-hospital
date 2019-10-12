import axios from 'axios'
const BaseUrl = 'http://qlyt.vicp.net:8197'
let http = {}
http.ajax = axios.create()
// 接口都是post
// http.get = function (url, data) {
//   return new Promise((resolve, reject) => {
//     http.ajax.get(BaseUrl + url, data || {}).then((res) => {
//       if (res.status === 200) {
//         resolve(res.data)
//       } else {
//         reject(res.status)
//       }
//     }).catch((error) => {
//       reject(error)
//     })
//   })
// }
http.ajax.interceptors.request.use(config => {
  if (localStorage.token) { config.headers.Authorization = localStorage.token }
  return config
}, error => {
  return Promise.reject(error)
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
// http.form = function (url, token) {
//   return new Promise((resolve, reject) => {
//     http.ajax.post(BaseUrl + url, {
//       headers: { 'Authorization': token }
//     }).then((res) => {
//       if (res.status === 200) {
//         resolve(res.data)
//       } else {
//         reject(res.status)
//       }
//     }).catch((error) => {
//       reject(error)
//     })
//   })
// }

// 获取url中参数
function getUrlParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

export default {
  http,
  getUrlParam
}
