import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import TrackList from './components/tracklist.vue'

Vue.use(VueRouter)

// Routes
const router = new VueRouter({
  routes: [
    { name: 'home', path: '/', component: TrackList },
    { name: 'style-11', path: '/dubstep', component: TrackList },
    { name: 'style-12', path: '/drumandbass', component: TrackList },
    { name: 'style-13', path: '/dub', component: TrackList },
    { name: 'style-14', path: '/breakbeat', component: TrackList },
    { name: 'style-15', path: '/deepbass', component: TrackList },
    { name: 'style-19', path: '/electro', component: TrackList },
    { name: 'favorites', path: '/favorites', component: TrackList },
    // { name: 'member', path: '/member/:id', component: TrackList,
    //   children: [
    //     { path: '', component: memberHome },
    //     { path: 'profile', component: memberProfile },
    //     { path: 'tracks', component: memberTracks },
    //   ],
    // },
  ],
  mode: 'history'
})

export default router
