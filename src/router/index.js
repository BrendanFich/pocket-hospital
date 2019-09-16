import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import Reserve from '@/components/Reserve/Reserve'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/reserve',
      name: 'Reserve',
      component: Reserve
    },
  ]
})
