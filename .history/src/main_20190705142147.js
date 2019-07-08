import Vue from 'vue'
import VueRouter from 'vue-router'
import VuePlayerPlugin from 'vue-youtube-iframe-api'

import App from './App.vue'
import Home from './components/page_Home.vue'

Vue.config.productionTip = true
Vue.use(VueRouter)
Vue.use(VuePlayerPlugin)

Vue.component('youtube', Player)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home}
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('.app')
