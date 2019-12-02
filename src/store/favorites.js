const state = {
  favorites: [],  //array of youtube id
}

const mutations = {
  RESET_FAVORITES(state, newState) {
    state.favorites = newState
  },
  ADD_FAVORITE(state, id) {
    if(state.favorites == null) {
      state.favorites = new Array()
    }
    state.favorites.push(id)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
  DELETE_FAVORITE(state, id) {
    state.favorites.splice(state.favorites.indexOf(id), 1)
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
  toggleFavorite(store, id) {
    if(store.state.favorites !== null && store.state.favorites.indexOf(id) != -1) {
      store.commit('DELETE_FAVORITE', id)
    }
    else {
      store.commit('ADD_FAVORITE', id)
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
