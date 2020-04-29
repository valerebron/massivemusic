const state = {
  tracks: [],
}

const mutations = {
  ADD_FAVORITE(state, track) {
    if(track) {
      state.tracks.push(track)
    }
  },
  REMOVE_FAVORITE(state, track) {
    state.tracks = state.tracks.filter(favorite => favorite.yt_id !== track.yt_id)
  },
}

const actions = {
  toggleFavorite(store, track) {
    if(track.yt_id) {
      if(store.getters.isFavorite(track)) {
        store.commit('REMOVE_FAVORITE', track)
      }
      else {
        store.commit('ADD_FAVORITE', track)
      }
    }
  },
}

const getters = {
  favorites(state) {
    return state.tracks
  },
  isFavorite(state) {
    return function(track) {
      return state.tracks.some(favorite => favorite.yt_id === track.yt_id)
    }
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
