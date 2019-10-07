const state = {
  status: '1-loading',  // '2-init-screen' '3-search' '4-nav' '5-player-full'
}

const mutations = {
  SET_APP_STATUS(state, newState) {
    state.status = newState
  },
}

const actions = {
  setAppStatus(store, newStatus) {
    if(store.state.status == newStatus) {
      store.commit('SET_APP_STATUS', '2-init-screen')
    }
    else {
      store.commit('SET_APP_STATUS', newStatus)
    }
  },
}

const getters = {
  appState(state) {
    return state.status
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
