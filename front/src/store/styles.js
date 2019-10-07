const state = {
  styles: [],
}

const mutations = {
  SET_APP_STYLES(state, newState) {
    state.styles = newState
  },
}

const actions = {
  setAppStyles(store, styles) {
    store.commit('SET_APP_STYLES', styles)
  },
}

const getters = {
  appStyles(state) {
    return state.styles
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
