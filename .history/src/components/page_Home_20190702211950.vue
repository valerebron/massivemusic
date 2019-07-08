<template>
  <div id="home">
    <youtube :video-id="youtubeId" ref="papier" />
    <button @click="playPapier">play papier</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      playPapier() {
        this.papier.playVideo()
      },
    },
    computed: {
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
