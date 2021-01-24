import Vue from 'vue'
import Vuex from 'vuex'
import {get} from '../api/request'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}, //用户基本信息
    shareType: '',//分享类型
  },
  mutations: {
    //设置用户基本信息
    SET_USER_INFO(state, userInfo) {
      let data = Object.assign({}, state.userInfo, userInfo)
      state.userInfo = data
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    SET_SHARE_TYPE(state, type) {
      state.shareType = type
    }
  },
  actions: {
    GET_LIST_DATA(store) {
      console.log(store)
    },
    GET_USER_INFO(store) {
      get("/api/userInfo", {hideLoading: true}).then(res => {
        store.commit("SET_USER_INFO", res.data)
      })
    }
  },
  modules: {
  }
})
