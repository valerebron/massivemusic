const state = {
  status: 'state-loading',  // 'state-init' 'state-search' 'state-nav' 'state-full'
}

const mutations = {
  SET_APP_STATUS(state, newState) {
    state.status = newState
  },
}

const actions = {
  setAppStatus(store, newStatus) {
    if(store.state.status == newStatus) {
      store.commit('SET_APP_STATUS', 'init')
      document.body.classList.remove('no-scroll')
    }
    else {
      store.commit('SET_APP_STATUS', newStatus)
      if(['state-nav','state-full'].includes(newStatus)) {
        document.body.classList.add('no-scroll')
      }
      else {
        document.body.classList.remove('no-scroll')
      }
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