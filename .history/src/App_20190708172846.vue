<template>
  <div class="app">
    <yt-player></yt-player>
    <router-view></router-view>
  </div>
</template>

<script>
  import config from '../config.json'
  import player from './components/yt-player.vue'

  export default {
    name: 'app',
    components: {
      player,
    },
    beforeCreate: function() {
      window.APIURL = config.apiHost
    },
  }
</script>

<style lang="scss">
  .app {
    background-color: grey;
  }
</style>
