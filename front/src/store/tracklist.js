import Fuse from 'fuse.js'

const state = {
  status: 'init', // tracks-loaded
  tracks: {
    loaded: [],
    filtered: [],
    prev: {},
    next: {},
  },
  scope: 20,
  filters: {
    search: '',
    style: '',
    artist: '',
    member: '',
    id_yt: [],
  },
  order: {
    collumn: '',
    direction: '', // asc desc
  },
}

const mutations = {
  INIT_TRACKS(state, tracks) {
    state.tracks.loaded = tracks
    state.status = 'tracks-loaded'
  },
  RESET_FILTERS(state) {
    Object.keys(state.filters).forEach(filter => state.filters[filter] = '')
    state.scope = 20
    window.scrollTo(0, 0)
  },
  UPDATE_FILTER(state, newFilter) {
    state.filters[newFilter.type] = newFilter.value
    window.scrollTo(0, 0)
  },
  APPLY_FILTERS(state) {
    state.tracks.filtered = state.tracks.loaded
    Object.entries(state.filters).forEach(filter => {
      filter.name = filter[0]
      filter.value = filter[1]
      switch(filter.name) {
        case 'style':
          if(filter.value != '') {
            state.tracks.filtered = state.tracks.filtered.filter(track => track.style_id == filter.value)
          }
        break
        case 'artist':
            if(filter.value != '') {
              state.tracks.filtered = state.tracks.filtered.filter(track => track.artist == filter.value)
            }
        break
        case 'id_yt':
            if(filter.value != '') {
              state.tracks.filtered = state.tracks.filtered.filter(track => filter.value.includes(track.id_yt))
            }
        break
        case 'search':
            if(filter.value != '') {
              let fuse = new Fuse(state.tracks.filtered, {keys: ['title', 'artist']})
              state.tracks.filtered = fuse.search(filter.value)
            }
        break
      }
    })
  },
  SET_PREV_TRACK(state, track) {
    state.tracks.prev = track
  },
  SET_NEXT_TRACK(state, track) {
    state.tracks.next = track
  },
  ENLARGE_SCOPE(state) {
    state.scope = state.scope * 2
  },
}

const actions = {
  initTracks(store, tracks) {
    store.commit('INIT_TRACKS', tracks)
    store.commit('APPLY_FILTERS')
    store.commit('SET_TRACK', store.state.tracks.filtered[0])
  },
  resetTracks(store) {
    store.commit('RESET_FILTERS')
    store.commit('APPLY_FILTERS')
    store.dispatch('setNextTrack', store.getters.playerTrack)
  },
  setFilter(store, newFilter) {
    store.commit('UPDATE_FILTER', newFilter)
    store.commit('APPLY_FILTERS')
    store.dispatch('setNextTrack', store.getters.playerTrack)
  },
  enlargeScope(store) {
    store.commit('ENLARGE_SCOPE')
  },
  setPrevTrack(store, currentTrack) {
    let currentIndex = store.state.tracks.filtered.findIndex(track => track.id_yt == currentTrack.id_yt)
    let prevTrack = store.state.tracks.filtered[currentIndex - 1]
    if(prevTrack) {
      store.commit('SET_PREV_TRACK', prevTrack)
    }
  },
  setNextTrack(store, currentTrack) {
    let currentIndex = store.state.tracks.filtered.findIndex(track => track.id_yt == currentTrack.id_yt)
    let nextTrack = store.state.tracks.filtered[currentIndex + 1]
    if(nextTrack) {
      store.commit('SET_NEXT_TRACK', nextTrack)
    }
  },
}

const getters = {
  tracklistStatus(state) {
    return state.status
  },
  tracks(state) {
    return state.tracks.filtered.slice(0, state.scope)
  },
  firstTrack(state) {
    return state.tracks.filtered[0]
  },
  prevTrack(state) {
    return state.tracks.prev
  },
  nextTrack(state) {
    return state.tracks.next
  },
  nb_tracks(state) {
    return state.tracks.filtered.length
  },
  scope(state) {
    return state.scope
  },
  search(state) {
    return state.filters.search
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
