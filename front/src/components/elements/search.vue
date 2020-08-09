<template>
  <div class="search">
    <input v-model="terms" class="search__input" type="search" placeholder="Search"/>
    <i class="search__count counter">
      {{ $store.getters.count }}
    </i>
    <button class="search__button" @click="toggle">
      <icon-search />
    </button>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data: function() {
      return {
        searchTimeout: '',
      }
    },
    computed: {
      terms: {
        get() { return this.$store.getters.filters.search },
        set(terms) {
          let self = this
          clearTimeout(this.searchTimeout)
          this.searchTimeout = setTimeout(function() {
            self.search(terms)
          }, 500)
        },
      },
    },
    methods: {
      search(terms) {
        this.$store.dispatch('filterTracks', {type: 'search', value: terms})
      },
      open() {
        this.$store.dispatch('ui', {type: 'search', value: true})
      },
      close() {
        this.$store.dispatch('ui', {type: 'search', value: false})
      },
      toggle() {
        if(!this.$store.getters.ui.search) {
          this.open()
          document.getElementsByClassName('search__input')[0].focus()
        }
        else {
          this.close()
        }
      },
    },
    mounted() {
      this.terms = this.$store.getters.filters.search
    },
  }
</script>

<style lang="scss">
  .search {
    display: flex;
    align-items: center;
    position: relative;
      @include breakpoint(tablet) {
    margin-right: 20px;
    }
    &__input {
      background-color: rgb(49, 49, 49);
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 20px;
      transition: all 0.3s;
      display: inline-flex;
      width: 0;
      padding: 0;
      @include breakpoint('tablet') {
        width: auto;
        padding: 10px 0;
      }
      body[class*="route-style"] & {
        background-color: rgb(24, 24, 24);
        color: white;
      }
    }
    &__count {
      @extend %appStyleBkgColor;
      display: none;
      @include breakpoint('tablet') {
        display: inline-flex;
      }
    }
    &__button {
      height: 100%;
      width: $search-button-width;
      z-index: $z-index-search-button;
      position: relative;
      @include breakpoint('tablet') {
        display: none;
      }
    }
  }
</style>