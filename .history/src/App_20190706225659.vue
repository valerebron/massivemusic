<template>
  <div class="app">
    <router-view class="erudi_page"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted: function() {
      console.log(this.$refs)
    }
  }
</script>

<style lang="scss">
  .app {
    background-color: lightseagreen;
  }
</style>
