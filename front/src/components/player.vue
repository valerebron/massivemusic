<template>
  <section class="player">
    <div class="player__top">
      <!-- <img class="player__top cover-image" :src="'https://i.ytimg.com/vi/'+track.id_yt+'/hqdefault.jpg'" @click="play(track)"/> -->
      <div id="player"></div>
    </div>
    <div class="player__bottom">
      <div class="playback-bar">
        <div class="playback-bar__progress-time">
          {{ formatTime(currentTime) }}
        </div>
        <div class="progress-bar">
          <progress class="progress-bar__buffer" :value="buffer" max="100"></progress>
          <input class="progress-bar__cursor" type="range" :value="progress" step="0.125" max="100" @input="seekPlayer"/>
          <!-- for chrome only : -->
          <progress class="progress-bar__progress" :value="progress" max="100"></progress>
        </div>
        <div class="playback-bar__progress-time">
          {{ formatTime(duration) }}
        </div>
      </div>
      <div class="control-bar">
        <button  class="player-prev" @click="playPrev">
          <icon-prev/>
        </button>
        <button class="player-play" @click="play(track)">
          <icon-play-pause/>
          <loader />
        </button>
        <button  class="player-next" @click="playNext">
          <icon-next/>
        </button>
        <p class="player-infos">
          <span class="player-title">
            {{ track.title }}
          </span>
          <span class="player-artist" @click.prevent="filterByArtist(track.artist)">
            {{ track.artist }}
          </span>
        </p>
        <div class="player-volume">
          <button @click="toggleVolume">
            <div class="player-volume__icon-container">
              <icon-volume-high class="player-volume__icon"/>
              <i class="player-volume__crossed" :class="{ 'player-volume__crossed--muted': volume == 0 }"></i>
            </div>
          </button>
          <div class="volume-bar">
            <input class="volume-bar__cursor" type="range" max="100" :value="volume" @input="updatePlayerVolume"/>
            <!-- for chrome only : -->
            <progress class="volume-bar__progress" :value="volume" max="100"></progress>
          </div>
        </div>
        <button  class="player-star" @click="$store.dispatch('toggleFavorite', track.id_yt)">
          <icon-star-inline v-if="isFavorite(track.id_yt)" />
          <icon-star-outline v-else />
        </button>
        <button  class="player-up" @click="$store.dispatch('setAppStatus', '5-player-full')">
          <icon-up-down/>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  import iconPlayPause from '../assets/icon-play-pause.vue'
  import iconUpDown from '../assets/icon-up-down.vue'
  import loader from '../assets/loader.vue'
  export default {
    name: 'player',
    components: {
      iconPlayPause,
      iconUpDown,
      loader,
    },
    data: function() {
      return {
        volume: 0,
        duration: 0,
        currentTime: 0,
        loaded: 0,
      }
    },
    computed: {
      track: {
        get(){ return this.$store.getters.playerTrack },
        set(value){ this.$store.commit('SET_TRACK', value) }
      },
      player() {
        return window.PLAYER
      },
      progress: {
        get(){ return (this.currentTime / this.duration) * 100 },
        set(){}
      },
      buffer: {
        get(){ return this.loaded * 100 },
        set(){}
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
      isFavorite(id_yt) {
        let favorites = this.$store.getters.favorites
        if(favorites !== null && favorites.indexOf(id_yt) != -1) {
          return true
        }
        else {
          return false
        }
      },
      updatePlayerVolume(e) {
        this.player.setVolume(e.target.value)
        this.volume = localStorage.volume = e.target.value
      },
      seekPlayer(e) {
        let self = this
        let percent = e.target.value
        self.player.getDuration().then(function(duration) {
          self.progress = percent
          let seekToSecond = (percent * duration) / 100
          self.player.seekTo(seekToSecond)
        })
      },
      toggleVolume() {
        if(this.volume == 0) {
          if(localStorage.volume == 0) {
            localStorage.volume = 33
          }
          this.player.setVolume(localStorage.volume)
          this.volume = localStorage.volume
        }
        else {
          localStorage.volume = this.volume
          this.player.setVolume(0)
          this.volume = 0
        }
      },
      play(track) {
        this.$store.dispatch('play', track)
      },
      playPrev() {
        let prevTrack = this.$store.getters.prevTrack
        if(prevTrack) {
          this.play(prevTrack)
        }
      },
      playNext() {
        let nextTrack = this.$store.getters.nextTrack
        if(nextTrack) {
          this.play(nextTrack)
        }
      },
      filterByArtist(artist) {
        this.$store.dispatch('setAppStatus', '2-init-screen')
        this.$store.dispatch('setFilter', {type: 'artist', value: artist})
      },
    },
    mounted: function() {
      let self = this
      self.$store.dispatch('initPlayer')
      // Update Player Infos
      setInterval(function() {
        self.player.getVolume().then((volume) => {self.volume = volume})
        self.player.getDuration().then((duration) => {self.duration = duration})
        self.player.getCurrentTime().then((currentTime) => {self.currentTime = currentTime})
        self.player.getVideoLoadedFraction().then((loaded) => {self.loaded = loaded})
      }, 500)
      // Keyboard aliases
      window.onkeydown = function(e) {
        console.log(e.key)
        switch(e.key) {
          case 'MediaPlayPause':
            self.play()
          break
          case 'MediaTrackNext':
            self.playNext()
          break
          case 'MediaTrackPrevious':
            self.playPrev()
          break
          case 'Escape':
            self.dispatch('setAppStatus', '2-init-screen')
          break
        }
      }
    },
  }
</script>

<style lang="scss">
  .player {
    z-index: $z-layer-player;
    position: fixed;
    transition: all .3s;
    width: 100%;
    // background: linear-gradient(transparent, black);
    // background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 100%);
    background-color: #000000a6;
    transition: 0.3s all;
    bottom: 0;
    .state-4-nav &, .state-3-search & {
      bottom: -$player-height - 10;
    }
    .state-5-player-full & {
      height: 100vh;
      bottom: 0;
    }
    &__top {
      position: fixed;
      z-index: $z-layer-player;
      top: 0;
      height: 0vh;
      width: 100%;
      object-fit: contain;
      background: black;
      .state-5-player-full & {
        position: fixed;
        width: 100%;
        height: calc(100vh - #{$player-height});
        top: 0;
      }
      #player {
        width: 100vw;
        height: 0;
        pointer-events: none;
        transition: all 0.3s;
        pointer-events: none;
        .state-5-player-full & {
          height: 100vh;
        }
      }
      &.cover-image {
        opacity: 0;
        transition: opacity 1s;
        .player-state-paused &, .player-state-unstarted &  {
          transition: opacity 0s;
          opacity: 1;
        }
      }
    }
    &__bottom {
      z-index: $z-layer-player;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: $player-height;
      transition: .3s height;
      transition: 1s opacity;
     .state-5-player-full & {
        position: fixed;
        width: 100%;
        bottom: 0;
        background-color: black;
      }
    }
    .control-bar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: $control-bar-height;
    }
    .player-next, .player-prev {
      @extend %currentStyleColor;
      display: flex;
      align-items: center;
      justify-content: center;
      // width: 0;
      // height: 0;
      // padding: 0;
      // border: none;
      // svg {
      //   width: 0;
      // }
      .ion__svg {
        height: 20px;
        width: 20px;
      }
      .state-5-player-full & {
        width: 44px;
        height: 64px;
        border: auto;
        svg {
          width: auto;
        }
      }
    }
    .player-star {
      .ion__svg {
        height: 25px;
        width: 25px;
        @extend %currentStyleColor;
      }
    }
    .player-play {
      position: relative;
      .loader {
        @extend %currentStyleStroke;
        position: absolute;
        left: 0;
      }
    }
    .player-artist {
      @extend %artistStyle;
    }
    .playback-bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      margin-top: -20px;
      &__progress-time {
        font-size: 12px;
        color: white;
        text-shadow: 1px 1px black;
        padding: 0 8px;
        cursor: default;
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
          background-color: #7373734f;
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
      margin: 0;
      text-align: center;
      overflow: hidden;
      transition: height .3s;
      font-size: 16px;
      line-height: 24px;
      flex-grow: 2;
      .player-title {
        @extend %currentStyleColor;
      }
    }
    .player-volume {
      display: flex;
      flex-direction: row;
      justify-content: center;
      &__icon-container {
        position: relative;
      }
      &__icon svg {
        height: 2em;
        width: 2em;
        @extend %currentStyleColor;
      }
      &__crossed {
        display: inline-block;
        position: absolute;
        left: 0px;
        @extend %currentStyleBkgColor;
        width: 26px;
        height: 26px;
        transition: clip-path .4s ease, background-color .2s ease;
        clip-path: polygon(100% 100%, 75% 100%, 100% 100%, 75% 100%);
        &--muted {
          clip-path: polygon(10% 0, 25% 0, 100% 100%, 85% 100%);
        }
      }
      .volume-bar {
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        width: 10vw;
        &__cursor {
          position: relative;
          left: 0;
          z-index: 10;
        }
        &__progress {
          background-color: #7373734f;
          &::-webkit-progress-bar {
            background-color: #7373734f;
          }
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
