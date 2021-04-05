import gql from 'graphql-tag'

const state = {
  track_details: {
    id: '',
    yt_id: '',
    title: '',
    artist: '',
    duration: '',
    pending: '',
    invalid: '',
    createdAt: '',
    style: {
      id: '',
    },
    user: {
      id: '',
      name: '',
      email: '',
      role: '',
      channel_avatar_small: '',
    },
    playcount: '',
  }
}

const mutations = {
  SET_TRACK_DETAILS(state, track) {
    state.track_details = track
  }
}

const actions = {
  async getTrackDetails(store, id) {
    let res = await window.apollo.query({
      variables: { id: id },
      query: gql`query($id: String!) {
        getTrackDetails(id: $id) {
          id
          yt_id
          title
          artist
          duration
          pending
          invalid
          createdAt
          style {
            id
          }
          user {
            id
            name
            email
            role
            channel_avatar_small
          },
          playcount,
        }
      }`
    }).catch((e) => {
      console.log(e)
    })
    store.commit('SET_TRACK_DETAILS', res.data.getTrackDetails)
  },
}

const getters = {
  getTrackDetails: state => state.track_details,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
