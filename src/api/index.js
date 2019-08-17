import Axios from 'axios'
import Store from '@/store/'
import router from 'vue-router'
import JSONBig from 'json-bigint'
// 转换最大安全数值
// Axios.defaults.transformResponse = [
//   (data) => {
//     // data 此时是后端的原始数据
//     return JSONBig.parse(data)
//   }
// ]
Axios.defaults.transformResponse = [
  (data) => {
    // data 此时是后端的原始数据
    // data 后台如果没有返回数据  值null
    // JSONBig.parse(null) 报错  阻止程序运行
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }
]
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
Axios.interceptors.request.use(function (config) {
  // 修改config
  if (window.location.hash === '#/login') return config
  config.headers.common = {
    Authorization: `Bearer ${Store.getUser()}`
  }
  return config
}, (error) => {
  // 错误处理
  return Promise.reject(error)
})
// 响应拦截器：在每次响应后 做某一些事情
Axios.interceptors.response.use((res) => {
  // 成功的时候做一些事情
  return res
}, (err) => {
  // 失败的时候做一些事情
  // 获取响应状态码 err对象包含响应对象  err.response
  // 响应对象中包含状态码  err.response.status
  if (err.response.status === 401) {
    // 跳转到登录页面 this.$router.push('/login')
    // 方式1：
    // $router.push('/login') 其实 地址栏改成  #/login
    // location.hash = '#/login'
    // 方式2：
    // 此时没有vue实例，$router对象获取不到，通过router实例直接使用
    router.push('/login')
  }
  return Promise.reject(err)
})

export default Axios
