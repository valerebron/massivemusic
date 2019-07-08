<template>
  <div id="home">
    <div id="player"></div>
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
      var player;
      console.log('fg')
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
