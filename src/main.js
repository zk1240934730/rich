import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Popup, Image, Swipe, SwipeItem, Icon, Overlay, Toast, Cell} from 'vant'
import {get, post} from './api/request'
import mixin from './mixin/index'
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
Vue.use(Cell);
Vue.config.productionTip = false
Vue.prototype.clipboard = clipboard
Vue.prototype.$get = get
Vue.prototype.$post = post

Vue.mixin(mixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
