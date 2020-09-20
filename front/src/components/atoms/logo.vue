<template>
  <button class="logo" @click="goHome">
    <svgLogo class="logo__icon"/>
    <h1 class="logo__name">
      massive<br>
      music
      <span class="logo__extension">
        .fr
      </span>
    </h1>
  </button>
</template>

<script>
import svgLogo from '@/assets/logo.svg'
export default {
  name: 'logo',
  components: {
    svgLogo,
  },
  methods: {
    goHome: function() {
      this.$store.dispatch('ui', {type: 'full', value: false})
      if(this.$route.name !== 'home') {
        this.$router.push('/')
      }
      else {
        this.$store.dispatch('filterTracks', {type: 'search', value: ''})
      }
    },
  },
}
</script>

<style lang="scss">
  .logo {
    display: flex;
    align-items: center;
    height: 75px;
    transition: all 0.3s;
    &__name {
      overflow: hidden;
      transition: all .3s;
      opacity: 1;
      text-align-last: left;
      padding-left: 8px;
      font-size: 14px;
      text-transform: uppercase;
      transition: &ll 0.3s;
      .app--full & {
        color: white!important;
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
      height: 34px;
      transition: fill .3s;
      fill: black;
      box-shadow: black 0 0 6px;
      @extend %appStyleBkgColor;
      padding: 8px 0;
      border-radius: 100px;
    }
  }
</style>
