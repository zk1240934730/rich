import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Popup, Image, Swipe, SwipeItem, Icon, Overlay, Toast } from 'vant'
import 'lib-flexible'
import clipboard from 'clipboard';

Vue.use(Button);
Vue.use(Popup);
Vue.use(Image);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Icon);
Vue.use(Overlay);
Vue.use(Toast);
Vue.config.productionTip = false
Vue.prototype.clipboard = clipboard

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
