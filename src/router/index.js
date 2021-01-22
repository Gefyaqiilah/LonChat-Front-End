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
import ListChat from '../components/module/chat/list-chat/ListChat.vue'
import Profile from '../components/module/chat/profile/Profile.vue'
import LeafletMaps from '../components/module/maps/Maps.vue'
import LandingPage from '../components/module/landing-page/LandingPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/landing-page',
    name: 'LandingPage',
    component: LandingPage,
    meta: { requiresVisitor: true }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/landing-page',
    meta: { requiresAuth: true },
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
    meta: { requiresVisitor: true },
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
    path: '/maps',
    name: 'Maps',
    component: LeafletMaps
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.checkAccessToken) {
      next({
        path: '/auth/login'
      })
    } else {
      next()
    }
  }
  if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.checkAccessToken) {
      next({
        path: '/list-chat'
      })
    } else {
      next()
    }
  }
  // else
  next()
})
export default router
