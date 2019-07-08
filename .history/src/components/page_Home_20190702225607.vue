<template>
  <div id="home">
    <youtube ref="player" />
    <button @click="play('uOpxX2SgRb8')">TrackOne</button>
    <button @click="play('G7c-5XsVjJI')">TrackTow</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      play(idToPlay) {
        console.log(this.$refs)
        // this.$refs.player.loadVideoById(idToPlay)
        // this.$refs.player.playVideo()
      },
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
