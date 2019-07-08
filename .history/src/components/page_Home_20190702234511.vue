<template>
  <div id="home">
    <youtube ref="OddPlayer" @playing="playingnow()"/>
    <button @click="play('uOpxX2SgRb8')">TrackOne</button>
    <button @click="play('G7c-5XsVjJI')">TrackTow</button>
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
    methods: {
      play(idToPlay) {
        this.OddPlayer.loadVideoById(idToPlay)
        this.OddPlayer.playVideo()
        console.log(this.OddPlayer.getPlayerState())
      },
      playingnow() {
        console.log('playing now')
      },
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
