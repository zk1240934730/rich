import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'
import Home from '../views/home/index.vue'
Vue.use(VueRouter)
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
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
    meta: {
      notLogin: true
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    meta: {
      notLogin: true
    },
    component: () => import(/* webpackChunkName: "notice" */ '../views/login/notice.vue')
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
  },
  {
    path: '/bind',
    name: 'bind',
    component: () => import(/* webpackChunkName: "rewardRules" */ '../views/setting/bind.vue')
  },
  {
    path: '/cashOut',
    name: 'cashOut',
    component: () => import(/* webpackChunkName: "rewardRules" */ '../views/inviteUsers/cashOut.vue')
  },
  {
    path: '/addBank',
    name: 'addBank',
    component: () => import(/* webpackChunkName: "rewardRules" */ '../views/inviteUsers/addBank.vue')
  },
  {
    path: '/code',
    name: 'code',
    component: () => import(/* webpackChunkName: "rewardRules" */ '../views/login/code.vue')
  }
]

const router = new VueRouter({
  routes
})
//判断是否存在token
router.beforeEach((to, from, next) => {
  console.log(to)
  NProgress.start()
  if(to.path === '/notice') {
    next()
     // 结束Progress
    NProgress.done()
  } else if (to.path === '/login' && checkUserLoginInfo()) { //登录页面如果有登录信息  直接跳转首页
    next("/index")
    NProgress.done()
  } else if(to.path !=='/login' && to.path !=='/code' && !checkUserLoginInfo("invite_code")) { //进入首页检查是否有邀请码  没有前往邀请码页面
    next("/code")
     // 结束Progress
     NProgress.done()
  }  else if(to.path !== '/login' && !checkUserLoginInfo()) {
    next("/login")
     // 结束Progress
    NProgress.done()
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

/**
 * 检查用户登录信息
 * @param {想要检查的特定字段名称} type 
 */
const checkUserLoginInfo = (type) => {
  const userInfo = localStorage.getItem("userInfo");
  //  || !JSON.parse(userInfo).token
  if(!userInfo || !JSON.parse(userInfo).api_token) return false;
  store.commit("SET_USER_INFO", JSON.parse(userInfo));
  if(!type) {
    return true
  }
  return JSON.parse(userInfo)[type];
}
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
export default router