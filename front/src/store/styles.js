const state = {
  styles: [],
}

const mutations = {
  SET_STYLES(state, tracks) {
    state.styles = tracks
  },
}

const actions = {
  initStyles(store, styles) {
    store.commit('SET_STYLES', styles)
  },
}

const getters = {
  styles(state) {
    return state.styles
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
