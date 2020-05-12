import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import ui from './store/ui'
import styles from './store/styles'
import tracks from './store/tracks'
import session from './store/session'
import favorites from './store/favorites'
import player from './store/player'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    ui,
    styles,
    tracks,
    session,
    favorites,
    player,
  },
  plugins: [createPersistedState()],
})
