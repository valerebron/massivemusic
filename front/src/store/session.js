const state = {
  token: '',
  user: {},
}

const mutations = {
  SET_SESSION(state, session) {
    state.token = session.token
    state.user = session.user
  },
  RESET_SESSION(state) {
    state.token = ''
    state.user = {}
  },
  UPDATE_USER_TRACK(state, track) {
    state.user.tracks.push(track)
  },
}

const actions = {
  login(store, session) {
    store.commit('SET_SESSION', session)
  },
  logout(store) {
    store.commit('RESET_SESSION')
  },
  addTrackToSession(store, track) {
    store.commit('UPDATE_USER_TRACK', track)
  },
}

const getters = {
  session(state) {
    return {
      token: state.token,
      user: state.user
    }
  },
  isOnline(state) {
    return (state.token !== '' ? true : false)
  },
  isAdmin(state) {
    return (state.user.role === 'ADMIN' ? true : false)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
