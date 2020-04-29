import MD5 from 'crypto-js/md5'

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
  myGravatar(state) {
    let hash = MD5(state.user.email)
    return 'https://secure.gravatar.com/avatar/'+hash+'?s=320&d=identicon'
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
