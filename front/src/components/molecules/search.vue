<template>
  <div class="search">
    <input v-model="terms" class="search__input" @keydown.enter="blur($event)" type="search" placeholder="Search" ref="searchInput" />
    <i class="search__count counter" @click="resetSearch">
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
      resetSearch() {
        this.$refs.searchInput.value = ''
        this.$refs.searchInput.focus()
        this.$store.dispatch('filterTracks', {type: 'search', value: ''})
      },
      open() {
        this.$store.dispatch('ui', {type: 'nav', value: false})
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
      blur(e) {
        e.target.blur()
        if(e.target.value === '') {
          this.$store.dispatch('ui', {type: 'search', value: false})
        }
      },
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
        color: $app-color;
      }
    }
    &__count {
      cursor: pointer;
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