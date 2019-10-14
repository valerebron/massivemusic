<template>
  <button class="massive-logo__wrapper" @click="goHome">
    <svgLogo class="massive-logo"/>
    <h1 class="massive-logo__name">
      massive<br>
      music
      <span class="massive-logo__extension">
        .fr
      </span>
    </h1>
  </button>
</template>

<script>
import svgLogo from '../assets/logo.svg'
export default {
  name: 'logo',
  components: {
    svgLogo,
  },
  methods: {
    goHome: function() {
      this.$store.dispatch('setAppStatus', 'init')
      this.$router.push({ name: 'home' })
      //if same route, router do nothin, so :
      this.$store.dispatch('resetTracks')
    }
  },
}
</script>

<style lang="scss">
  .massive-logo {
    position: relative;
    z-index: $z-layer-logo;
    width: 50px;
    height: 34px;
    transition: fill .3s;
    fill: black;
    box-shadow: black 0 0 50px;
    @extend %appStyleBkgColor;
    padding: 8px 0;
    border-radius: 100px;
    &__name {
      .state-search &, .state-nav & {
        display: none;
      }
      text-align-last: left;
      padding-left: 8px;
      font-size: 16px;
      text-transform: uppercase;
      transition: &ll 0.3s;
      .state-nav & {
        width: 0;
      }
    }
    &__extension {
      text-transform: lowercase;
      font-size: 14px;
    }
    &__wrapper {
      display: flex;
      align-items: center;
      transition: all 0.3s;
      .state-search & {
        position: absolute;
        left: 10px;
        top: 12px;
        padding: 0;
      }
    }
  }
</style>
