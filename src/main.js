import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Popup, Image, Swipe, SwipeItem, Icon, Overlay, Toast, Cell} from 'vant'
import {get, post} from './api/request'
import mixin from './mixin/index'
import 'lib-flexible'
import clipboard from 'clipboard';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueScroller from 'vue-scroller'

// import style
import 'swiper/swiper-bundle.css'
Vue.use(VueScroller)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Toast.className = 'max-index'
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
