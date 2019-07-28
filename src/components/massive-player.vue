<template>
  <main :data-player-state="currentState" :class="'state-'+this.$store.state.appState+' current-style-'+currentStyle">
    <header class="massive-header">
      <div class="massive-header__top">
        <navigation @changeStyleFilter="styleFilter($event)" :toggle="toggle" />
        <router-link to="/" tag="button">
          <massiveLogo class="massive-logo"/>
        </router-link>
        <button class="massive-search-toggle" @click="toggle('4-search')">
          <icon-search/>
        </button>
      </div>
      <div class="massive-header__bottom">
        <input class="massive-header__search" type="search" v-model="currentQuery" @keyup.enter="blurSearch($event)"/>
        <i class="massive-header__search-reset" @click="resetSearch($event)">
          <icon-close/>
        </i>
      </div>
    </header>
    <section class="massive-player">
      <youtube :ytid="firstTrack" ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="updatePlayerState"></youtube>
      <img class="massive-player__top" :src="'https://i.ytimg.com/vi/'+currentYtid+'/hqdefault.jpg'"/>
      <div class="massive-player__bottom">
        <div class="playback-bar">
          <div class="playback-bar__progress-time">
            {{ currentTime }}
          </div>
          <div class="progress-bar">
            <progress class="progress-bar__buffer" :value="currentBuffer" max="100"></progress>
            <input class="progress-bar__cursor" type="range" :value="currentProgress" step="0.125" max="100" @input="seekPlayer"/>
            <!-- for chrome only : -->
            <progress class="progress-bar__progress" :value="currentProgress" max="100"></progress>
          </div>
          <div class="playback-bar__progress-time">
            {{ totalTime }}
          </div>
        </div>
        <div class="control-bar">
          <button  class="player-play">
            <icon-star/>
          </button>
          <button  class="player-prev" @click="playPrev">
            <icon-prev/>
          </button>
          <button  class="player-play" @click="togglePlay">
            <icon-play/>
            <icon-pause/>
          </button>
          <button  class="player-next" @click="playNext">
            <icon-next/>
          </button>
          <button  class="player-up" @click="toggle('6-player-full')">
            <icon-up/>
          </button>
        </div>
        <p class="player-infos">
          <b class="current-title">
            {{ currentTitle }}
          </b>
          <span class="current-artist">
            {{ currentArtist }}
          </span>
        </p>
        <div class="player-volume">
          <button @click="toggleVolume">
            <icon-volume-high/>
            <icon-volume-off/>
          </button>
          <div class="volume-bar">
            <input class="volume-bar__cursor" type="range" max="100" :value="currentVolume" @input="updatePlayerVolume"/>
            <!-- for chrome only : -->
            <progress class="volume-bar__progress" :value="currentVolume" max="100"></progress>
          </div>
        </div>
      </div>
    </section>
    <router-view @trackListReady="trackListReady" :player="propRef" :play="play" :togglePlay="togglePlay" :setAppState="setAppState" :currentStyle="currentStyle" :currentQuery="currentQuery"></router-view>
  </main>
</template>

