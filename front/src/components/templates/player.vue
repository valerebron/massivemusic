<template>
  <section class="player">
    <div class="player__top" @click="$store.dispatch('play', track)">
      <!-- <img class="player__top cover-image" :src="'https://i.ytimg.com/vi/'+track.yt_id+'/hqdefault.jpg'" @click="play(track)"/> -->
      <div id="player"></div>
    </div>
    <div class="player__bottom">
      <div class="playback-bar">
        <div class="playback-bar__progress-time">
          {{ currentTime | formatTime }}
        </div>
        <div class="progress-bar">
          <progress class="progress-bar__buffer" :value="buffer" max="100"></progress>
          <input class="progress-bar__cursor" type="range" :value="progress" step="0.125" max="100" @input="seekPlayer"/>
          <!-- for chrome only : -->
          <progress class="progress-bar__progress" :value="progress" max="100"></progress>
        </div>
        <div class="playback-bar__progress-time">
          {{ duration | formatTime }}
        </div>
      </div>
      <div class="control-bar">
        <div class="track__img" @click="toggleFull()">
          <img :src="'https://i.ytimg.com/vi/'+track.yt_id+'/default.jpg'" :alt="track.title+' cover'">
          <button  class="player-up" aria-label="toggle fullscreen player">
            <icon-up-down/>
          </button>
        </div>
        <button  class="player-prev" @click="$store.dispatch('playPrev', track)" aria-label="play previous track">
          <icon-prev/>
        </button>
        <button class="player-play" @click="$store.dispatch('play', track)" aria-label="play">
          <icon-play-pause/>
          <loader v-if="$store.getters.playerState === 'buffering'" />
        </button>
        <button  class="player-next" @click="$store.dispatch('playNext', track)" aria-label="play next track">
          <icon-next/>
        </button>
        <p class="player-infos">
          <button  class="player-star" @click="$store.dispatch('toggleFavorite', track)" aria-label="add current track to favorite">
            <icon-star-inline v-if="$store.getters.isFavorite(track)" />
            <icon-star-outline v-else />
          </button>
          <span class="player-title">
            {{ track.title }}
          </span>
          <span class="player-artist" @click.prevent="filterByArtist(track.artist)">
            {{ track.artist }}
          </span>
        </p>
        <div class="player-volume">
          <button @click="toggleVolume" aria-label="toggle volume">
            <div class="player-volume__icon-container">
              <icon-volume-high class="player-volume__icon"/>
              <i class="player-volume__crossed" :class="{ 'player-volume__crossed--muted': volume == 0 }"></i>
            </div>
          </button>
          <div class="volume-bar">
            <input class="volume-bar__cursor" type="range" max="100" :value="volume" @input="updatePlayerVolume($event.target.value)"/>
            <!-- for chrome only : -->
            <progress class="volume-bar__progress" :value="volume" max="100"></progress>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import iconPlayPause from '@/assets/icon-play-pause.vue'
  import iconUpDown from '@/assets/icon-up-down.vue'
  import loader from '@/components/atoms/loader.vue'
  export default {
    name: 'player',
    components: {
      iconPlayPause,
      iconUpDown,
      loader,
    },
    data: function() {
      return {
        duration: 0,
        currentTime: 0,
        loaded: 0,
        standByVolume: 0,
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
      volume: {
        get(){ return this.$store.getters.volume },
        set(value){ this.$store.commit('SET_VOLUME', value) }
      },
    },
    methods: {
      seekPlayer(e) {
        let self = this
        let percent = e.target.value
        self.player.getDuration().then(function(duration) {
          self.progress = percent
          let seekToSecond = (percent * duration) / 100
          self.player.seekTo(seekToSecond)
        })
      },
      updatePlayerVolume(volume) {
        this.player.setVolume(volume)
        this.volume = volume
      },
      toggleVolume() {
        if(this.volume == 0) {
          this.volume = this.standByVolume
        }
        else {
          this.standByVolume = this.volume
          this.volume = 0
        }
        this.updatePlayerVolume(this.volume)
      },
      toggleFull() {
        if(this.$store.getters.ui.full) {
          this.$store.dispatch('ui', {type: 'full', value: false})
        }
        else {
          this.$store.dispatch('ui', {type: 'full', value: true})
        }
      },
      filterByArtist(artist) {
        this.$store.dispatch('filterTracks', {type: 'search', value: artist})
      },
      refreshPlayer() {
        let self = this
        setInterval(async function() {
          self.duration = await self.player.getDuration()
          self.currentTime = await self.player.getCurrentTime()
          self.loaded = await self.player.getVideoLoadedFraction()
        }, 500)
      },
    },
    mounted: function() {
      this.refreshPlayer()
      this.$store.dispatch('initPlayer')
    },
  }
</script>

<style lang="scss">
  .player {
    z-index: $z-index-player;
    position: fixed;
    bottom: 0;
    transition: all .3s;
    width: 100%;
    background-color: $app-bkg;
    transition: 0.3s all;
    transform: translateY(110%);
    &__top {
      z-index: $z-index-player;
      height: 0vh;
      cursor: pointer;
      object-fit: cover;
      // background: black;
      position: fixed;
      width: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      #player {
        transform: scale(2);
        width: 100vw;
        height: 0;
        pointer-events: none;
        transition: all 0.3s;
        pointer-events: none;
      }
      &.cover-image {
        cursor: pointer;
        opacity: 0;
        transition: opacity 1s;
        .player-paused &, .player-unstarted &  {
          transition: opacity 0s;
          opacity: 1;
        }
      }
    }
    &__bottom {
      z-index: $z-index-player;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: $player-height;
      transition: .3s height;
      transition: 1s opacity;
    }
    .control-bar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: $control-bar-height;
      .track__img {
        position: relative;
        height: 80px;
        cursor: pointer;
        &:hover {
          .player-up {
            opacity: 1;
          }
        }
        .player-up {
          opacity: 0;
          transition: opacity .3s;
          top: calc(50% - (36px / 2));
          left: calc(50% - (60px / 2));
          position: absolute;
          background-color: rgba($grey-3, .5);
        }
      }
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
    }
    .player-star {
      .ion__svg {
        height: 25px;
        width: 25px;
        fill: $favorite-color;
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
        color: $app-color;
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
      position: absolute;
      align-items: center;
      justify-content: flex-start;
      display: flex;
      margin: 0;
      overflow: hidden;
      transition: height .3s;
      font-size: 14px;
      line-height: 140%;
      flex-grow: 2;
      top: 12px;
      height: 12px;
      @include breakpoint(tablet) {
        height: 100%;
        justify-content: center;
        position: static;
      }
      @include breakpoint(tablet, only) {
        // flex-direction: column;
        font-size: 2vw;
      }
      @include breakpoint(desktop, only) {
        font-size: 1.8vw;
      }
      @include breakpoint(bigscreen) {
        font-size: 1.5vw;
      }
      .player-title {
        @extend %currentStyleColor;
      }
      .player-artist {
        margin-left: 1vw;
      }
    }
    .player-up {
      display: flex;
    }
    .player-volume {
      display: none;
      @include breakpoint(phablet) {
        display: flex;
      }
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
        transition: clip-path .2s ease, background-color .2s ease;
        clip-path: polygon(100% 100%, 75% 100%, 100% 100%, 75% 100%);
        &--muted {
          clip-path: polygon(10% 14%, 25% 14%, 100% 100%, 85% 100%);
        }
      }
      .volume-bar {
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        width: 10vw;
        margin-top: -4px;
        margin-right: 20px;
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
