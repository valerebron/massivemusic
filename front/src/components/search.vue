<template>
  <div class="search" :class="isTerms">
    <div class="search__bar">
      <input class="search__input" type="search" v-model="searchTerms" @keydown.enter.escape="blurSearch($event)"/>
      <i class="search__count" @click="resetSearch($event)">
        {{ $store.getters.nb_tracks }}
      </i>
    </div>
    <button class="search__button" @click="toggleSearch">
      <icon-search-close />
    </button>
  </div>
</template>

<script>
  import iconSearchClose from '../assets/icon-search-close.vue'
  export default {
    name: 'search',
    components: {
      iconSearchClose,
    },
    data() {
      return {
        finishTyping: '',
      }
    },
    computed:{
      appStatus:{
        get(){ return this.$store.getters.appState },
        set(value){ this.$store.dispatch('setAppStatus', value) }
      },
      searchTerms:{
        get(){ return this.$store.getters.search },
        set(value){
          clearTimeout(this.finishTyping)
          this.finishTyping = setTimeout(() => {
            this.$store.dispatch("setFilter", {type: 'search', value: value})
          }, 800)
        }
      },
      isTerms() {
        return (this.searchTerms != '' ? 'termsThere' : '')
      },
    },
    methods: {
      toggleSearch() {
        if(this.appStatus != '3-search') {
          this.appStatus = '3-search'
          document.querySelector('.search__input').focus()
        }
        else {
          this.appStatus = '2-init-screen'
        }
      },
      blurSearch($event) {
        $event.target.blur()
        this.appStatus = '2-init-screen'
      },
      resetSearch() {
        document.querySelector('.search__input').value = ''
        document.querySelector('.search__input').focus()
        this.searchTerms = ''
      },
    },
  }
</script>

<style lang="scss">
  .search {
    .state-3-search & {
      background-color: $ui-bkg;
    }
    &__button {
      height: 100%;
      width: $search-button-width;
      z-index: $z-button-search;
      position: relative;
    }
    &__bar {
      display: flex;
      position: absolute;
      right: -100vw;
      top: 0;
      transition: all 0.3s;
      width: 0;
      justify-content: center;
      align-items: center;
      align-self: center;
      height: 100%;
      z-index: $z-layer-search;
      .state-3-search & {
        background-color: $ui-bkg;
        width: calc(100% - #{$search-button-width});
        right: $search-button-width;
      }
      .state-2-init-screen .termsThere & {
        width: calc(40% - #{$search-button-width});
        right: $search-button-width;
        justify-content: flex-end;
      }
    }
    &__input {
      text-align: center;
      width: 0;
      background-color: transparent;
      font-size: 28px;
      height: $search-height;
      border: none;
      padding-left: $search-button-width * 1.5;
      margin-right: 10px;
      @extend %appStyleColor;
      .state-3-search & {
        width: 100%;
      }
      .state-2-init-screen .termsThere & {
        padding: 0;
        width: 40%;
      }
    }
    &__count {
      @extend %appStyleBkgColor;
      color: black;
      font-style: normal;
      font-weight: bold;
      border-radius: 20px;
      cursor: pointer;
      padding: 4px 8px;
    }
  }
</style>