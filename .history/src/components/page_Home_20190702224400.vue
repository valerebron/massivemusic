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
        this.oddPlayer.loadVideoById('G7c-5XsVjJI')
        this.oddPlayer.playVideo()
      },
      playEven() {
        this.evenPlayer.loadVideoById('G7c-5XsVjJI')
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
