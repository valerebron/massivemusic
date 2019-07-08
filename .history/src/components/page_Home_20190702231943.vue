<template>
  <div id="home">
    <youtube ref="OddPlayer" />
    {{ this.currentState }}
    <button @click="play('uOpxX2SgRb8')">TrackOne</button>
    <button @click="play('G7c-5XsVjJI')">TrackTow</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      play(idToPlay) {
        this.OddPlayer.loadVideoById(idToPlay)
        this.OddPlayer.playVideo()
      },
    },
    computed: {
      OddPlayer() {
        return this.$refs.OddPlayer.player
      },
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
