import Vue from 'vue'
import VueRouter from 'vue-router'
import VuePlayerPlugin, { Player } from 'vue-youtube-iframe-api'

import Player from './components/player.vue'
import TrackList from './components/tracklist.vue'

Vue.config.productionTip = true
Vue.use(VueRouter)
Vue.use(VuePlayerPlugin)

Vue.component('youtube', Player)

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
