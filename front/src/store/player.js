import YouTubePlayer from 'youtube-player'
import axios from 'axios'

let playTimeout = ''

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
      store.dispatch('setAppStatus', 'init')
      let firstId = store.getters.firstTrack.id_yt
      window.PLAYER.loadVideoById(firstId)
      document.getElementsByClassName(firstId)[0].classList.add('track--playing')
    })
    player.on('stateChange', function (event) {
      let newState = event.target.getPlayerState()
      store.commit('SET_PLAYER_STATUS', newState)
      if(newState == 0) { // ended track
        store.dispatch('play', store.getters.nextTrack)
      }
    })
    player.on('error', function (event) {
      let id_yt = store.getters.playerTrack.id_yt
      if([100, 101, 150].includes(event.data)) {
        axios
          .get(window.APIURL+'/tracks/invalidate/'+id_yt)
          .then(() => {
            if(document.getElementsByClassName(id_yt)[0]) {
              document.getElementsByClassName(id_yt)[0].classList.add('track--invalidate')
            }
            let nextTrack = store.getters.nextTrack
            if(nextTrack) {
              store.dispatch('play', nextTrack)
            }
          })
      }
      else if(event.data == 2) {
        console.log('id: '+id_yt+' id error')
      }
      else if(event.data == 5) {
        console.log('id: '+id_yt+' html5 player error')
      }
    })
  },
  play(store, track) {
    let player = window.PLAYER
    let playerTrack = store.getters.playerTrack
    let playerState = store.getters.playerState
    if(track) {
      if(track.id_yt != playerTrack.id_yt) {
        if(document.getElementsByClassName('track--playing')[0]) {
          document.getElementsByClassName('track--playing')[0].classList.remove('track--playing')
        }
        if(document.getElementsByClassName(track.id_yt)[0]) {
          document.getElementsByClassName(track.id_yt)[0].classList.add('track--playing')
        }
        store.commit('SET_TRACK', track)
        // prevent fast clicking prev/next buttons
        clearTimeout(playTimeout)
        playTimeout = setTimeout(()=>{
          player.stopVideo()
          player.seekTo(0)
          player.loadVideoById(track.id_yt)
        }, 333)
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