<script>
  import navigation from './navigation.vue'
  import massiveLogo from './massive-logo.vue'
  export default {
    name: 'massiveplayer',
    components: {
      navigation,
      massiveLogo,
    },
    data() {
      return {
        firstTrack: '',
        playerVars: {height: '0'},
        totalTime: 0,
        currentTime: 0,
        currentStateId: 0,
        currentProgress: 0,
        currentBuffer: 0,
        currentVolume: 0,
        currentYtid: '',
        currentTitle: '',
        currentArtist: '',
        currentStyle: '',
        currentQuery: '',
        propRef: '',
        isLoadedPlayer: false,
        isLoadedTracklist: false,
        isAppReady: false,
      }
    },
    computed: {
      player() {
        return this.$refs.yt.player
      },
      currentState() {
        switch(this.currentStateId) {
          case -1:
            return 'unstarted'
          case 0:
            return 'ended'
          case 1:
            return 'playing'
          case 2:
            return 'paused'
          case 3:
            return 'buffering'
          case 5:
            return 'video-cued'
          default:
            return ''
        }
      },
    },
    methods: {
      formatTime(time) {
        time = Math.round(time)
        let minutes = Math.floor(time / 60),
        seconds = parseInt(time - minutes * 60)
        seconds = seconds < 10 ? '0' + seconds : seconds
        if(!isNaN(minutes) && !isNaN(seconds)) {
          return minutes + ':' + seconds
        }
        else {
          return '0:00'
        }
      },
      setAppState(state) {
        this.$store.commit('setAppState', state)
      },
      updatePlayerState() {
        this.currentStateId = this.player.getPlayerState()
      },
      updatePlayerTime() {
        this.currentTime = this.formatTime(this.player.getCurrentTime())
        this.totalTime = this.formatTime(this.player.getDuration())
      },
      updatePlayerProgress() {
        this.currentProgress = (this.player.getCurrentTime() / this.player.getDuration()) * 100
      },
      updatePlayerBuffer() {
        this.currentBuffer = (this.player.getVideoLoadedFraction() * 100)
      },
      updatePlayerVolume(e) {
        this.player.setVolume(e.target.value)
        this.currentVolume = e.target.value
      },
      initPlayerVolume() {
        this.currentVolume = this.player.getVolume()
      },
      seekPlayer(e) {
        // let percent = ((e.x - e.target.offsetLeft) / e.target.offsetWidth) * 100
        let percent = e.target.value
        let duration = this.player.getDuration()
        let seekToSecond = (percent * duration) / 100

        this.currentProgress = percent
        this.player.seekTo(seekToSecond)
      },
      togglePlay() {
        if(this.player.getPlayerState() == 1) {
          this.player.pauseVideo()
        }
        else {
          this.player.playVideo()
        }
      },
      toggleVolume() {
        if(this.player.isMuted()) {
          this.player.unMute()
        }
        else {
          this.player.mute()
        }
      },
      play(track) {
        if(this.currentYtid == track.id_yt) {
          this.togglePlay()
        }
        else {
          this.player.stopVideo()
          this.player.loadVideoById(track.id_yt)
          this.currentYtid = track.id_yt
          this.currentTitle = track.title
          this.currentArtist = track.artist
          this.currentStyle = track.style
          if(document.querySelector('.track--playing') !== null) {
            document.querySelector('.track--playing').classList.remove('track--playing')
          }
          document.querySelector('[data-id="'+track.id_yt+'"]').classList.add('track--playing')
        }
      },
      playPrev() {
        let currentTrack = document.querySelector('.track--playing')
        if(currentTrack != null) {
          if(currentTrack.previousSibling) {
            let prevId = currentTrack.previousSibling.getAttribute('data-id')
            if(prevId) {
              currentTrack.previousSibling.click()
              // this.play(prevId)
            }
          }
        }
      },
      playNext() {
        if(document.querySelector('.track--playing') != null) {
          let currentTrack = document.querySelector('.track--playing')
          if(currentTrack.nextSibling) {
            let nextId = currentTrack.nextSibling.getAttribute('data-id')
            if(nextId) {
              currentTrack.nextSibling.click()
              // this.play(nextId)
            }
          }
        }
        else {
          if(document.querySelector('.tracks .track:first-child')) {
            document.querySelector('.tracks .track:first-child').click()
          }
        }
      },
      styleFilter(id) {
        if(this.currentStyle == id) {
          this.currentStyle = ''
        }
        else {
          this.currentStyle = id
        }
      },
      toggle(toggleState) {
        if(this.$store.state.appState == toggleState) {
          this.setAppState('3-player-open')
        }
        else {
          this.setAppState(toggleState)
          if(this.$store.state.appState == '4-search') {
            document.querySelector('.massive-header__search').focus()
          }
        }
      },
      blurSearch($event){
        $event.target.blur()
        this.setAppState('3-player-open')
      },
      resetSearch() {
        this.currentQuery = ''
        document.querySelector('.massive-header__search').focus()
      },
      resetApp() {
        this.currentQuery = ''
        this.currentStyle = ''
        this.setAppState('3-player-open')
      },
      loadFirstTrack() {
        this.playNext()
        this.player.pauseVideo()
      },
      appReady() {
        if(this.isAppReady == false) {
          this.isAppReady = true
          this.loadFirstTrack()
          this.setAppState('2-init-screen')
          this.setAppState('3-player-open')
        }
      },
      trackListReady() {
          this.isLoadedTracklist = true
          if(this.isLoadedPlayer) {
            this.appReady()
          }
      },
      playerReady() {
        this.isLoadedPlayer = true
        this.initPlayerVolume()
        setInterval(function() {
          this.updatePlayerTime()
          this.updatePlayerProgress()
          this.updatePlayerBuffer()
        }.bind(this), 500)
        this.propRef = this.$refs.yt.player
        if(this.isLoadedTracklist) {
          this.appReady()
        }
      },
    }
  }
