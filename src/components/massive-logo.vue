<template>
  <svgLogo class="massive-logo"/>
</template>

<script>
import svgLogo from '../assets/logo.svg'
export default {
  components: {
    svgLogo,
  }
}
</script>

<style lang="scss">
  .massive-logo {
    position: relative;
    z-index: $z-layer-logo;
    width: 50px;
    padding: 10px;
  }
</style>
