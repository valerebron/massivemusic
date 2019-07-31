import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
    appState: '1-loading',
    appStyle: '',
    appTracks: {},
	},
	mutations: {
		setAppState(state, newState) {
      state.appState = newState
    },
    setAppStyle(state, newStyle) {
      state.appStyle = newStyle
    },
    setAppTracks(state, newTracks) {
      state.appTracks = newTracks
    },
  },
  getters: {
    getTrackById: (state) => (id) => {
      return state.appTracks.find(track => track.id_yt === id)
    },
  },
})

    // '1-loading'
    // '2-init-screen'
    // '3-player-open'
    // '4-search'
    // '5-nav'
    // '6-player-full'