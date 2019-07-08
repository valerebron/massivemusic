<template>
  <div id="home">
    <youtube ref="Oddplayer" />
    <button @click="play('uOpxX2SgRb8')">TrackOne</button>
    <button @click="play('G7c-5XsVjJI')">TrackTow</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      play(idToPlay) {
        OddPlayer.loadVideoById(idToPlay)
        OddPlayer.playVideo()
      },
    },
    computed: {
      OddPlayer: this.$refs.OddPlayer
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
