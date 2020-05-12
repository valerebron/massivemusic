const state = {
  intro: false,
  nav: true,
  player: false,
  search: false,
  full: false,
}

const mutations = {
  SET_UI(state, newUi) {
    Object.keys(state).forEach(function(key) {
      if(key === newUi.type) {
        state[key] = newUi.value
      }
    })
  },
}

const actions = {
  ui(store, ui) {
    store.commit('SET_UI', ui)
  },
  modal(store, isOpen) {
    document.body.dataset.dialog = isOpen
  },
}

const getters = {
  ui(state) {
    return state
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
