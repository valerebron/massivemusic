import Vue from 'vue'
import store from './store'
import router from './router'
import config from '../config.json'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { HttpLink } from 'apollo-link-http';
import VueApollo from 'vue-apollo';
import App from './components/App.vue'
import './assets/icons.js'

window.APIURL = config.apiHost
window.status = 'loading',  // 'init' 'search' 'nav' 'full'
window.tracklistReady = false
window.playerReady = false
Vue.config.productionTip = false

async function appoloDidMount() {
  const cache = new InMemoryCache()
  const apolloClient = new ApolloClient({
    link: new HttpLink({uri: config.apiHost}),
    cache,
    connectToDevTools: true,
  })

  try {
    await persistCache({
      cache,
      storage: window.localStorage,
    })
  } catch (error) {
    console.error('Error restoring Apollo cache', error)
  }

  Vue.use(VueApollo);
  const apolloProvider = new VueApollo({
    clients: {
      a: apolloClient,
    },
    defaultClient: apolloClient,
    defaultOptions: {
    },
    errorHandler (error) {
      console.error(error)
    },
  })

  new Vue({
    el: '.app',
    store,
    router,
    apolloProvider,
    render: h => h(App),
  })
}

appoloDidMount()