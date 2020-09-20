import YouTubePlayer from 'youtube-player'
import gql from 'graphql-tag'

let playTimeout = ''

const state = {
  id: -1, // UNSTARTED -1 ENDED 0 PLAYING 1 PAUSED 2 BUFFERING 3 CUED 5
  track: {},
  volume: 66,
}

const mutations = {
  SET_PLAYER_STATE(state, newState) {
    state.id = newState
  },
  SET_TRACK(state, track) {
    state.track = track
  },
  SET_VOLUME(state, volume) {
    state.volume = volume
  }
}

const actions = {
  initPlayer(store) {
    let player = window.PLAYER = YouTubePlayer('player', {playerVars: {'controls': 0, 'showinfo': 0}})
    player.on('ready', function() {
      player.setVolume(store.getters.volume)
    })
    player.on('stateChange', function (event) {
      let newState = event.target.getPlayerState()
      store.commit('SET_PLAYER_STATE', newState)
      if(newState === 0) { // ended track
        document.getElementsByClassName('player-next')[0].click()
      }
      if(newState === 1) {                      // if playing
        if(store.getters.playerTrack.invalid) { // invalid track
          window.apollo.mutate({                // re-validate it
            variables: {
              user_id: store.getters.session.user.id,
              token: store.getters.session.token,
              id: store.getters.playerTrack.id,
            },
            mutation: gql`mutation($user_id: Int!, $token: String!, $id: Int!) {
              validatePost(user_id: $user_id, token: $token, id: $id) {
                id
              }
            }`,
          }).then(() => {
            let validatedTrack = {...store.getters.playerTrack}
            validatedTrack = false
            store.commit('UPDATE_TRACK', validatedTrack)
          }).catch((error) => {
            this.error = error.message.replace('GraphQL error: ', '')
            console.log('%c●', 'color: red', 'validate error: ', this.error)
          })
        }
      }
    })
    player.on('error', function (event) { // 2-invalidID 5-HTML5PlayerError 100-removedOrPrivate 101-150-forbiddenVideo
      let id = store.getters.playerTrack.id
      if([2 ,100, 101, 150].includes(event.data)) {
        window.apollo.mutate({
          variables: {
            id: id,
          },
          mutation: gql`mutation($id: Int!) {
            invalidatePost(id: $id) {
              id
            }
          }`,
        }).then(() => {
          document.getElementsByClassName(store.getters.playerTrack.yt_id)[0].classList.add('track--invalid')
        }).catch((error) => {
          console.log('%c●', 'color: red', 'invalidate error: ', error.message.replace('GraphQL error: ', ''))
        })
      }
      else if(event.data == 5) {
        console.log('%c●', 'color: red', 'id: '+id+' html5 player error')
      }
      document.getElementsByClassName('player-next')[0].click()
    })
  },
  play(store, track) {
    let player = window.PLAYER
    let playerTrack = store.getters.playerTrack
    let playerState = store.getters.playerState

    let currentIndex = store.getters.tracks.indexOf(track) + 1
    let limit = store.getters.tracksPerPage + store.getters.filters.skip - 5
    if(currentIndex > limit) {
      store.dispatch('filterTracks', { type: 'skip', value: '' })
    }

    if(track) {
      if(track.yt_id != playerTrack.yt_id) {
        store.dispatch('ui', {type: 'player', value: true})
        if(document.getElementsByClassName('track--playing')[0]) {
          document.getElementsByClassName('track--playing')[0].classList.remove('track--playing')
        }
        if(document.getElementsByClassName(track.yt_id)[0]) {
          document.getElementsByClassName(track.yt_id)[0].classList.add('track--playing')
        }
        store.commit('SET_TRACK', track)
        // prevent fast clicking prev/next buttons
        clearTimeout(playTimeout)
        playTimeout = setTimeout(()=>{
          player.stopVideo()
          player.seekTo(0)
          player.loadVideoById(track.yt_id)
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
    let firstTrack = store.getters.first
    store.commit('SET_TRACK', firstTrack)
    window.PLAYER.loadVideoById(firstTrack.yt_id)
  }
}

const getters = {
  player(state) {
    return state.player
  },
  playerState(state) {
    switch(state.id) {
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
  volume(state) {
    return state.volume
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
