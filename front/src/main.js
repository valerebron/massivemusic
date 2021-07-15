import Vue from 'vue'
import store from './store'
import router from './router'

import ApolloClient from 'apollo-client'
import VueApollo from 'vue-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import vueMoment from 'vue-moment'
import VueMeta from 'vue-meta'
import './styles/main.scss'
import './assets/icons.js'
import App from './components/App.vue'

Vue.use(vueMoment)
Vue.use(VueMeta)
Vue.use(VueApollo)

window.env = process.env
window.formatError = function(error) {
  let regex = /\x1b/g
  return error.replace(regex, '_rep_').replace(/_rep_\[[0-9][0-9]m/g, '').replace(/_rep_\[[0-9]m/g, '').replace('GraphQL error: ', '')
}

const httpLink = new HttpLink({
  uri: window.env.VUE_APP_ENDPOINT+'/graphql',
})
const wsLink = new WebSocketLink({
  uri: window.env.VUE_APP_ENDPOINT_WS+'/subscriptions',
  options: {
    reconnect: true,
  },
})
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  onError: ({ networkError, graphQLErrors }) => {
    if(graphQLErrors) {
      console.log(window.formatError(graphQLErrors[0].message))
      if(window.formatError(graphQLErrors[0].message) == 'invalid token') {
        store.commit('RESET_SESSION')
        router.push('/login')
      }
    }
    if(networkError) {
      console.log('%c●', 'color: red', 'networkError', networkError)
    }
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.filter('formatTime', function (time) {
  time = Math.round(time)
  let minutes = Math.floor(time / 60),
  seconds = parseInt(time - minutes * 60)
  seconds = seconds < 10 ? '0' + seconds : seconds
  if(!isNaN(minutes) && !isNaN(seconds)) {
    return minutes + ':' + seconds
  }
  else {
    return '0:00'
  }
})

new Vue({
  el: '.app',
  store,
  router,
  apolloProvider,
  render: h => h(App),
})