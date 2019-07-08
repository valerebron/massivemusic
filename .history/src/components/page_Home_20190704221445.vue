<template>
  <div id="home">
    <youtube ref="OddPlayer" />
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
        this.OddPlayer.seekTo('30')
        this.playerState = this.OddPlayer.getPlayerState()
      },
      play(idToPlay) {
        this.OddPlayer.loadVideoById(idToPlay)
        this.OddPlayer.playVideo()
      },
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
