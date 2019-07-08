<template>
  <div class="home">
    <youtube ytid="T4R6iFSYDZ0" ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="CHANGER"></youtube>
    {{ currentState }}
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
        currentState: 0,
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
      CHANGER() {
        console.log('its changinnnng !')
      },
      playerReady() {
        this.currentTime = this.$refs.yt.player.getCurrentTime()
        var test = this.currentState
        this.currentState = this.$refs.yt.player.addEventListener('onStateChange', function(player) {
          test = player.data
        })
      },
    },
  }
</script>

<style lang="scss">
  .home {
    justify-content: center;
  }
</style>
