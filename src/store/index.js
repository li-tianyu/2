export default {
  // 储存的时候用的是JSOM字符串
  setUser (data) {
    window.sessionStorage.setItem('user', JSON.stringify(data))
  },
  // 获取时转换成JSON格式，一定要return返回结果
  getUser () {
    return JSON.parse(window.sessionStorage.getItem('user'))
  },
  // 删除
  clearUser () {
    window.sessionStorage.removeItem('user')
  }
}
