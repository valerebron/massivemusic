import gql from 'graphql-tag'

const state = {
  users: [],
}

const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  PUSH_USER(state, user) {
    state.users = state.users.unshift(user)
  },
  DROP_USER(state, userToDrop) {
     let index = state.users.find(user => user.id === userToDrop.id)
     state.users = state.users.splice(index, 1)
  },
}

const actions = {
  async initUsers(store) {
    let res = await window.apollo.query({
      query: gql`
        query {
          users {
            id
            name
            role
            createdAt
            updatedAt
            channel_avatar_medium
            channel_style
            tracks {
              id
            }
          }
        }
      `,
    }).catch((e) => {
      console.log('%c●', 'color: red', 'user error', e)
    })
    store.commit('SET_USERS', res.data.users)
  },
  async addBot(store, user) {
    let res = await window.apollo.mutate({
      variables: { ...user },
      mutation: gql`mutation($name: String!, $email: String!, $token: String!, $channel_id: String!, $channel_style: Int!, $channel_enable_tracks: Boolean!, $channel_description: String!, $channel_avatar_small: String!, $channel_avatar_medium: String!, $channel_avatar_high: String!) {
        addBot(name: $name, email: $email, token: $token, channel_id: $channel_id, channel_style: $channel_style, channel_enable_tracks: $channel_enable_tracks, channel_description: $channel_description, channel_avatar_small: $channel_avatar_small, channel_avatar_medium: $channel_avatar_medium, channel_avatar_high: $channel_avatar_high) {
          id,
          name,
          email,
          role,
          createdAt,
          updatedAt,
          channel_id,
          channel_style,
          channel_enable_tracks,
          channel_description,
          channel_avatar_small,
          channel_avatar_medium,
          channel_avatar_high,
        }
      }`,
    }).catch((e) => {
      console.log('%c●', 'color: red', 'add bot error', e)
    })
    store.commit('PUSH_USER', res.data.addBot)
  },
  async dropUser(store, user) {
    let res = await window.apollo.mutate({
      variables: {
        id: user.id,
        token: store.getters.session.token,
      },
      mutation: gql`mutation($id: Int!, $token: String!) {
        dropUser(id: $id, token: $token) {
          id
        }
      }`,
    }).catch((e) => {
      console.log('%c●', 'color: red', 'drop error: ', e)
    })
    store.commit('DROP_USER', res.data.dropUser)
  },
}

const getters = {
  users: state => state.users,
  robots: state => state.users.filter(user => user.role === 'ROBOT'),
}

export default {
  state,
  mutations,
  actions,
  getters,
}
