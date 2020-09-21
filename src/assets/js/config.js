let temp = window.location.href.split('#')[0]
temp = temp.substring(0, temp.length - 1)
export const apiBaseUrl = process.env.NODE_ENV === 'production' ? temp : 'http://dzyy.zhangfb.cn/weixin'
export const authUrl = process.env.NODE_ENV === 'production' ? temp + '/api/user/wx_authorize' : 'http://dzyy.zhangfb.cn/weixin/api/user/wx_authorize'

export const latitude = 23.05101
export const longitude = 112.463829
export const hospitalName = '肇庆市端州区人民医院'
export const address = '广东省肇庆市端州区城北路与宝月路交叉路口西南侧'
