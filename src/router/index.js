import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Auth from '../views/auth/Auth.vue'
import Register from '../components/module/auth/Register.vue'
import Login from '../components/module/auth/Login.vue'
import ForgotPassword from '../components/module/auth/ForgotPassword.vue'
import ConfirmPassword from '../components/module/auth/ConfirmPassword.vue'
import store from '../store/index'
import ConfirmCode from '../components/module/auth/ConfirmCode.vue'
import ListChat from '../components/module/chat/ListChat.vue'
import Profile from '../components/module/chat/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/list-chat',
    children: [
      {
        path: 'list-chat',
        name: 'ListChat',
        component: ListChat
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    children: [
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
      },
      {
        path: 'confirm-password',
        name: 'ConfirmPassword',
        component: ConfirmPassword,
        meta: { requiresForgotPasswordCode: true }
      },
      {
        path: 'confirm-code',
        name: 'ConfirmCode',
        component: ConfirmCode,
        meta: { requiresForgotPasswordCode: true }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresForgotPasswordCode)) {
    if (!store.getters.checkForgotPassword) {
      next({
        path: '/auth/forgot-password'
      })
    } else {
      next()
    }
  }
  // else
  next()
})
export default router
