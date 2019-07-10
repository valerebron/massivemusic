import Vue from 'vue'
import VueRouter from 'vue-router'
import VuePlayerPlugin, { Youtube } from 'vue-youtube-iframe-api'
 
Vue.use(VuePlayerPlugin)
Vue.component('youtube', Youtube)

import Player from './components/player.vue'
import TrackList from './components/tracklist.vue'

Vue.config.productionTip = true
Vue.use(VueRouter)

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
