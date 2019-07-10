import Vue from 'vue'
import VueRouter from 'vue-router'
import YoutubeApi, { Youtube } from 'vue-youtube-iframe-api'

import Player from './components/player.vue'
import TrackList from './components/tracklist.vue'

Vue.config.productionTip = true
Vue.use(VueRouter)
Vue.use(YoutubeApi)

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
