import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersist from 'vuex-persist'

import ui from './store/ui'
import styles from './store/styles'
import tracks from './store/tracks'
import users from './store/users'
import session from './store/session'
import favorites from './store/favorites'
import player from './store/player'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage, // or window.sessionStorage or localForage instance.
  reducer: (state) => ({ session: state.session, favorites: state.favorites, ui: state.ui, player: state.player }),
})

export default new Vuex.Store({
  strict: true,
  modules: {
    ui,
    styles,
    tracks,
    session,
    favorites,
    player,
    users,
  },
  plugins: [vuexLocalStorage.plugin],
})
