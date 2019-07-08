<template>
  <div id="home">
    <youtube ref="OddPlayer"/>
    <button @click="pause()">Pause</button>
    <button @click="play('uOpxX2SgRb8')">TrackOne</button>
    <button @click="play('G7c-5XsVjJI')">TrackTow</button>
    {{ playerState }}
  </div>
</template>

<script>
  export default {
    name: 'home',
    computed: {
      OddPlayer() {
        return this.$refs.OddPlayer.player
      },
    },
    data() {
      return {
        playerState: ''
      }
    },
    methods: {
      pause() {
        this.OddPlayer.pauseVideo()
        // this.OddPlayer.playVideo()
      },
      play(idToPlay) {
        this.OddPlayer.loadVideoById(idToPlay)
        this.OddPlayer.playVideo()
        console.log(this.OddPlayer)
      },
    },
    mounted() {
      this.playerState = this.$refs.OddPlayer.player.getCurrentTime
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
