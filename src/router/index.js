import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Reserve1 from '@/views/Reserve1'
import Reserve2 from '@/views/Reserve2'
import Reserve3 from '@/views/Reserve3'
import Reserve4 from '@/views/Reserve4'

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
      path: '/reserve1',
      name: 'reserve1',
      component: Reserve1
    },
    {
      path: '/reserve2',
      name: 'reserve2',
      component: Reserve2
    },
    {
      path: '/reserve3',
      name: 'reserve3',
      component: Reserve3
    },
    {
      path: '/reserve4',
      name: 'reserve4',
      component: Reserve4
    }
  ]
})
