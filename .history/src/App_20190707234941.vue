<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import config from '../config.json'

  export default {
    name: 'app',
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
