const state = {
  styles: [],
}

const mutations = {
  SET_STYLES(state, styles) {
    state.styles = styles
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
