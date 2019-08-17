import Vue from 'vue'
import App from './App.vue'

// 路由
import router from '@/router/'

// element-ui模块
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 组件拆分
import Components from '@/components/'

// axios模块
import Axios from '@/api/'
// 全局样式
import '@/style/index.less'

Vue.prototype.$http = Axios

// 注册vue.use
Vue.use(ElementUi)
Vue.use(Components)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
