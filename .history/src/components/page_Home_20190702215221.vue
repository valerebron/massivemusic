<template>
  <div id="home">
    <youtube video-id="99f0Kt0SpDg" ref="odd" />
    <youtube video-id="DWa2BNMYY68" ref="even" />
    <button @click="playOdd">play Odd</button>
    <button @click="playEven">play Even</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
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
