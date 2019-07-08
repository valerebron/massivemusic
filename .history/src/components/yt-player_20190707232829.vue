<template>
  <div class="yt-player">
    {{ currentState }}
    <youtube ytid="T4R6iFSYDZ0" ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="updatePlayerState"></youtube>
    <progress :value="currentProgress" max="100" @click="seekPlayer"></progress>
    <progress :value="currentBuffer" max="100"></progress>
    <button @click="togglePlay">Play/Pause</button>
    <button @click="toggleVolume">Mute</button>
    <input type="range" min="0" max="100" :value="currentVolume" @change="updatePlayerVolume">
    {{ currentTime }} / {{ totalTime }}
    <button @click="play('mJ9ZAuRcMkg')"> play mJ9ZAuRcMkg</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'yt-player',
    data() {
      return {
        playerVars: {height: '0'},
        currentTime: 0,
        totalTime: 0,
        currentState: 0,
        currentProgress: 0,
        currentBuffer: 0,
        currentVolume: 0,
        tracks: {},
      }
    },
    computed: {
      player() {
        return this.$refs.yt.player
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
        this.currentState = this.player.getPlayerState()
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
        this.player.loadVideoById(id)
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
  .player {
    justify-content: center;
  }
</style>
