import YouTubePlayer from 'youtube-player'

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
      window.playerReady = true
      if(window.tracklistReady) {
        store.dispatch('loadFirstTrack')
      }
    })
    player.on('stateChange', function (event) {
      let newState = event.target.getPlayerState()
      store.commit('SET_PLAYER_STATUS', newState)
      if(newState == 0) { // ended track
        document.getElementsByClassName('player-next')[0].click()
      }
    })
    player.on('error', function (event) {
      let id = store.getters.playerTrack.id
      if([100, 101, 150].includes(event.data)) {
        // axios
        //   .get(window.APIURL+'/tracks/invalidate/'+id)
        //   .then(() => {
        //     if(document.getElementsByClassName(id)[0]) {
        //       document.getElementsByClassName(id)[0].classList.add('track--invalidate')
        //     }
        //     let nextTrack = store.getters.nextTrack
        //     if(nextTrack) {
        //       store.dispatch('play', nextTrack)
        //     }
        //   })
      }
      else if(event.data == 2) {
        console.log('id: '+id+', id error')
      }
      else if(event.data == 5) {
        console.log('id: '+id+' html5 player error')
      }
    })
  },
  play(store, track) {
    let player = window.PLAYER
    let playerTrack = store.getters.playerTrack
    let playerState = store.getters.playerState
    if(track) {
      if(track.id != playerTrack.id) {
        if(document.getElementsByClassName('track--playing')[0]) {
          document.getElementsByClassName('track--playing')[0].classList.remove('track--playing')
        }
        if(document.getElementsByClassName(track.id)[0]) {
          document.getElementsByClassName(track.id)[0].classList.add('track--playing')
        }
        store.commit('SET_TRACK', track)
        // prevent fast clicking prev/next buttons
        clearTimeout(playTimeout)
        playTimeout = setTimeout(()=>{
          player.stopVideo()
          player.seekTo(0)
          player.loadVideoById(track.id)
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
  loadFirstTrack(store) {
    let firstTrack = store.getters.firstTrack
    store.commit('SET_TRACK', firstTrack)
    window.PLAYER.loadVideoById(firstTrack.id)
    if(window.tracklistReady) {
      document.getElementsByClassName(firstTrack.id)[0].classList.add('track--playing')
    }
  }
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
  playerStyle(state) {
    if(state.track.style) {
      return state.track.style.id
    }
    else {
      return ''
    }
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
