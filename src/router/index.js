import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index/index.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/index/index.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "about" */ '../views/setting/index.vue')
  },
  {
    path: '/editWxNum',
    name: 'editWxNum',
    component: () => import(/* webpackChunkName: "about" */ '../views/setting/editWxNum.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
