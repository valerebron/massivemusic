<template>
  <router-link class="logo" to="/">
    <svgLogo class="logo__icon" @click="$store.dispatch('ui', {type: 'full', value: false})" alt="Massivemusic, streaming bassmusic"/>
    <h1 class="logo__name">
      Massivemusic, streaming bassmusic
    </h1>
  </router-link>
</template>

<script>
import svgLogo from '@/assets/logo.svg'
export default {
  name: 'logo',
  components: {
    svgLogo,
  },
}
</script>

<style lang="scss">
  .logo {
    display: flex;
    align-items: center;
    height: 75px;
    transition: all 0.3s;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-indent: -999999999px;
    &__name {
      text-indent: -999999999px;
      overflow: hidden;
      transition: all .3s;
      opacity: 1;
      text-align-last: left;
      padding-left: 8px;
      font-size: 14px;
      text-transform: uppercase;
      .app--full & {
        color: $app-color!important;
      }
    }
    &__extension {
      text-transform: lowercase;
      font-size: 14px;
    }
    &__icon {
      position: relative;
      z-index: $z-index-logo;
      width: 50px;
      height: 50px;
      transition: fill .3s;
      fill: black;
      filter: drop-shadow(0 0 6px black);
      border-radius: 100px;
    }
  }
</style>
