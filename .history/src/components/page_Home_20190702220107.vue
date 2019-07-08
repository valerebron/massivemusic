<template>
  <div id="home">
    <youtube :video-id="odd-id" ref="odd" />
    <youtube :video-id="even-id" ref="even" />
    <button @click="playOdd">play Odd</button>
    <button @click="playEven">play Even</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        odd-id: '',
        even-id: '',
      }
    },
    methods: {
      playOdd() {
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
