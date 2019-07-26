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
    fill: $primary-color;
  }
</style>
