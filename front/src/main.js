import Vue from 'vue'
import store from './store'
import router from './router'
import config from '../../config.json'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import vueMoment from 'vue-moment'

import './styles/main.scss'
import './assets/icons.js'

import App from './components/App.vue'

window.APIURL = config.apiHost
Vue.config.productionTip = false

Vue.use(VueApollo)
const apolloClient = new ApolloClient({
  uri: config.apiHost,
  onError: ({ networkError, graphQLErrors }) => {
    if(graphQLErrors) {
      console.log('%c●', 'color: red', 'graphQLErrors', graphQLErrors[0].extensions.exception.stacktrace)
    }
    if(networkError) {
      console.log('%c●', 'color: red', 'networkError', networkError)
    }
  }
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(vueMoment)

new Vue({
  el: '.app',
  store,
  router,
  apolloProvider,
  render: h => h(App),
})

Vue.http.headers.common['Access-Control-Request-Method'] = '*'
