
// 将所有的mock文件引入
require('@/mock/json/userInfo')
// 在这里可以做一些通用的配置

const Mock = require('mockjs')
// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
  timeout: 0 - 300
})

Mock.mock('/api/user/register', 'post', require('./json/userInfo'))
Mock.mock('/api/user/login', 'post', require('./json/userInfo'))
Mock.mock('/api/user/user_info', 'post', require('./json/userInfo'))
Mock.mock('/api/user/logout', 'post', require('./json/userInfo'))
