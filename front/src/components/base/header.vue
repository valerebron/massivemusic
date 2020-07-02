<template>
  <header class="header">
    <button class="nav-toggle" @click="toggleNav">
      <icon-nav/>
    </button>
    <logo />
    <search />
  </header>
</template>

<script>
  import logo from '../elements/logo.vue'
  import search from '../elements/search.vue'
  export default {
    name: 'theheader',
    components: {
      search,
      logo,
    },
    methods: {
      toggleNav() {
        if(this.$store.getters.ui.nav) {
          this.$store.dispatch('ui', {type: 'nav', value: false})
        }
        else {
          this.$store.dispatch('ui', {type: 'nav', value: true})
        }
      },
    },
  }
</script>

<style lang="scss">
  .header {
    @extend %appStyleBkgColor;
    background-color: rgb(20, 20, 20);
    box-shadow: $app-bkg 0 0 30px;
    position: fixed;
    z-index: $z-index-header;
    top: 0;
    width: 100%;
    height: $header-height;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    .nav-toggle {
      z-index: $z-index-header-elt;
    }
    .nav-toggle, .logo__name, .search__button svg {
      color: white;
      body[class*="route-style"] & {
        color: black;
      }
    }
    .nav-toggle, .search__button {
      font-size: 24px;
    }
  }
</style>
