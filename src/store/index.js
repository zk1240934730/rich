import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
  },
  actions: {
    GET_LIST_DATA(store) {
      console.log(store)
    }
  },
  modules: {
  }
})
