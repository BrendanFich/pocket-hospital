import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import Reserve from '@/components/Reserve/Reserve'
import Reserve2 from '@/components/Reserve/Reserve2'


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
    {
      path: '/reserve2',
      name: 'Reserve2',
      component: Reserve2
    },
  ]
})
