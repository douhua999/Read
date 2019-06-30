import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue'
import login from '@/components/login.vue'
import reg from '@/components/reg.vue'
import cart from '@/components/cart.vue'
import details from '@/components/details.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/details/:pid',
      name: 'details',
      component: details,
      props:true
    },
  ]
})
