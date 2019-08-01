<template>
  <svgLogo class="massive-logo"/>
</template>

<script>
import svgLogo from '../assets/logo.svg'
export default {
  name: 'massive-logo',
  components: {
    svgLogo,
  }
}
</script>

<style lang="scss">
  .massive-logo {
    position: relative;
    z-index: 999;
    width: 50px;
    padding: 10px;
    border-radius: 100px;
    @extend %appStyleBkgColor;
    fill: black;
  }
</style>
