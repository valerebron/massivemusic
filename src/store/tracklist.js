import Fuse from 'fuse.js'

const state = {
  status: 'init', // tracks-loaded
  tracks: {
    loaded: [],
    filtered: [],
  },
  scope: 20,
  filters: {
    search: '',
    style: '',
    artist: '',
    member: '',
    id: [],
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
            state.tracks.filtered = state.tracks.filtered.filter(track => track.style.id == filter.value)
          }
        break
        case 'artist':
            if(filter.value != '') {
              state.tracks.filtered = state.tracks.filtered.filter(track => track.artist == filter.value)
            }
        break
        case 'id':
            if(filter.value != '') {
              state.tracks.filtered = state.tracks.filtered.filter(track => filter.value.includes(track.id))
            }
        break
        case 'search':
            if(filter.value != '') {
              let searchOptions = {
                shouldSort: true,
                threshold: 0.44,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: ['title', 'artist']
              }
              let fuse = new Fuse(state.tracks.filtered, searchOptions)
              state.tracks.filtered = fuse.search(filter.value)
            }
        break
      }
    })
  },
  STRETCH_SCOPE(state) {
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
  },
  setFilter(store, newFilter) {
    store.commit('UPDATE_FILTER', newFilter)
    store.commit('APPLY_FILTERS')
  },
  stretchScope(store) {
    store.commit('STRETCH_SCOPE')
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
  nb_tracks(state) {
    return state.tracks.filtered.length
  },
  scope(state) {
    return state.scope
  },
  search(state) {
    return state.filters.search
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
