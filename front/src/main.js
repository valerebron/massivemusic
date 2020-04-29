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
window.formatError = function(error) {
  let regex = /\x1b/g
  return error.replace(regex, '_rep_').replace(/_rep_\[[0-9][0-9]m/g, '').replace(/_rep_\[[0-9]m/g, '').replace('GraphQL error: ', '')
}

Vue.use(VueApollo)
const apolloClient = new ApolloClient({
  uri: config.apiHost,
  onError: ({ networkError, graphQLErrors }) => {
    if(graphQLErrors) {
      console.log(window.formatError(graphQLErrors[0].message))
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
