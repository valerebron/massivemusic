<template>
  <nav class="massive-nav">
    <button class="massive-nav__toggle" @click="toggleNav()">
      <icon-burger-close/>
    </button>
    <div class="massive-nav__dialog" @click="toggleNav()">
      <router-link v-for="style in $store.getters.appStyles" :to="style.slug" :class="'massive-nav__dialog__link style-bkg-'+style.id+' style-hover-'+style.id" :key="style.id">
        <div class="massive-nav__dialog__link-container massive-nav__dialog__link-container--style">
          <span class="massive-nav__dialog__text">
            {{ style.name }}
          </span>
        </div>
      </router-link>
      <router-link to="favorites" class="massive-nav__dialog__link massive-nav__dialog__link--favorite">
        <div class="massive-nav__dialog__link-container">
          <icon-star/>
          Favorites
        </div>
      </router-link>
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
  import iconBurgerClose from '../assets/icon-burger-close.vue'
  export default {
    name: 'navigation',
    components: {
      iconBurgerClose,
    },
    methods: {
      toggleNav() {
        if(this.$store.getters.appState !== 'state-nav') {
          this.$store.dispatch('setAppStatus', 'state-nav')
        }
        else {
          this.$store.dispatch('setAppStatus', 'init')
        }
      },
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
      position: fixed;
      bottom: 0;
      left: -100vw;
      display: flex;
      justify-content: center;
      transition: left 0.3s;
      height: calc(100vh - #{$player-height} + 26px);
      width: 100%;
      display: flex;
      flex-direction: column;
      .state-nav & {
        left: 0;
      }
      &.open {
        left: 0;
      }
      &__link {
        flex-grow: 1;
        display: flex;
        color: black;
        background-color: $grey-6;
        justify-content: center;
        cursor: pointer;
        padding: 8px;
        font-size: 20px;
        text-transform: uppercase;
        &:active {
          opacity: 0.5;
        }
        &:focus {
          background: #ffffff14;
          // border-radius: 150px;
        }
        &--favorite {
          .ion__svg {
            color: $favorite-color;
          }
        }
        &.router-link-active {
          cursor: default;
        }
        &.router-link-active, &:hover {
          color: white;
          background-color: $color-selection;
        }
      }
      &__link-container {
        width: 180px;
        text-align: left;
        align-items: center;
        display: flex;
        .ion {
          padding-right: 10px;
          height: 100%;
          display: flex;
          align-items: center;
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
