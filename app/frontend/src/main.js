import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import 'jquery/dist/jquery.min.js'
import 'bootflat/css/bootstrap.min.css'
import 'bootflat/css/site.min.css'
import 'bootflat/js/site.min.js'
import 'bootflat/js/application.js'
import 'bootflat/js/bootstrap.min.js'

Vue.config.productionTip = false
Vue.use(VueSocketio, '/')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
