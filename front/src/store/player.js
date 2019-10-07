import YouTubePlayer from 'youtube-player'
import axios from 'axios'

const state = {
  playerStatusId: -1, // UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5
  track: {},
  volume: 0,
  duration: 0,
  currentTime: 0,
  loaded: 0,
}

const mutations = {
  SET_PLAYER_STATUS(state, newState) {
    state.playerStatusId = newState
  },
  SET_TRACK(state, track) {
    state.track = track
  },
  SET_PLAYER_VOLUME(state, newState) {
    state.volume = newState
  },
  SET_PLAYER_DURATION(state, newState) {
    state.duration = newState
  },
  SET_PLAYER_CURRENT_TIME(state, newState) {
    state.currentTime = newState
  },
  SET_PLAYER_LOADED(state, newState) {
    state.loaded = newState
  },
}

const actions = {
  initPlayer(store) {
    let player = window.PLAYER = YouTubePlayer('player')
    player.on('ready', function() {
      store.dispatch('setAppStatus', '2-init-screen')
      setInterval(function() {
        player.getVolume().then((volume) => {store.commit('SET_PLAYER_VOLUME', volume)})
        player.getDuration().then((duration) => {store.commit('SET_PLAYER_DURATION', duration)})
        player.getCurrentTime().then((currentTime) => {store.commit('SET_PLAYER_CURRENT_TIME', currentTime)})
        player.getVideoLoadedFraction().then((loaded) => {store.commit('SET_PLAYER_LOADED', loaded)})
      }, 500)
    })
    player.on('stateChange', function (event) {
      store.commit('SET_PLAYER_STATUS', event.target.getPlayerState())
    })
    player.on('error', function (event) {
      console.log('player error', event.data)
      let id_yt = store.getters.playerTrack.id_yt
      axios
        .get(window.APIURL+'/tracks', {
          params: {
            id_yt: id_yt,
            action: 'invalidTrack'
          }
        })
        .catch(function(event) {
          console.log(event)
        })
        .then(() => {
          if(document.querySelector('.track[data-id="'+id_yt+'"]')) {
            document.querySelector('.track[data-id="'+id_yt+'"]').classList.add('track--invalidate')
          }
          let nextTrack = store.getters.nextTrack
          if(nextTrack) {
            store.dispatch('play', nextTrack)
          }
        })
    })
  },
  play(store, track) {
    let player = window.PLAYER
    let playerTrack = store.getters.playerTrack
    let playerState = store.getters.playerState
    if(track) {
      if(track.id_yt != playerTrack.id_yt) {
        player.seekTo(0)
        if(document.querySelector('.track--playing') !== null) {
          document.querySelector('.track--playing').classList.remove('track--playing')
        }
        if(document.querySelector('[data-id="'+track.id_yt+'"]')) {
          document.querySelector('[data-id="'+track.id_yt+'"]').classList.add('track--playing')
        }
        store.commit('SET_TRACK', track)
        player.stopVideo()
        player.loadVideoById(track.id_yt)
        store.dispatch('setPrevTrack', track)
        store.dispatch('setNextTrack', track)
      }
      else {
        if(playerState == 'playing') {
          player.pauseVideo()
        }
        else {
          player.playVideo()
        }
      }
    }
  },
}

const getters = {
  player(state) {
    return state.player
  },
  playerState(state) {
    switch(state.playerStatusId) {
      case -1 : return 'unstarted'
      case 0: return 'ended'
      case 1: return 'playing'
      case 2: return 'paused'
      case 3: return 'buffering'
      case 5: return 'cued'
    }
  },
  playerTrack(state) {
    return state.track
  },
  playerVolume(state) {
    return state.volume
  },
  playerTotalTime(state) {
    return state.duration
  },
  playerCurrentTime(state) {
    return state.currentTime
  },
  playerProgress(state) {
    return (state.currentTime / state.duration) * 100
  },
  playerBuffer(state) {
    return state.loaded * 100
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
