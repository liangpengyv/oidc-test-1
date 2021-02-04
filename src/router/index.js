import Vue from 'vue'
import VueRouter from 'vue-router'
import {vuexOidcCreateRouterMiddleware} from 'vuex-oidc'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in-callback',
    name: 'SignInCallback',
    component: () => import(/* webpackChunkName: "sign-in-callback" */ '../views/oidc/SignInCallback'),
  },
  {
    path: '/sign-out-callback',
    name: 'SignOutCallback',
    component: () => import(/* webpackChunkName: "sign-out-callback" */ '../views/oidc/SignOutCallback'),
  },
  {
    path: '/oidc-silent-renew',
    name: 'OidcSilentRenew',
    component: () => import(/* webpackChunkName: "oidc-silent-renew" */ '../views/oidc/OidcSilentRenew'),
  },
  {
    path: '/oidc-callback-error',
    name: 'OidcCallbackError',
    component: () => import(/* webpackChunkName: "oidc-callback-error" */ '../views/oidc/OidcCallbackError'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'))

export default router
