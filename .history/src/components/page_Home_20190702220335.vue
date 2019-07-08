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
      playOdd() {
        this.oddId = 'G7c-5XsVjJI'
        this.odd.playVideo()
      },
      playEven() {
        this.even.playVideo()
      },
    },
    computed: {
      odd() {
        return this.$refs.odd.player
      },
      even() {
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
