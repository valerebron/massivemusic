import gql from 'graphql-tag'

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
  PUSH_USER_TRACK(state, track) {
    state.user.tracks.push(track)
  },
  UPDATE_USER_INFOS(state, user) {
    state.user.channel_description = user.channel_description
    state.user.channel_style = user.channel_style
  },
}

const actions = {
  login(store, session) {
    store.commit('SET_SESSION', session)
  },
  logout(store) {
    store.commit('RESET_SESSION')
  },
  updateMe(store, user) {
    store.commit('UPDATE_USER_INFOS', user)
  },
  async changePassword(store, payload) {
    let res = await window.apollo.mutate({
      variables: { ...payload },
      mutation: gql`mutation($email: String!, $token: String!, $newPassword: String!) {
        changePassword(email: $email, token: $token, newPassword: $newPassword)
      }`,
    }).catch((e) => {
      console.log('%c●', 'color: red', 'change pass error: ', e)
    })
    return res
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
