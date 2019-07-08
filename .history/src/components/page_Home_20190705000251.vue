<template>
  <div id="home">
    <youtube video-id="pRoQwMTWv6M"></youtube>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        playerState: '',
      }
    },
    methods: {
      formatTime(time) {
        time = Math.round(time)
        let minutes = Math.floor(time / 60),
        seconds = time - minutes * 60
        seconds = seconds < 10 ? '0' + seconds : seconds
        return minutes + ":" + seconds
      },
    },
    mounted() {
      console.log('mounted')
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
