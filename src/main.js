import Vue from 'vue'
import store from '../store/appStateStore'
import VueRouter from 'vue-router'
import VuePlayerPlugin, { Player  } from 'vue-youtube-iframe-api'

import config from '../config.json'
import MassivePlayer from './components/massive-player.vue'
import TrackList from './components/tracklist.vue'

// icons
import iconSearch from 'vue-ionicons/dist/md-search.vue'
Vue.component('icon-search', iconSearch)
import iconRadioOn from 'vue-ionicons/dist/md-radio-button-on.vue'
Vue.component('icon-radio-on', iconRadioOn)
import iconRadioOff from 'vue-ionicons/dist/md-radio-button-off.vue'
Vue.component('icon-radio-off', iconRadioOff)
import iconStar from 'vue-ionicons/dist/md-star.vue'
Vue.component('icon-star', iconStar)
import iconStarOutline from 'vue-ionicons/dist/md-star-outline.vue'
Vue.component('icon-star-outline', iconStarOutline)
import iconStarInline from 'vue-ionicons/dist/md-star.vue'
Vue.component('icon-star-inline', iconStarInline)
import iconPrev from 'vue-ionicons/dist/md-skip-backward.vue'
Vue.component('icon-prev', iconPrev)
import iconNext from 'vue-ionicons/dist/md-skip-forward.vue'
Vue.component('icon-next', iconNext)
import iconVolumeHigh from 'vue-ionicons/dist/md-volume-high.vue'
Vue.component('icon-volume-high', iconVolumeHigh)
import iconVolumeOff from 'vue-ionicons/dist/md-volume-off.vue'
Vue.component('icon-volume-off', iconVolumeOff)
import iconClose from 'vue-ionicons/dist/md-close.vue'
Vue.component('icon-close', iconClose)
import iconContact from 'vue-ionicons/dist/md-contact.vue'
Vue.component('icon-contact', iconContact)
import iconTrash from 'vue-ionicons/dist/md-trash.vue'
Vue.component('icon-trash', iconTrash)

window.APIURL = config.apiHost
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VuePlayerPlugin)

Vue.component('youtube', Player )

// Routes
const router = new VueRouter({
  routes: [
    { name: 'Home', path: '/', component: TrackList, props: { appStyle: '', appState: '3-player-open' }},
    { name: 'Dubstep', path: '/dubstep', component: TrackList, props: { appStyle: 11 }},
    { name: 'Drum & Bass', path: '/drumandbass', component: TrackList, props: { appStyle: 12 }},
    { name: 'Dub', path: '/dub', component: TrackList, props: { appStyle: 13 }},
    { name: 'Breakbeat', path: '/breakbeat', component: TrackList, props: { appStyle: 14 }},
    { name: 'Deepbass', path: '/deepbass', component: TrackList, props: { appStyle: 15 }},
    { name: 'Electro', path: '/electro', component: TrackList, props: { appStyle: 19 }},
    { name: 'Favorites', path: '/favorites', component: TrackList, props: { appStyle: '', appState: '3-player-open' }},
  ],
  mode: 'history'
})
new Vue({
  store,
  router,
  render: h => h(MassivePlayer),
}).$mount('.app')
