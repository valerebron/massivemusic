<template>
  <div class="home">
    <youtube ytid="T4R6iFSYDZ0" ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="updatePlayerState"></youtube>
    {{ currentState }}
    {{ currentTime }}
    <progress :value="currentProgress" max="100" @click="seekPlayer"></progress>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        playerVars: {height: '360', width: '640'},
        currentTime: 0,
        currentState: 0,
        currentProgress: 0,
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
        seconds = time - minutes * 60
        seconds = seconds < 10 ? '0' + seconds : seconds
        return minutes + ":" + seconds
      },
      updatePlayerState() {
        this.currentState = this.player.getPlayerState()
      },
      updatePlayerTime() {
        this.currentTime = this.formatTime(this.player.getCurrentTime())
      },
      updatePlayerProgress() {
        this.currentProgress = (this.player.getCurrentTime() / this.player.getDuration()) * 100
      },
      seekPlayer(e) {
        console.log(e)
      },
      playerReady() {
        setInterval(function() {
          this.updatePlayerTime()
          this.updatePlayerProgress()
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
