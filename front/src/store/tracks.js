import gql from 'graphql-tag'

let initial_filters = {
  search: '',
  style: 0,
  user: 0,
  skip: 0,
  pending: 0,
  invalid: 0,
}

const state = {
  tracks: [],
  tracksPerPage: 50,
  order: 'createdAt_DESC',
  filters: initial_filters,
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
  SET_FILTER(state, filter) {
    state.filters[filter.type] = filter.value
  },
  RESET_FILTERS(state) {
    state.filters = initial_filters
  },
}

const actions = {
  resetTracks(store) {
    store.commit('RESET_FILTERS')
  },
  filterTracks(store, filter) {
    if (filter.value !== store.state.filters[filter.type] || filter.type === 'skip' || store.state.filters.invalid !== 0 || store.state.filters.pending !== 0) {
      if (filter.type === 'home') {
        store.commit('SET_FILTER', { type: 'user', value: 0 })
        store.commit('SET_FILTER', { type: 'style', value: 0 })
      }
      if (filter.type === 'style') {
        store.commit('SET_FILTER', { type: 'user', value: 0 })
      }
      if (filter.type === 'pending') {
        store.commit('SET_FILTER', { type: 'pending', value: filter.value })
      }
      else {
        store.commit('SET_FILTER', { type: 'pending', value: 0 })
      }
      if (filter.type === 'invalid') {
        store.commit('SET_FILTER', { type: 'invalid', value: filter.value })
      }
      else {
        store.commit('SET_FILTER', { type: 'invalid', value: 0 })
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
      }).catch(() => {
        console.log('%c●', 'color: red', 'filter error')
      })
    }
  },
  filterFavorites(store) {
    store.commit('RESET_FILTERS')
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
