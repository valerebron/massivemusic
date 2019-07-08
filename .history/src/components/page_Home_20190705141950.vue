<template>
  <div id="home">
    <youtube ytid="T4R6iFSYDZ0" ref="yt" @ready="playerReady" @paused="playerPaused"></youtube>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        playerState: '',
      }
    },
    methods: {
      formatTime(time) {
        time = Math.round(time)
        let minutes = Math.floor(time / 60),
        seconds = time - minutes * 60
        seconds = seconds < 10 ? '0' + seconds : seconds
        return minutes + ":" + seconds
      },
      playerReady() {
        console.log(this.$refs.yt.player.getCurrentTime())
      },
      playerPaused() {
        console.log(this.$refs.yt.player.getCurrentTime())
      }
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
