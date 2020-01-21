import Vue from 'vue'
import store from './store'
import router from './router'
import config from '../config.json'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import App from './components/App.vue'
import './assets/icons.js'

window.APIURL = config.apiHost
window.status = 'loading',  // 'init' 'search' 'nav' 'full'
window.tracklistReady = false
window.playerReady = false
Vue.config.productionTip = false

// apollo
Vue.use(VueApollo)
const apolloClient = new ApolloClient({
  uri: config.apiHost
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
// end apollo

new Vue({
  el: '.app',
  store,
  router,
  apolloProvider,
  render: h => h(App),
})
