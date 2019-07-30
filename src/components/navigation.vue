<template>
  <nav class="massive-nav">
    <button class="massive-nav__toggle" @click="toggle('5-nav')">
      <icon-menu/>
    </button>
    <div class="massive-nav__dialog">
      <router-link :to="style.url" :class="'massive-nav__dialog__link style-'+style.id" v-for="style in styles" :key="style.id">
        <div class="massive-nav__dialog__link-container">
          <icon-right/>
          {{ style.value }}
        </div>
      </router-link>
      <a class="massive-nav__dialog__link" href="#">
        <div class="massive-nav__dialog__link-container">
          <icon-star/>
          Favorites
        </div>
      </a>
      <a class="massive-nav__dialog__link" href="#">
        <div class="massive-nav__dialog__link-container">
          <icon-contact/>
          login
        </div>
      </a>
    </div>
  </nav>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'navigation',
    props: ['toggle'],
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
    },
    mounted: function(){
      this.getStyles()
    },
  }
</script>

<style lang="scss">
  .massive-nav {
    z-index: $z-layer-nav;
    display: flex;
    justify-content: center;
    &__toggle {
      z-index: $z-layer-search;
    }
    &__dialog {
      background-color: black;
      display: block;
      position: fixed;
      top: 0;
      left: -100vw;
      display: flex;
      justify-content: center;
      .state-5-nav & {
        left: 0;
      }
      transition: left 0.3s;
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      &.open {
        left: 0;
      }
      &__link {
        display: flex;
        justify-content: center;
        cursor: pointer;
        padding: 8px;
        font-size: 20px;
      }
      &__link-container {
        width: 150px;
        text-align: left;
        align-items: center;
        display: flex;
        .ion {
          padding-right: 10px;
        }
      }
    }
  }
</style>
