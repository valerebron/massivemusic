import Vue from 'vue'
import VueRouter from 'vue-router'

import pageHome from './components/pages/page_home.vue'
import pageAdmin from './components/pages/page_admin.vue'
import pageLogin from './components/pages/page_login.vue'
import pageUser from './components/pages/page_user.vue'
import pageUsers from './components/pages/page_users.vue'
import userProfile from './components/elements/user-profile.vue'
import userTracks from './components/elements/user-tracks.vue'
import pageAddTracks from './components/pages/page_add-tracks.vue'
import pageMyTracks from './components/pages/page_my-tracks.vue'
import pagePendingTracks from './components/pages/page_pending-tracks.vue'
import pageInvalidTracks from './components/pages/page_invalid-tracks.vue'
import pageFavorites from './components/pages/page_favorites.vue'
import pageStyle from './components/pages/page_style.vue'
import pageTest from './components/pages/page_test.vue'

Vue.use(VueRouter)

let routes = [
  { name: 'home', path: '/', component: pageHome },
  { name: 'admin', path: '/admin', component: pageAdmin },
  { name: 'favorites', path: '/favorites', component: pageFavorites },
  { name: 'login', path: '/login', component: pageLogin },
  { name: 'add-tracks', path: '/add-tracks', component: pageAddTracks },
  { name: 'my-tracks', path: '/my-tracks', component: pageMyTracks },
  { name: 'signup', path: '/signup', component: pageLogin },
  { name: 'users', path: '/users', component: pageUsers },
  { name: 'user', path: '/user/:user_id', component: pageUser, children: [
    { path: 'profile', component: userProfile },
    { path: 'tracks', component: userTracks },
  ] },
  { name: 'pending-tracks', path: '/pending-tracks', component: pagePendingTracks },
  { name: 'invalid-tracks', path: '/invalid-tracks', component: pageInvalidTracks },
  { name: 'test', path: '/test', component: pageTest },
]
// should use store.getters.styles (unfortunatly can't add route async)
const styles = [{"id":11,"name":"Dubstep","slug":"dubstep"},{"id":12,"name":"Drum & Bass","slug":"drumandbass"},{"id":13,"name":"Dub","slug":"dub"},{"id":14,"name":"Break Beat","slug":"breakbeat"},{"id":15,"name":"Deep Bass","slug":"deepbass"},{"id":19,"name":"Electro","slug":"electro"}]
styles.map(style => {
  routes.push(
    { name: 'style-'+style.id, path: '/'+style.slug, component: pageStyle, props: { styleId: style.id } }
  )
})

const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

export default router
