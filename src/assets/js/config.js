export const apiBaseUrl = process.env.NODE_ENV === 'production' ? window.location.href.split('#')[0].substring(0, window.location.href.split('#')[0].length - 1) : 'http://www.dzqrmyy.cn/weixin'
export const authUrl = process.env.NODE_ENV === 'production' ? window.location.href.split('#')[0].substring(0, window.location.href.split('#')[0].length - 1) + '/api/user/wx_authorize' : 'http://www.dzqrmyy.cn/weixin/api/user/wx_authorize'

// export const latitude = 23.05101
// export const longitude = 112.463829
// export const hospitalName = '肇庆市端州区人民医院'
// export const address = '广东省肇庆市端州区城北路与宝月路交叉路口西南侧'
