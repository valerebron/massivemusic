<template>
  <div id="home">
    <youtube video-id="99f0Kt0SpDg" ref="odd" />
    <button @click="playOdd">play Odd</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      playOdd() {
        this.odd.playVideo()
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
