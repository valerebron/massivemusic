import Vue from 'vue'
import store from './store'
import router from './router'
import config from '../../config.json'
import App from './components/App.vue'

// icons
// let icons = ['search', 'radio-button-on', 'radio-button-off', 'star', 'star-outline', 'skip-backward', 'skip-forward', 'volume-high', 'volume-off', 'close', 'contact', 'trash']
// foreach(icons as icon) {
//   import iconSearch from '../assetsvue-ionicons/dist/md-search.vue'
//   Vue.component('icon-search', iconSearch)
// }
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

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('.app')
