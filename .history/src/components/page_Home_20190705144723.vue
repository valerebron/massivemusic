<template>
  <div id="home">
    <youtube ytid="T4R6iFSYDZ0" ref="yt" :playerVars="playerVars" @ready="playerReady"></youtube>
    {{ currentTime }}
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        playerState: '',
        playerVars: {height: '360', width: '640'},
        currentTime: 0,
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
        this.currentTime = this.$refs.yt.player.getCurrentTime()
        const playerChange() {
          console.log(this.$refs.yt.player.getPlayerState())
        }
        this.$refs.yt.player.addEventListener('onStateChange', 'playerChange')
      },
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
