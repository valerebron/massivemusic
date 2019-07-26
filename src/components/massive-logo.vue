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
  @import 'scss/main.scss';
  .massive-logo {
    z-index: $z-layer-logo;
    fill: $primary-color;
    width: 50px;
    padding: 10px;
  }
</style>
