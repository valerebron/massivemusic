<template>
  <div class="home">
    <youtube ytid="T4R6iFSYDZ0" ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="updatePlayerState"></youtube>
    {{ currentState }}
    {{ currentTime }}
    <progress value="56" max="100"></progress>
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
      playerReady() {
        setInterval(function() {
          this.currentTime = this.formatTime(this.$refs.yt.player.getCurrentTime())
        }.bind(this), 300)
      },
    },
  }
</script>

<style lang="scss">
  .home {
    justify-content: center;
  }
</style>
