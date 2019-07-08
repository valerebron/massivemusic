<template>
  <div id="home">
    <youtube :video-id="youtubeId" ref="roux" />
    <button @click="playRoux">play roux</button>
    <button @click="playPapier">play papier</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data:
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
