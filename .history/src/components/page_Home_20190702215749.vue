<template>
  <div id="home">
    <youtube ref="odd" />
    <youtube ref="even" />
    <button @click="playOdd">play Odd</button>
    <button @click="playEven">play Even</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      playOdd() {
        console.log(this.odd)
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
