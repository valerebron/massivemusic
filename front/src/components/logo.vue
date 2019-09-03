<template>
  <div class="massive-logo__wrapper">
    <svgLogo class="massive-logo"/>
  </div>
</template>

<script>
import svgLogo from '../assets/logo.svg'
export default {
  name: 'logo',
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
    transition: fill .3s;
    fill: black;
    &__wrapper {
     @extend %appStyleBkgColor;
      padding: 10px;
      border-radius: 100px;
    }
  }
  body {
    @extend %appStyleColorLogo;
  }
</style>
