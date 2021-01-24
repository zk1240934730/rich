import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'
import Home from '../views/home/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home
  },
  {
    path: '/index',
    name: 'index',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
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
  },
  {
    path: '/rewardRules',
    name: 'rewardRules',
    component: () => import(/* webpackChunkName: "rewardRules" */ '../views/rules/rewardRules.vue')
  }
]

const router = new VueRouter({
  routes
})
//判断是否存在token
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path !== '/login' && !checkUserLoginInfo()) {
    next("/login")
    NProgress.done() // 结束Progress
  } else {
      next();
  }
  // if (to.meta.roles) {
  //     to.meta.roles.includes(...store.getters.roles) ? next() : next('/404')
  // } else {
  //     next();
  // }
  // next();
})
//检查用户登录信息
const checkUserLoginInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  //  || !JSON.parse(userInfo).token
  if(!userInfo || !JSON.parse(userInfo).api_token) return false;
  store.commit("SET_USER_INFO", JSON.parse(userInfo));
  return true;
}
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
export default router