import Vue from 'vue'
import store from './store'
import router from './router'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
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

const apolloClient = new ApolloClient({
  uri: window.env.VUE_APP_ENDPOINT,
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