// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import axios from "./axios.js"
import 'mint-ui/lib/style.css'

// 引入 c-swipe 主文件
import 'c-swipe/dist/swipe.css';
import { Swipe, SwipeItem } from 'c-swipe';
// 全局注册组件
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);
Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
