import Vue from 'vue'
import VueRouter from 'vue-router'

import pageHome from './components/pages/home.vue'
import pageAdmin from './components/pages/admin.vue'
import pageLogin from './components/pages/login.vue'
import pageUser from './components/pages/user.vue'
import pageSearch from './components/pages/search.vue'
import pageUsers from './components/pages/users.vue'
import pageProfile from './components/pages/profile.vue'
import pageEditProfile from './components/pages/profile-edit.vue'
import pageUserTracks from './components/pages/user-tracks.vue'
import pageAddTracks from './components/pages/add-tracks.vue'
import pageAddBots from './components/pages/add-bots.vue'
import pageMyTracks from './components/pages/my-tracks.vue'
import pageFavorites from './components/pages/favorites.vue'
import pageStyle from './components/pages/style.vue'
import pageTest from './components/pages/test.vue'
import pageRecover from './components/pages/recover-password.vue'
import pageMail from './components/pages/mail.vue'
import pageAbout from './components/pages/about.vue'
import pageTrack from './components/pages/trackDetails.vue'
import pageArtist from './components/pages/artist.vue'

Vue.use(VueRouter)

let routes = [
  { name: 'home', path: '/', component: pageHome },
  { name: 'admin', path: '/admin', component: pageAdmin, children: [
    { name: 'all', path: 'all', component: pageAdmin },
    { name: 'pending', path: 'pending', component: pageAdmin },
    { name: 'invalid', path: 'invalid', component: pageAdmin },
    { name: 'empty', path: 'empty', component: pageAdmin },
    { name: 'duration', path: 'duration', component: pageAdmin },
  ]},
  { name: 'favorites', path: '/favorites', component: pageFavorites },
  { name: 'login', path: '/login', component: pageLogin },
  { name: 'add-tracks', path: '/add-tracks', component: pageAddTracks },
  { name: 'add-tracks-query', path: '/add-tracks/:init_query', component: pageAddTracks },
  { name: 'add-bots', path: '/add-bots', component: pageAddBots },
  { name: 'my-tracks', path: '/my-tracks', component: pageMyTracks },
  { name: 'signup', path: '/signup', component: pageLogin },
  { name: 'users', path: '/users', component: pageUsers },
  { name: 'user', path: '/user/:user_name/:user_id', component: pageUser, children: [
    { name: 'user-profile', path: 'profile', component: pageProfile },
    { name: 'user-edit', path: 'edit', component: pageEditProfile },
    { name: 'user-tracks', path: 'tracks', component: pageUserTracks },
  ] },
  { name: 'test', path: '/test', component: pageTest },
  { name: 'recover-password', path: '/passwd/:token/:email', component: pageRecover },
  { name: 'mail', path: '/mail', component: pageMail },
  { name: 'search', path: '/s/:keywords', component: pageSearch },
  { name: 'about', path: '/about', component: pageAbout },
  { name: 'track', path: '/track/:title/:id', component: pageTrack },
  { name: 'artist', path: '/artists', component: pageArtist },
]
// should use store.getters.styles (unfortunatly can't add route async)
const styles = [{"id":1,"name":"Dubstep","slug":"dubstep"},{"id":2,"name":"Drum & Bass","slug":"drumandbass"},{"id":3,"name":"Dub","slug":"dub"}]
styles.map(style => {
  routes.push(
    { name: 'style-'+style.id, path: '/'+style.slug, component: pageStyle, props: { styleId: style.id }, children: [
      { name: 'style-'+style.id+'-search', path: '/'+style.slug+'/s/:keywords', component: pageStyle },
    ] },
  )
})

const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

export default router
