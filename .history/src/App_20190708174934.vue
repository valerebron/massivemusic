<template>
  <div class="app">
    <player :player="player"></player>
    <router-view></router-view>
  </div>
</template>

<script>
  import config from '../config.json'
  import player from './components/player.vue'

  export default {
    name: 'app',
    components: {
      player,
    },
    computed: {
      player() {
        return this.$refs.yt.player
      },
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
