import gql from 'graphql-tag'
import router from '../router'

let initial_filters = {
  search: '',
  style: 0,
  user: 0,
  skip: 0,
  pending: false,
  invalid: false,
  empty: false,
  duration: false,
  reset: 0,
}

const state = {
  tracks: [],
  tracksPerPage: 50,
  order: 'createdAt_DESC',
  filters: initial_filters,
  count: 0,
  isLoading: false,
}

const mutations = {
  SET_TRACK_LOADING(state) {
    state.isLoading = true
  },
  SET_TRACK_NOT_LOADING(state) {
    state.isLoading = false
  },
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
  UPDATE_TRACK(state, editedTrack) {
    state.tracks.map(track => {
      if(track.yt_id === editedTrack.yt_id) {
        track = editedTrack
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
    state.filters = {
      search: '',
      style: 0,
      user: 0,
      skip: 0,
      pending: false,
      invalid: false,
      empty: false,
      duration: false,
    }
  },
  VALIDATE_TRACK(state, the_track) {
    state.tracks.map(track => {
      if(track.id === the_track.id) {
        track.pending = false
      }
    })
  },
  VALIDATE_ALL_TRACKS(state, type) {
    state.tracks.map(track => {
      if(track.pending && type === 'pending') {
        track.pending = false
      }
      else if(track.invalid && type === 'invalid') {
        track.invalid = false
      }
    })
  },
  DELETE_ALL_TRACKS(state) {
    state.tracks = []
  },
}

const actions = {
  async filterTracks(store, filter) {
    if(filter.value !== store.state.filters[filter.type] || filter.type === 'skip' || Array.isArray(filter) ) {
      let newSkip = store.state.filters.skip + store.state.tracksPerPage
      switch(filter.type) {
        case 'search':
          if(store.state.filters.style !== 0) {
            let styles = store.getters.styles
            let filteredStyle = store.state.filters.style
            let slug = styles.find(e => e.id === filteredStyle).slug
            if(filter.value !== '' && filter.value !== store.state.filters.search) {
              router.push('/'+slug+'/s/'+filter.value)
            }
            else {
              router.push('/'+slug)
            }
          }
          else {
            if(filter.value !== '' && filter.value !== store.state.filters.search) {
              if(router.history.current.path !== '/s/'+filter.value) {
                router.push('/s/'+filter.value)
              }
            }
            else {
              router.push('/')
            }
          }
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
        case 'reset':
          store.commit('RESET_FILTERS')
        break
        default:
          store.commit('SET_FILTER', {type: 'user', value: 0})
          store.commit('SET_FILTER', {type: 'style', value: 0})
          store.commit('SET_FILTER', {type: 'all', value: false})
          store.commit('SET_FILTER', {type: 'pending', value: false})
          store.commit('SET_FILTER', {type: 'invalid', value: false})
          store.commit('SET_FILTER', {type: 'empty', value: false})
          store.commit('SET_FILTER', {type: 'duration', value: false})
          store.commit('SET_FILTER', filter)
        break
      }
      // if filter style + filter search
      if(Array.isArray(filter)) { // (transtype)
        store.commit('SET_FILTER', filter[0])
        store.commit('SET_FILTER', filter[1])
      }
      const order = (filter.order === 'asc') ? 'asc' : 'desc'
      store.commit('SET_TRACK_LOADING')
      let res = await window.apollo.query({
        variables: {
          search: store.state.filters.search,
          style: store.state.filters.style,
          user: parseInt(store.state.filters.user),
          skip: store.state.filters.skip,
          first: store.state.tracksPerPage,
          orderBy: 'createdAt',
          orderDirection: order,
          pending: store.state.filters.pending,
          invalid: store.state.filters.invalid,
          empty: store.state.filters.empty,
          duration: store.state.filters.duration,
        },
        fetchPolicy: 'no-cache',
        query: gql`
          query(
              $search: String,
              $style: Int,
              $user: Int,
              $skip: Int!,
              $first: Int!,
              $orderBy: TrackOrderByInput!,
              $orderDirection: TrackOrderDirectionInput!,
              $pending: Boolean,
              $invalid: Boolean,
              $empty: Boolean,
              $duration: Boolean,
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
              empty: $empty,
              duration: $duration,
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
        store.commit('SET_TRACK_NOT_LOADING')
        console.log('%c●', 'color: red', 'filter error', e)
      })
      if(filter.type === 'skip') {
        store.commit('PUSH_TRACKS', res.data.tracks.tracks)
        store.commit('SET_TRACK_NOT_LOADING')
      }
      else if(res) {
        window.scroll(0, 0)
        store.commit('SET_TRACKS', res.data.tracks.tracks)
        store.commit('SET_COUNT', res.data.tracks.count)
        store.commit('SET_TRACK_NOT_LOADING')
      }
    }
  },
  filterFavorites(store) {
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
        syncFrontBot(token: $token, id: $id) {
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
    return res ? res.data.syncFrontBot : ''
  },
  async addTrack(store, track) {
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
      store.commit('PUSH_TRACK', res.data.post)
    }).catch((error) => {
      console.log('%c●', 'color: red', 'add-track error: ', error)
    })
  },
  async editTrack(store, track) {
    let res = await window.apollo.mutate({
      variables: {...track, token: store.getters.session.token},
      mutation: gql`mutation($user_id: Int!, $token: String!, $id: Int!, $yt_id: String, $title: String, $artist: String, $style: Int) {
        editPost(user_id: $user_id, token: $token, id: $id, yt_id: $yt_id, title: $title, artist: $artist, style: $style) {
          id
        }
      }`,
    }).catch((error) => {
      this.error = error.message.replace('GraphQL error: ', '')
      console.log('%c●', 'color: red', 'edit error: ', this.error)
    })
    if(res) {
      track = res.data.editPost
      store.commit('UPDATE_TRACK', track)
      return track
    }
  },
  async validateTrack(store, track) {
    await window.apollo.mutate({
      variables: {
        user_id: store.getters.session.user.id,
        token: store.getters.session.token,
        id: track.id,
      },
      mutation: gql`mutation($user_id: Int!, $token: String!, $id: Int!) {
        validatePost(user_id: $user_id, token: $token, id: $id) {
          id
        }
      }`,
    }).catch((error) => {
      this.error = error.message.replace('GraphQL error: ', '')
      console.log('%c●', 'color: red', 'validate error: ', this.error)
    })
    store.commit('VALIDATE_TRACK', track)
  },
  async validateAll(store, type) {
    await window.apollo.mutate({
      variables: {
        user_id: store.getters.session.user.id,
        token: store.getters.session.token,
        type: type,
      },
      mutation: gql`mutation($user_id: Int!, $token: String!, $type: String!) {
        validateAll(user_id: $user_id, token: $token, type: $type)
      }`,
    }).catch((e)=>{console.log(e)})
    store.commit('VALIDATE_ALL_TRACKS', type)
  },
  async deleteAll(store, type) {
    await window.apollo.mutate({
      variables: {
        user_id: store.getters.session.user.id,
        token: store.getters.session.token,
        type: type,
      },
      mutation: gql`mutation($user_id: Int!, $token: String!, $type: String!) {
        deleteAll(user_id: $user_id, token: $token, type: $type)
      }`,
    }).catch((e)=>{console.log(e)})
    store.commit('DELETE_ALL_TRACKS')
  },
  async dropTrack(store, track) {
    await window.apollo.mutate({
      variables: {
        user_id: store.getters.session.user.id,
        token: store.getters.session.token,
        id: track.id,
      },
      mutation: gql`mutation($user_id: Int!, $token: String!, $id: Int!) {
        dropPost(user_id: $user_id, token: $token, id: $id) {
          id
        }
      }`,
    }).catch((error) => {
      console.log('%c●', 'color: red', 'drop error: ', error)
    })
    store.commit('DROP_TRACK', track)
  },
}

const getters = {
  tracks: state => state.tracks,
  filters: state => state.filters,
  first: state => state.tracks[0],
  skip: state => state.filters.skip,
  order: state => state.order,
  search: state => state.filters.search,
  style: state => state.filters.style,
  user: state => state.filters.user,
  count: state => state.count,
  tracksPerPage: state => state.tracksPerPage,
  trackIsLoading: state => state.isLoading,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
