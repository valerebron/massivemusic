<template>
  <div class="app">
    <router-view class="erudi_page" @pageLoading="changePageState('loading')" @pageFinishLoading="changePageState('')"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="scss">
  .app {
    background-color: lightseagreen;
  }
</style>
