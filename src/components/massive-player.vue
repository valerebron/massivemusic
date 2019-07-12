<template>
  <main :class="currentState">
    <section class="yt-player">
      <youtube :ytid="firstTrack" ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="updatePlayerState"></youtube>
      {{ currentState }}
      <input type="range" :value="currentProgress" step="0.125" max="100" @input="seekPlayer"/>
      <!-- for chrome only : -->
      <progress :value="currentProgress" max="100"></progress>
      <progress :value="currentBuffer" max="100"></progress>
      <button @click="togglePlay">Play/Pause</button>
      <button @click="playPrev">Prev</button>
      <button @click="playNext">Next</button>
      <button @click="toggleVolume">Mute</button>
      <input type="range" max="100" :value="currentVolume" @input="updatePlayerVolume"/>
      {{ currentTime }} / {{ totalTime }}
    </section>
    <router-view :player="propRef" :play="play" :togglePlay="togglePlay"></router-view>
  </main>
</template>

<script>
  export default {
    name: 'massiveplayer',
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
        propRef: '',
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
      play(id) {
        if(this.currentYtid == id) {
          this.togglePlay()
        }
        else {
          this.player.stopVideo()
          this.player.loadVideoById(id)
          this.currentYtid = id
          if(document.querySelector('.track--playing') !== null) {
            document.querySelector('.track--playing').classList.remove('track--playing')
          }
          document.querySelector('[data-id="'+id+'"]').classList.add('track--playing')
        }
      },
      playPrev() {
        let currentTrack = document.querySelector('.track--playing')
        if(currentTrack) {
          if(currentTrack.previousSibling) {
            let prevId = currentTrack.previousSibling.getAttribute('data-id')
            if(prevId) {
              this.play(prevId)
            }
          }
        }
      },
      playNext() {
        let currentTrack = document.querySelector('.track--playing')
        if(currentTrack) {
          if(currentTrack.nextSibling) {
            let nextId = currentTrack.nextSibling.getAttribute('data-id')
            if(nextId) {
              this.play(nextId)
            }
          }
        }
        else {
          let firstId = document.querySelector('.tracks .track').getAttribute('data-id')
          if(firstId) {
            this.play(firstId)
          }
        }
      },
      playerReady() {
        this.initPlayerVolume()
        setInterval(function() {
          this.updatePlayerTime()
          this.updatePlayerProgress()
          this.updatePlayerBuffer()
        }.bind(this), 500)
        this.propRef = this.$refs.yt.player
      },
    },
  }
</script>

<style lang="scss">
  @import 'scss/main.scss';
  .yt-player {
    display: flex;
    flex-direction: column;
  }
  iframe {
    height: 80px;
    width: 100%;
  }
  progress, input {
    width: 100%;
  }
  .home {
    justify-content: center;
  }
</style>
