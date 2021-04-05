<template>
  <header class="header">
    <button class="nav-toggle" :class="{ 'nav-toggle--online' : this.$store.getters.isOnline }" @click="toggleNav" aria-label="toggle navigation sidebar">
      <template v-if="this.$store.getters.isOnline">
        <avatar :user="user" size="small"/>
        <p class="nav-toggle__name">
          {{ user.name }}
        </p>
      </template>
      <icon-nav v-else class="icon-nav" />
    </button>
    <logo />
    <search />
  </header>
</template>

<script>
  import logo from '@/components/atoms/logo.vue'
  import search from '@/components/molecules/search.vue'
  import avatar from '@/components/atoms/avatar'
  export default {
    name: 'theheader',
    components: {
      search,
      logo,
      avatar,
    },
    computed: {
      user: function() { return this.$store.getters.session.user },
    },
    methods: {
      err(error) {
        console.log(error)
      },
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
    // @extend %appStyleBkgColor;
    background-color: $app-bkg;
    // background-color: $header-bkg;
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
      @include breakpoint(tablet) {
        padding: 0;
      }
      .icon-nav {
        @include breakpoint(tablet) {
          padding: 0 20px;
        }
      }
      &--online {
        @include breakpoint(tablet) {
          width: $nav-width;
        }
      }
      &__name {
        display: none;
        @include breakpoint('tablet') {
          display: flex;
        }
        // .app[class*='route-style-'] & {
        //   color: black;
        // }
      }
    }
    .nav-toggle, .logo__name, .search__button svg {
      color: $app-color;
      // body[class*="route-style"] & {
      //   color: black;
      // }
    }
    .nav-toggle, .search__button {
      font-size: 24px;
    }
  }
</style>
