import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Popup, Image, Swipe, SwipeItem } from 'vant'
import 'lib-flexible'
Vue.use(Button);
Vue.use(Popup);
Vue.use(Image);
Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
