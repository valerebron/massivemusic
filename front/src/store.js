import Vue from 'vue'
import Vuex from 'vuex'
import app from './store/app'
import styles from './store/styles'
import tracklist from './store/tracklist'
import favorites from './store/favorites'
import player from './store/player'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    app,
    styles,
    tracklist,
    favorites,
    player,
  },
})
