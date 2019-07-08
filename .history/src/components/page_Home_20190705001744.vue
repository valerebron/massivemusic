<template>
  <div id="home">
    <youtube video-id="utmf8uAC8QU" @qued="qued"></youtube>
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
      qued() {
        console.log('qued')
      },
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
