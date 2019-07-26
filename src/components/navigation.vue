<template>
  <nav class="massive-nav">
    <button class="massive-nav__toggle">
      <ion-icon class="massive-nav__open" name="menu"></ion-icon>
      <ion-icon class="massive-nav__close" name="close"></ion-icon>
    </button>
    <div class="massive-nav__dialog">
      <a class="massive-nav__dialog__link" v-for="style in styles" :key="style.id" @mousedown="filterStyle(style.id)">
        {{ style.id }}
        {{ style.value }}
      </a>
      <a class="massive-nav__dialog__link" href="#">
        <ion-icon name="heart"/>
        Favorites
      </a>
      <a class="massive-nav__dialog__link" href="#">
        <ion-icon name="contact"/>
        login
      </a>
    </div>
  </nav>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'navigation',
    data() {
      return {
        styles: '',
      }
    },
    methods: {
      getStyles() {
        axios
          .get(window.APIURL+'/styles')
          .then((res) => {
            this.styles = res.data
          })
      },
      filterStyle(id) {
        this.$emit('changeStyleFilter', id)
      },
    },
    mounted: function(){
      this.getStyles()
    },
  }
</script>

<style lang="scss">
  @import 'scss/main.scss';
  .massive-nav {
    z-index: $z-layer-nav;
    display: flex;
    justify-content: center;
    &__toggle {
      z-index: $z-layer-search;
    }
    &__dialog {
      background-color: red;
      display: block;
      position: fixed;
      top: 0;
      left: -100vw;
      transition: left 0.3s;
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      &.open {
        left: 0;
      }
      &__link {
        padding: 8px;
        font-size: 20px;
      }
    }
  }
</style>
