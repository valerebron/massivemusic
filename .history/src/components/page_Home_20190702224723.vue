<template>
  <div id="home">
    <youtube ref="mainPlayer" />
    <button @click="play('uOpxX2SgRb8')">TrackOne</button>
    <button @click="play('G7c-5XsVjJI')">TrackTow</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      play(idToPlay) {
        this.mainPlayer.loadVideoById(idToPlay)
        this.mainPlayer.playVideo()
      },
    },
    computed: {
      mainPlayer() {
        return this.$refs.mainPlayer.player
      },
    }
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
