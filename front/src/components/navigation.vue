<template>
  <nav class="massive-nav">
    <button class="massive-nav__toggle" @click="toggle('5-nav')">
      <icon-burger-close/>
    </button>
    <div class="massive-nav__dialog">
      <router-link :to="style.url" :class="'massive-nav__dialog__link style-'+style.id" v-for="style in styles" :key="style.id">
        <div class="massive-nav__dialog__link-container massive-nav__dialog__link-container--style">
          <icon-radio-on class="icon-radio-on" />
          <icon-radio-off class="icon-radio-off" />
          <span class="massive-nav__dialog__text">
            {{ style.value }}
          </span>
        </div>
      </router-link>
      <router-link to="favorites" class="massive-nav__dialog__link massive-nav__dialog__link--favorite">
        <div class="massive-nav__dialog__link-container">
          <icon-star/>
          Favorites
        </div>
      </router-link>
      <!-- <a class="massive-nav__dialog__link" href="#">
        <div class="massive-nav__dialog__link-container">
          <icon-contact/>
          login
        </div>
      </a> -->
    </div>
  </nav>
</template>

<script>
  import iconBurgerClose from './icon-burger-close.vue'
  import axios from 'axios'
  export default {
    name: 'navigation',
    components: {
      iconBurgerClose,
    },
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
            console.log(res)
            this.styles = res.data
          })
          .catch(function(error){
            console.log(error)
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
        &--favorite {
          .ion__svg {
            color: $favorite-color;
          }
        }
        .icon-radio-off {
          transition: opacity 0.3s;
          opacity: 1;
        }
        .icon-radio-on {
          transition: opacity 0.3s;
          opacity: 0;
        }
        &:hover, &.router-link-active {
          background-color: $color-selection;
        }
        &.router-link-active, &:hover {
          .icon-radio-off {
            transition: opacity 0.2s;
            opacity: 0;
          }
          .icon-radio-on {
            transition: opacity 0.2s;
            opacity: 1;
          }
        }
      }
      &__link-container {
        width: 150px;
        text-align: left;
        align-items: center;
        display: flex;
        .ion {
          padding-right: 10px;
          height: 100%;
        }
        &--style {
          position: relative;
          .ion {
            position: absolute;
            width: 14px;
          }
          .massive-nav__dialog__text {
            padding-left: 30px;
          }
        }
      }
    }
  }
</style>
