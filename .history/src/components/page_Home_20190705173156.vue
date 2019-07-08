<template>
  <div class="home">
    <youtube ytid="T4R6iFSYDZ0" ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="switchState"></youtube>
    {{ currentState }}
    {{ currentTime }}
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
      switchState() {
        this.currentTime = this.player.getCurrentTime()
        this.currentState = this.player.getPlayerState()
      },
      playerReady() {
        this.currentTime = this.player.getCurrentTime()
        console.log(this.$data)
      },
    },
  }
</script>

<style lang="scss">
  .home {
    justify-content: center;
  }
</style>
