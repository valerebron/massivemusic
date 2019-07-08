<template>
  <div id="home">
    <youtube ref="Oddplayer" />
    {{ OddPlayer.getPlayerState() }}
    <button @click="play('uOpxX2SgRb8')">TrackOne</button>
    <button @click="play('G7c-5XsVjJI')">TrackTow</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    computed: {
      OddPlayer: this.$refs.OddPlayer
    },
    methods: {
      play(idToPlay) {
        OddPlayer.loadVideoById(idToPlay)
        OddPlayer.playVideo()
      },
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
