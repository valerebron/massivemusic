<template>
  <div id="home">
    <youtube ref="OddPlayer" player-width="0" player-height="0"/>
    <button @click="pause()">Pause</button>
    <button @click="play('uOpxX2SgRb8')">TrackOne</button>
    <button @click="play('G7c-5XsVjJI')">TrackTow</button>
    {{ playerState }}
  </div>
</template>

<script>
  export default {
    name: 'home',
    computed: {
      OddPlayer() {
        return this.$refs.OddPlayer.player
      },
      CurrentTime() {
        return formatTime(this.$refs.OddPlayer.player.getCurrentTime())
      },
      Duration() {
        return formatTime(this.$refs.OddPlayer.player.getDuration())
      },
    },
    data() {
      return {
        playerState: '',
      }
    },
    methods: {
      pause() {
        this.OddPlayer.pauseVideo()
        this.OddPlayer.seekTo('30')
      },
      play(idToPlay) {
        this.OddPlayer.loadVideoById(idToPlay)
        this.OddPlayer.playVideo()
      },
      formatTime(time) {
        let time = Math.round(time)
        let minutes = Math.floor(time / 60),
        seconds = time - minutes * 60
        seconds = seconds < 10 ? '0' + seconds : seconds
        return minutes + ":" + seconds
      },
    },
    mounted() {
      this.OddPlayer.getPlayerState().then(function(data){
        console.log(this.playerState)
      })
    },
  }
</script>

<style lang="scss">
  #home {
    justify-content: center;
  }
</style>
