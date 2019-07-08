<template>
  <div id="home">
    <youtube :videoId="oddId" ref="odd" />
    <youtube :video-id="evenId" ref="even" />
    <button @click="playOdd">play Odd</button>
    <button @click="playEven">play Even</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        oddId: '',
        evenId: '',
      }
    },
    methods: {
      async playOdd() {
        await this.oddId = 'G7c-5XsVjJI'
        this.oddPlayer.playVideo()
      },
      playEven() {
        this.evenId = 'G7c-5XsVjJI'
        this.evenPlayer.playVideo()
      },
    },
    computed: {
      oddPlayer() {
        return this.$refs.odd.player
      },
      evenPlayer() {
        return this.$refs.even.player
      }
    }
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
