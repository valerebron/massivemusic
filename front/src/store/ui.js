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
    if(ui.type === 'search') {
      if(ui.value === true) {
        document.getElementsByClassName('search__input')[0].focus()
      }
      if(ui.value === false) {
        document.getElementsByClassName('search__input')[0].blur()
      }
    }
  },
  modal(store, isOpen) {
    document.body.dataset.dialog = isOpen
  },
}

const getters = {
  ui: state => state,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
