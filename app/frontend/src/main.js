import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(VueSocketio, '/')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
