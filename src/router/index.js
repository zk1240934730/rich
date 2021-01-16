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
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/index.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/setting/index.vue')
  },
  {
    path: '/editWxNum',
    name: 'editWxNum',
    component: () => import(/* webpackChunkName: "editWxNum" */ '../views/setting/editWxNum.vue')
  },
  {
    path: '/wxTip',
    name: 'wxTip',
    component: () => import(/* webpackChunkName: "wxTip" */ '../views/setting/wxTip.vue')
  },
  {
    path: '/spread',
    name: 'spread',
    component: () => import(/* webpackChunkName: "spread" */ '../views/spread/index.vue')
  },
  {
    path: '/inviteUsers',
    name: 'inviteUsers',
    component: () => import(/* webpackChunkName: "inviteUsers" */ '../views/inviteUsers/index.vue')
  },
  {
    path: '/records',
    name: 'records',
    component: () => import(/* webpackChunkName: "records" */ '../views/inviteUsers/records.vue')
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/inviteUsers/orderList.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import(/* webpackChunkName: "team" */ '../views/team/index.vue')
  },
  {
    path: '/teamLevel',
    name: 'teamLevel',
    component: () => import(/* webpackChunkName: "team" */ '../views/team/teamLevel.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
