<template>
  <div class="home">
    <youtube ytid="T4R6iFSYDZ0" ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="updatePlayerState" @></youtube>
    {{ currentState }}
    {{ currentTime }} / {{ totalTime }}
    <progress :value="currentProgress" max="100" @click="seekPlayer"></progress>
    <progress :value="currentBuffer" max="100"></progress>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        playerVars: {height: '360', width: '640'},
        currentTime: 0,
        totalTime: 0,
        currentState: 0,
        currentProgress: 0,
        currentBuffer: 0,
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
      seekPlayer(e) {
        let percent = ((e.x - e.target.offsetLeft) / e.target.offsetWidth) * 100
        let duration = this.player.getDuration()
        let seekToSecond = (percent * duration) / 100

        this.currentProgress = percent
        this.player.seekTo(seekToSecond)
      },
      playerReady() {
        setInterval(function() {
          this.updatePlayerTime()
          this.updatePlayerProgress()
          this.updatePlayerBuffer()
        }.bind(this), 500)
      },
    },
  }
</script>

<style lang="scss">
  .home {
    justify-content: center;
  }
</style>
