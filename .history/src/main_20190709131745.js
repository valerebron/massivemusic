import Vue from 'vue'
import VueRouter from 'vue-router'
import VuePlayerPlugin { Youtube } from 'vue-youtube-iframe-api'

import config from '../config.json'
import Player from './components/player.vue'
import TrackList from './components/tracklist.vue'

window.APIURL = config.apiHost
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VuePlayerPlugin )

Vue.component('youtube', Youtube)

const router = new VueRouter({
  routes: [
    { path: '/', component: TrackList}
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(Player),
}).$mount('.app')
