import Vue from 'vue'
import Router from 'vue-router'
import { firebaseAuth } from '@/fb'

Vue.use(Router)

const routes = [
  {
    path: '/pages',
    component: () => import('@/views/pages/Index.vue'),
    children: [
      {
        name: 'Lock',
        path: 'lock',
        component: () => import('@/views/pages/Lock.vue'),
      },
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/pages/Login.vue'),
      },
      {
        name: 'Pricing',
        path: 'pricing',
        component: () => import('@/views/pages/Pricing.vue'),
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
    meta: { requiresAuth: true },
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
      {
        name: 'Settings',
        path: 'settings',
        redirect: 'settings/general',
        component: () => import('@/views/dashboard/Settings/Settings.vue'),
        children: [
          {
            name: 'General Settings',
            path: 'general',
            component: () =>
              import(
                '@/views/dashboard/Settings/components/SettingsGeneral.vue'
              ),
          },
          {
            name: 'Account Settings',
            path: 'account',
            component: () =>
              import(
                '@/views/dashboard/Settings/components/SettingsAccount.vue'
              ),
          },
          {
            name: 'Appearance Settings',
            path: 'appearance',
            component: () =>
              import(
                '@/views/dashboard/Settings/components/SettingsAppearance.vue'
              ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/views/pages/Index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        name: '404 Error',
        path: '',
        component: () => import('@/views/pages/Error.vue'),
      },
    ],
  },
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuth = firebaseAuth.currentUser
  if (requiresAuth && !isAuth) {
    next('/pages/login')
  } else {
    next()
  }
})

export default router
