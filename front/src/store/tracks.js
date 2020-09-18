import gql from 'graphql-tag'

let initial_filters = {
  search: '',
  style: 0,
  user: 0,
  skip: 0,
  pending: 0,
  invalid: 0,
  reset: 0,
}

const state = {
  tracks: [],
  tracksPerPage: 50,
  order: 'createdAt_DESC',
  filters: initial_filters,
  count: 0,
  count_pending: 0,
  count_invalid: 0,
}

const mutations = {
  SET_TRACKS(state, tracks) {
    state.tracks = tracks
  },
  PUSH_TRACKS(state, tracks) {
    state.tracks.push(...tracks)
  },
  DROP_TRACK(state, track) {
    state.tracks = state.tracks.filter(function (elt) {
      return elt.yt_id !== track.yt_id
    })
    state.count = state.count - 1
  },
  EDIT_TRACK(state, editedTrack) {
    state.tracks.map(track => {
      if(track.yt_id === editedTrack.yt_id) {
        track = editedTrack
        if(editedTrack.yt_id !== editedTrack.yt_id) {
          track.yt_id = editedTrack.yt_id
        }
      }
    })
    state.count = state.count - 1
  },
  SET_COUNT(state, count) {
    state.count = count
  },
  SET_COUNT_PENDING(state, count) {
    state.count_pending = count
  },
  SET_COUNT_INVALID(state, count) {
    state.count_invalid = count
  },
  SET_FILTER(state, filter) {
    state.filters[filter.type] = filter.value
  },
  RESET_FILTERS(state) {
    state.filters = {
      search: '',
      style: 0,
      user: 0,
      skip: 0,
      pending: 0,
      invalid: 0,
    }
  },
}

const actions = {
  async filterTracks(store, filter) {
    if(filter.value !== store.state.filters[filter.type] || filter.type === 'skip') {
      let newSkip = store.state.filters.skip + store.state.tracksPerPage
      console.log('newSkip = '+store.state.filters.skip+' + '+store.state.tracksPerPage)
      switch(filter.type) {
        case 'reset':
          store.commit('RESET_FILTERS')
          store.commit('SET_FILTER', filter)
        break
        case 'skip':
          if(newSkip >= store.state.count) {
            return
          }
          else {
            filter.value = newSkip
            store.commit('SET_FILTER', filter)
          }
        break
        default:
          store.commit('SET_FILTER', {type: 'user', value: 0})
          store.commit('SET_FILTER', {type: 'style', value: 0})
          store.commit('SET_FILTER', {type: 'pending', value: 0})
          store.commit('SET_FILTER', {type: 'invalid', value: 0})
          store.commit('SET_FILTER', filter)
        break
      }
      let res = await window.apollo.query({
        variables: {
          search: store.state.filters.search,
          style: store.state.filters.style,
          user: parseInt(store.state.filters.user),
          skip: store.state.filters.skip,
          first: store.state.tracksPerPage,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          pending: store.state.filters.pending,
          invalid: store.state.filters.invalid,
        },
        query: gql`
          query(
              $search: String,
              $style: Int,
              $user: Int,
              $skip: Int!,
              $first: Int!,
              $orderBy: TrackOrderByInput!,
              $orderDirection: TrackOrderDirectionInput!,
              $pending: Int,
              $invalid: Int,
          ) {
            tracks(
              search: $search,
              style: $style,
              user: $user,
              skip: $skip,
              first: $first,
              orderBy: $orderBy,
              orderDirection: $orderDirection,
              pending: $pending,
              invalid: $invalid,
            ) {
              count
              tracks {
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
                }
              }
            }
          }
        `,
      }).catch((e) => {
        console.log('%c●', 'color: red', 'filter error', e)
      })
      if(filter.type === 'skip') {
        store.commit('PUSH_TRACKS', res.data.tracks.tracks)
      }
      else {
        window.scroll(0, 0)
        store.commit('SET_TRACKS', res.data.tracks.tracks)
        store.commit('SET_COUNT', res.data.tracks.count)
        if(filter.type === 'pending') {
          store.commit('SET_COUNT_PENDING', res.data.tracks.count)
        }
        if(filter.type === 'invalid') {
          store.commit('SET_COUNT_INVALID', res.data.tracks.count)
        }
      }
    }
  },
  filterFavorites(store) {
    console.log('filter favorite')
    store.commit('RESET_FILTERS')
    let favorites = store.getters.favorites
    store.commit('SET_TRACKS', favorites)
    store.commit('SET_COUNT', favorites.length)
  },
  async syncTracks(store, user) {
    let res = await window.apollo.mutate({
      variables: {
        token: store.getters.session.token,
        id: user.id,
      },
      mutation: gql`mutation($token: String!, $id: Int!) {
        syncBot(token: $token, id: $id) {
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
          }
        }
      }`,
    }).catch((e) => {
      console.log('%c●', 'color: red', 'sync error: ', e)
    })
    return res ? res.data.syncBot : ''
  },
  async syncAllUsers(store) {
    console.log('sync all users')
    store.getters.users.map(async (user) => {
      if(user.role === 'ROBOT') {
        await store.dispatch('syncTracks', user)
      }
    })
  },
  async addTrack(store, track) {
    console.log('add track')
    window.apollo.mutate({
      variables: {
        user_id: store.getters.session.user.id,
        yt_id: track.id,
        title: track.title,
        artist: track.artist,
        duration: track.duration,
        style: parseInt(track.style),
        token: store.getters.session.token,
      },
      mutation: gql`mutation($user_id: Int!, $yt_id: String!, $title: String!, $artist: String!, $duration: Int!, $style: Int!, $token: String!) {
        post(user_id: $user_id, yt_id: $yt_id, title: $title, artist: $artist, duration: $duration, style: $style, token: $token) {
          yt_id
          title
          artist
          duration
          style {
            id
          }
          user {
            id
          }
        }
      }`,
    }).then((res) => {
      store.commit('PUSH_USER_TRACK', res.data.post)
    }).catch((error) => {
      console.log('%c●', 'color: red', 'add-track error: ', error)
    })
  },
  resetCounters(store) {
    console.log('reset counters')
    store.commit('SET_COUNT_PENDING', 0)
    store.commit('SET_COUNT_INVALID', 0)
  },
}

const getters = {
  tracks: state => state.tracks,
  filters: state => state.filters,
  first: state => state.first,
  skip: state => state.skip,
  order: state => state.order,
  search: state => state.search,
  style: state => state.style,
  user: state => state.user,
  count: state => state.count,
  count_pending: state => state.count_pending,
  count_invalid: state => state.count_invalid,
  tracksPerPage: state => state.tracksPerPage,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
