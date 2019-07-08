import Vue from 'vue'
import VueRouter from 'vue-router'
import VueYoutube from 'vue-youtube'

import App from './App.vue'
import Home from './components/page_Home.vue'
import player from './components/player.vue'
import Admin from './components/page_Admin.vue'
import Tag from './components/page_Tag.vue'
import Post from './components/page_Post.vue'
import page404 from './components/page_404.vue'

Vue.config.productionTip = true
Vue.use(VueRouter)
Vue.use(VueYoutube)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home},
    { path: '/player', component: player},
    { path: '/post-:post_id', component: Post},
    { path: '/admin', component: Admin},
    { path: '/:tag', component: Tag},
    { path: '/*', component: page404}
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('.app')
