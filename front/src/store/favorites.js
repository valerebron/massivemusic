const state = {
  favorites: [],  //array of youtube id
}

const mutations = {
  RESET_FAVORITES(state, newState) {
    state.favorites = newState
  },
  ADD_FAVORITE(state, ytid) {
    if(state.favorites == null) {
      state.favorites = new Array()
    }
    state.favorites.push(ytid)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
  DELETE_FAVORITE(state, ytid) {
    state.favorites.splice(state.favorites.indexOf(ytid), 1)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
}

const actions = {
  setFavorites(store, favorites) {
    let localFavorites = localStorage.getItem('favorites')
    if(favorites !== "undefined" && favorites !== '') {
      localFavorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else {
      localStorage.setItem('favorites', '')
      localFavorites = ''
    }
    store.commit('RESET_FAVORITES', localFavorites)
  },
  toggleFavorite(store, ytid) {
    if(store.state.favorites !== null && store.state.favorites.indexOf(ytid) != -1) {
      store.commit('DELETE_FAVORITE', ytid)
    }
    else {
      store.commit('ADD_FAVORITE', ytid)
    }
  },
}

const getters = {
  favorites(state) {
    return state.favorites
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
