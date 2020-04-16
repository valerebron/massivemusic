import gql from 'graphql-tag'

const state = {
  tracks: [],
  tracksPerPage: 50,
  order: 'createdAt_DESC',
  filters: {
    search: '',
    style: 0,
    user: '',
    pending: 'without',
    skip: 0,
  },
  count: 0,
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
      return elt.id !== track.id
    })
    state.count = state.count - 1
  },
  SET_COUNT(state, count) {
    state.count = count
  },
  SET_FILTER(state, filter) {
    state.filters[filter.type] = filter.value
  },
  RESET_FILTERS(state) {
    state.filters = {
      search: '',
      style: 0,
      user: '',
      pending: 'without',
      skip: 0,
    }
  },
}

const actions = {
  resetTracks(store) {
    store.commit('RESET_FILTERS')
  },
  filterTracks(store, filter) {
    if (filter.value !== store.state.filters[filter.type] || filter.type === 'skip') {
      if (filter.type === 'home') {
        store.commit('SET_FILTER', { type: 'user', value: '' })
        store.commit('SET_FILTER', { type: 'style', value: 0 })
        store.commit('SET_FILTER', { type: 'pending', value: 'with' })
      }
      if (filter.type === 'style') {
        store.commit('SET_FILTER', { type: 'user', value: '' })
        store.commit('SET_FILTER', { type: 'pending', value: 'without' })
      }
      if (filter.type === 'user') {
        store.commit('SET_FILTER', { type: 'pending', value: 'with' })
      }
      if (filter.type === 'pending') {
        store.commit('SET_FILTER', { type: 'user', value: '' })
        store.commit('SET_FILTER', { type: 'style', value: 0 })
        store.commit('SET_FILTER', { type: 'pending', value: 'only' })
      }
      if (filter.type === 'skip') {
        if (store.state.filters.skip + store.state.tracksPerPage >= store.state.count) {
          return
        }
        else {
          filter.value = store.state.filters.skip + store.state.tracksPerPage
          store.commit('SET_FILTER', filter)
        }
      }
      else {
        store.commit('SET_FILTER', { type: 'skip', value: 0 })
      }
      store.commit('SET_FILTER', filter)
      window.apollo.query({
        variables: {
          search: store.state.filters.search,
          style: store.state.filters.style,
          user: store.state.filters.user,
          skip: store.state.filters.skip,
          first: store.state.tracksPerPage,
          pending: store.state.filters.pending,
          orderBy: 'createdAt_DESC',
        },
        query: gql`
          query(
              $search: String,
              $style: Int,
              $user: String,
              $skip: Int!,
              $first: Int!,
              $pending: String,
              $orderBy: TrackOrderByInput,
          ) {
            tracks(
              search: $search,
              style: $style,
              user: $user,
              skip: $skip,
              first: $first,
              pending: $pending,
              orderBy: $orderBy,
            ) {
              count
              tracks {
                id
                title
                artist
                duration
                invalid
                createdAt
                style {
                  id
                }
                user {
                  id
                  name
                }
              }
            }
          }
        `,
      }).then((res) => {
        if (filter.type === 'skip') {
          store.commit('PUSH_TRACKS', res.data.tracks.tracks)
        }
        else {
          window.scroll(0, 0)
          store.commit('SET_TRACKS', res.data.tracks.tracks)
          store.commit('SET_COUNT', res.data.tracks.count)
        }
      }).catch((error) => {
        console.log('%c●', 'color: red', 'filter error: ', error)
      })
    }
  },
  dropTrack(store, track) {
    window.apollo.mutate({
      variables: {
        userId: store.getters.session.user.id,
        token: store.getters.session.token,
        trackId: track.id,
      },
      mutation: gql`mutation($userId: String!, $token: String!, $trackId: String!) {
        dropPost(userId: $userId, token: $token, trackId: $trackId) {
          id
        }
      }`,
    }).then(() => {
      store.commit('DROP_TRACK', track)
      document.getElementsByClassName(track.id)[0].classList.add('track--dropped')
    }).catch((error) => {
      this.error = error.message.replace('GraphQL error: ', '')
      console.log('%c●', 'color: red', 'dropped error: ', this.error)
    })
  },
  filterFavorites(store) {
    store.commit('SET_FILTER', { type: 'user', value: '' })
    store.commit('SET_FILTER', { type: 'style', value: 0 })
    let favorites = store.getters.favorites
    store.commit('SET_TRACKS', favorites)
    store.commit('SET_COUNT', favorites.length)
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
}

export default {
  state,
  mutations,
  actions,
  getters,
}
