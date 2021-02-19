import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/pages',
      component: () => import('@/views/pages/Index.vue'),
      children: [
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Login.vue'),
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index.vue'),
      children: [
        // Main Container
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard/Dashboard.vue'),
        },
        {
          name: 'Classes',
          path: 'classes',
          component: () => import('@/views/dashboard/Classes/Classes.vue'),
        },
        {
          name: 'Class',
          path: 'classes/:id',
          component: () => import('@/views/dashboard/Class/Class.vue'),
          props: true,
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index.vue'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error.vue'),
        },
      ],
    },
  ],
})
