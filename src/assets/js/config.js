export const apiBaseUrl = process.env.NODE_ENV === 'production' ? 'http://' + window.location.host : 'http://wx.gdqlyt.com.cn'
export const authUrl = process.env.NODE_ENV === 'production' ? 'http://' + window.location.host + '/api/user/wx_authorize' : 'http://wx.gdqlyt.com.cn/api/user/wx_authorize'

export const latitude = 23.090656
export const longitude = 113.1795
export const hospitalName = '盐步医院(测试地址)'
export const address = '盐步医院(测试地址)'
