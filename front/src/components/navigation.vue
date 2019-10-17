<template>
  <nav class="massive-nav">
    <button class="massive-nav__toggle" @click="toggleNav()">
      <icon-burger-close/>
    </button>
    <div class="massive-nav__dialog" @click="toggleNav()">
      <router-link v-for="style in $store.getters.appStyles" :to="style.slug" :class="'massive-nav__dialog__link style-bkg-'+style.id+' style-hover-'+style.id" :key="style.id">
        {{ style.name }}
      </router-link>
      <router-link to="favorites" class="massive-nav__dialog__link massive-nav__dialog__link--favorite">
          <icon-star/>
          Favorites
      </router-link>
      <router-link to="login" class="massive-nav__dialog__link">
        <icon-contact/>
        login
      </router-link>
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
        text-shadow: 0 0 4px black;
        flex-grow: 1;
        display: flex;
        color: white;
        background-color: black;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 8px;
        font-size: 20px;
        text-transform: uppercase;
        .ion {
          padding-right: 10px;
        }
        &:active {
          opacity: 0.5;
        }
        &:focus {
          background: #ffffff14;
          // border-radius: 150px;
        }
        &.router-link-active {
          cursor: default;
        }
        &.router-link-active, &:hover {
          color: white;
          background-color: $color-selection;
        }
      }
    }
  }
</style>
