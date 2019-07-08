<template>
  <main :class="currentState">
    <section class="yt-player">
      {{ currentState }}
      <youtube ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="updatePlayerState"></youtube>
      <progress :value="currentProgress" max="100" @click="seekPlayer"></progress>
      <progress :value="currentBuffer" max="100"></progress>
      <button @click="togglePlay">Play/Pause</button>
      <button @click="playPrev">Prev</button>
      <button @click="playNext">Next</button>
      <button @click="toggleVolume">Mute</button>
      <input type="range" min="0" max="100" :value="currentVolume" @input="updatePlayerVolume">
      {{ currentTime }} / {{ totalTime }}
    </section>
    <section class="tracks">
      <article class="track" v-for="track in tracks" @click="play(track.id_yt)" :data-id="track.id_yt" :key="track.id_yt">
        {{ track.title }}
        {{ track.artist }}
      </article>
    </section>
  </main>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'yt-player',
    data() {
      return {
        playerVars: {height: '0'},
        totalTime: 0,
        currentTime: 0,
        currentStateId: 0,
        currentProgress: 0,
        currentBuffer: 0,
        currentVolume: 0,
        currentYtid: '',
        tracks: {},
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
        return minutes + ":" + seconds
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
        let percent = ((e.x - e.target.offsetLeft) / e.target.offsetWidth) * 100
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
      play(id) {
        if(this.currentYtid == id) {
          this.togglePlay()
        }
        else {
          this.player.loadVideoById(id)
          this.currentYtid = id
          if(document.querySelector('.track--playing') not null) {
            document.querySelector('.track--playing').classList.remove('track--playing')
          }
          document.querySelector('[data-id="'+this.currentYtid+'"]').classList.add('track--playing')
        }
      },
      playPrev() {
        let prevId = document.querySelector('[data-id="'+this.currentYtid+'"]').previousSibling.getAttribute('data-id')
        this.player.loadVideoById(prevId)
      },
      playNext() {
        let nextId = document.querySelector('[data-id="'+this.currentYtid+'"]').nextSibling.getAttribute('data-id')
        this.player.loadVideoById(nextId)
      },
      playerReady() {
        this.initPlayerVolume()
        setInterval(function() {
          this.updatePlayerTime()
          this.updatePlayerProgress()
          this.updatePlayerBuffer()
        }.bind(this), 500)
      },
    },
    mounted: function() {
      axios
        .get(window.APIURL+'/tracks')
        .then((res) => {
          this.tracks = res.data
        })
    },
  }
</script>

<style lang="scss">
  .track {
    background-color: black;
    color: white;
    &--playing {
      color: red;
    }
  }
</style>
