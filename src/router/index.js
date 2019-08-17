import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/'

// 一级路由
import Login from '@/views/login/' // 登陆页面
import Home from '@/views/home/' // 页面
import notFound from '@/views/notFound/'

// 二级路由
import welCome from '@/views/home/welcome/'
import Article from '@/views/home/article/'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: welCome },
        { path: '/article', name: 'article', component: Article }
      ]
    },
    { path: '*', name: '404', component: notFound }
  ]
})
router.beforeEach((to, from, next) => {
  if (!store.getUser() && to.path !== '/login') return next('/login')
  next()
})

export default router
