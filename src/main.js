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
import iconUp from 'vue-ionicons/dist/md-arrow-dropup.vue'
Vue.component('icon-up', iconUp)
import iconDown from 'vue-ionicons/dist/md-arrow-dropdown.vue'
Vue.component('icon-down', iconDown)
import iconRight from 'vue-ionicons/dist/md-arrow-dropright.vue'
Vue.component('icon-right', iconRight)
import iconStar from 'vue-ionicons/dist/md-star.vue'
Vue.component('icon-star', iconStar)
import iconStarOutline from 'vue-ionicons/dist/md-star-outline.vue'
Vue.component('icon-star-outline', iconStarOutline)
import iconPrev from 'vue-ionicons/dist/md-skip-backward.vue'
Vue.component('icon-prev', iconPrev)
import iconPlay from 'vue-ionicons/dist/md-play.vue'
Vue.component('icon-play', iconPlay)
import iconPause from 'vue-ionicons/dist/md-pause.vue'
Vue.component('icon-pause', iconPause)
import iconNext from 'vue-ionicons/dist/md-skip-forward.vue'
Vue.component('icon-next', iconNext)
import iconVolumeHigh from 'vue-ionicons/dist/md-volume-high.vue'
Vue.component('icon-volume-high', iconVolumeHigh)
import iconVolumeOff from 'vue-ionicons/dist/md-volume-off.vue'
Vue.component('icon-volume-off', iconVolumeOff)
import iconMenu from 'vue-ionicons/dist/md-menu.vue'
Vue.component('icon-menu', iconMenu)
import iconClose from 'vue-ionicons/dist/md-close.vue'
Vue.component('icon-close', iconClose)
import iconContact from 'vue-ionicons/dist/md-contact.vue'
Vue.component('icon-contact', iconContact)

window.APIURL = config.apiHost
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VuePlayerPlugin)

Vue.component('youtube', Player )

// Routes
const router = new VueRouter({
  routes: [
    { name: 'Home', path: '/', component: TrackList, props: { currentStyle: '' }},
    { name: 'Dubstep', path: '/dubstep', component: TrackList, props: { currentStyle: 11 }},
    { name: 'Drum & Bass', path: '/drumandbass', component: TrackList, props: { currentStyle: 12 }},
    { name: 'Dub', path: '/dub', component: TrackList, props: { currentStyle: 13 }},
    { name: 'Breakbeat', path: '/breakbeat', component: TrackList, props: { currentStyle: 14 }},
    { name: 'Deepbass', path: '/deepbass', component: TrackList, props: { currentStyle: 15 }},
    { name: 'Electro', path: '/electro', component: TrackList, props: { currentStyle: 19 }},
  ],
  mode: 'history'
})
new Vue({
  store,
  router,
  render: h => h(MassivePlayer),
}).$mount('.app')
