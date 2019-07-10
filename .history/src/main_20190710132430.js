import Vue from 'vue'
import VueRouter from 'vue-router'
import VuePlayerPlugin, { Player  } from 'vue-youtube-iframe-api'

import config from '../config.json'
import MassivePlayer from './components/massive-player.vue'
import TrackList from './components/tracklist.vue'

window.APIURL = config.apiHost
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VuePlayerPlugin )

Vue.component('youtube', Player )

const router = new VueRouter({
  routes: [
    { path: '/', component: TrackList}
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(MassivePlayer),
}).$mount('.app')
