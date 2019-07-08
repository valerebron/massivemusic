<template>
  <div id="home">
    <youtube video-id="99f0Kt0SpDg" ref="roux" />
    <button @click="playRoux">play Odd</button>
    <button @click="playPapier">play Even</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      playRoux() {
        this.roux.playVideo()
      },
      playPapier() {
        this.papier.playVideo()
      },
    },
    computed: {
      roux() {
        return this.$refs.roux.player
      },
      papier() {
        return this.$refs.papier.player
      }
    }
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
