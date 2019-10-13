<template>
  <header class="header">
    <navigation />
    <logo />
    <search />
  </header>
</template>

<script>
  import navigation from './navigation.vue'
  import logo from './logo.vue'
  import search from './search.vue'
  export default {
    name: 'theheader',
    components: {
      navigation,
      search,
      logo,
    },
  }
</script>

<style lang="scss">
  .header {
    position: fixed;
    z-index: $z-layer-header;
    .state-full & {
      z-index: $z-layer-logo;
    }
    top: 0;
    width: 100%;
    height: $header-height;
    display: flex;
    flex-direction: row;
    background: linear-gradient(black, transparent);
    z-index: $z-layer-header;
    justify-content: space-between;
    align-content: center;
  }
</style>
