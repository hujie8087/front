import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b83e575c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _6ef50b4a = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _4b8d9d8a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/login",
      component: _b83e575c,
      name: "login"
    }, {
      path: "/register",
      component: _6ef50b4a,
      name: "register"
    }, {
      path: "/",
      component: _4b8d9d8a,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
