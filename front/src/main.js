import Vue from 'vue'
import store from './store'
import router from './router'
import config from '../../config.json'
import App from './components/App.vue'
import './assets/icons.js'

window.APIURL = config.apiHost
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('.app')
