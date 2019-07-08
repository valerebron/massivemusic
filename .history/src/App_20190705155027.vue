<template>
  <div class="app">
    <router-view class="erudi_page" @stateChange="switchState"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      switchState() {
        console.log(this.$refs)
      },
    }
  }
</script>

<style lang="scss">
  .app {
    background-color: lightseagreen;
  }
</style>
