import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import TrackList from './components/tracklist.vue'

Vue.use(VueRouter)

// Routes
const router = new VueRouter({
  mode: 'history',
  base: '/var/www/html/',
  routes: [
    { name: 'home', path: '/', component: TrackList },
    { name: 'style-11', path: '/dubstep', component: TrackList },
    { name: 'style-12', path: '/drumandbass', component: TrackList },
    { name: 'style-13', path: '/dub', component: TrackList },
    { name: 'style-14', path: '/breakbeat', component: TrackList },
    { name: 'style-15', path: '/deepbass', component: TrackList },
    { name: 'style-19', path: '/electro', component: TrackList },
    { name: 'favorites', path: '/favorites', component: TrackList },
    { name: '404', path: "*", component: TrackList },
  ],
})

router.beforeEach((to, from, next) => {
  if(to.name.startsWith('style-')) {
    let styleId = to.name.replace('style-', '')
    store.dispatch('resetTracks')
    store.dispatch('setFilter', {type: 'style', value: styleId})
  }
  if(to.name == 'favorites') {
    store.dispatch('resetTracks')
    store.dispatch('setFilter', {type: 'id_yt', value: JSON.parse(localStorage.getItem('favorites'))})
  }
  if(to.name == 'home') {
    store.dispatch('resetTracks')
  }
  next()
})

export default router
