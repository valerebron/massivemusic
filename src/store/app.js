const state = {
  status: 'loading',  // 'state-init' 'state-search' 'state-nav' 'state-full'
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
      document.querySelector('body').classList.remove('no-scroll')
    }
    else {
      store.commit('SET_APP_STATUS', newStatus)
      if(newStatus == 'nav' || newStatus == 'full') {
        document.querySelector('body').classList.add('no-scroll')
      }
      else {
        document.querySelector('body').classList.remove('no-scroll')
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