</script>

<style lang="scss">
  .massive-header {
    position: fixed;
    z-index: $z-layer-header;
    top: 0;
    width: 100%;
    height: $header-height;
    display: flex;
    flex-direction: column;
    &__search {
      width: 80%;
      font-size: 24px;
      height: $search-height;
      border: none;
      background-color: rgb(43, 43, 43);
      padding: 16px;
      margin: 0 16px;
      font-size: 18px;
      color: white;
    }
    &__search-reset {
      position: relative;
      right: 45px;
      cursor: pointer;
    }
    &__top {
      z-index: $z-layer-header;
      background-color: $header-bkg;
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
    &__bottom {
      text-align: center;
      width: 100%;
      position: relative;
      top: 0;
      transition: all 0.3s;
      position: relative;
      height: $search-height;
      top: -$search-height;
      z-index: $z-layer-search;
      opacity: 0;
      .state-4-search & {
        top: calc(20vh);
        opacity: 1;
      }
    }
  }
  .massive-player {
    z-index: $z-layer-player;
    position: fixed;
    bottom: -$player-height+10;
    transition: all .3s;
    width: 100%;
    background-color: $ui-bkg;
    transition: 0.3s all;
    .state-3-player-open & {
      bottom: 0;
    }
    .state-6-player-full & {
      height: 100vh;
      bottom: 0;
    }
    iframe {
      display: none;
    }
    &__top {
      position: fixed;
      z-index: $z-layer-player;
      top: 0;
      height: 0vh;
      width: 100%;
      object-fit: cover;
      .state-6-player-full & {
        position: fixed;
        width: 100%;
        height: 50vh;
        top: 0;
      }
    }
    &__bottom {
     .state-6-player-full & {
        position: fixed;
        width: 100%;
        height: 50vh;
        bottom: 0;
      }
    }
    .control-bar {
      display: flex;
      justify-content: space-around;
      height: 40px;;
    }
    .playback-bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      margin-top: -20px;
      &__progress-time {
        font-size: 12px;
        color: $third-color;
        padding: 0 8px;
      }
      .progress-bar {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        position: relative;
        &:hover {
          .progress-bar__buffer {
            height: $global-ui-bar-height-hover;
          }
        }
        &__buffer, &__progress {
          position: absolute;
          z-index: 0;
          width: 100%;
          transition: height 0.3s;
        }
        &__cursor {
          z-index: 10;
        }
        &__buffer {
          $buffer-color: $grey-6;
          &::-moz-progress-bar {
            background-color: $buffer-color;
          }
          &::-webkit-progress-value {
            background-color: $buffer-color;
          }
        }
      }
    }
    .player-infos {
      display: none;
      .state-6-player-full & {
        display: block;
      }
    }
    .player-volume {
      display: none;
      .volume-bar {
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        
        &__cursor {
          position: relative;
          left: 0;
          z-index: 10;
        }
        &__progress {
          z-index: 0;
          position: absolute;
          left: 0;
          width: 100%;
          border: none;
          outline: none;
        }
      }
    }
  }
</style>
