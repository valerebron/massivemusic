import YouTubePlayer from 'youtube-player'
import axios from 'axios'

const state = {
  playerStatusId: -1, // UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5
  track: {},
}

const mutations = {
  SET_PLAYER_STATUS(state, newState) {
    state.playerStatusId = newState
  },
  SET_TRACK(state, track) {
    state.track = track
  },
}

const actions = {
  initPlayer(store) {
    let player = window.PLAYER = YouTubePlayer('player', {playerVars: {'controls': 0, 'showinfo': 0}})
    player.on('ready', function() {
      if(localStorage.volume) {
        player.setVolume(localStorage.volume)
      }
      else {
        player.getVolume().then((volume) => { localStorage.volume = volume })
      }
      store.dispatch('setAppStatus', '2-init-screen')
      store.dispatch('play', store.getters.firstTrack)
    })
    player.on('stateChange', function (event) {
      store.commit('SET_PLAYER_STATUS', event.target.getPlayerState())
    })
    player.on('error', function (event) {
      console.log('player error:', event.data)
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
}

export default {
  state,
  mutations,
  actions,
  getters,
}
