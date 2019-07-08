<template>
  <div class="app" :class="pageState">
    <loader class="app__loader" />
    <Header class="erudi_header" />
    <router-view class="erudi_page" @pageLoading="changePageState('loading')" @pageFinishLoading="changePageState('')"></router-view>
  </div>
</template>

<script>
  import Header from './components/erudi_header.vue'
  import config from '../config.json'
  import loader from './assets/loader.svg'

  export default {
    name: 'app',
    components: {
      Header,
      loader
    },
    data: function() {
      return {
        pageState: 'loading'
      }
    },
    methods: {
      changePageState: function(state) {
        this.pageState = state
      }
    },
    beforeCreate: function() {
      window.APIURL = config.apiHost
    }
  }
</script>

<style lang="scss">
  @import 'scss/main.scss';
  .app {
    background-color: $appBackground;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    &__loader {
      opacity: 0;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -22px;
      margin-top: -22px;
      transition: opacity 0.5s;
    }
    &.loading {
      .app__loader {
        opacity: 1;
        z-index: $indexLoader;
      }
    }
    button, a {
      &:focus {
        // outline: none;
      }
    }
    a {
      text-decoration: none!important;
    }
    h1 {
      margin: 0;
      display: contents;
    }
    .erudi-button {
      text-transform: uppercase;
      transition: 0.2s;
      cursor: pointer;
      color: $appLinksColor;
      background-color: $appLinksBkg;
    }
    .erudi-input {
      @extend %links-style;
    }
    .erudi-button, .erudi-input {
      border-radius: 0;
      border: none;
      padding: 8px 12px;
    }
    .erudi_page {
      padding-top: 160px;
      padding-right: 20px;
      padding-left: 20px;
      width: 100%;
      > * {
        &:nth-child(10n+0) {
          .link__a {
            background-color: $color0;
          }
        }
        &:nth-child(10n+1) {
          .link__a {
            background-color: $color1;
          }
        }
        &:nth-child(10n+2) {
          .link__a {
            background-color: $color2;
          }
        }
        &:nth-child(10n+3) {
          .link__a {
            background-color: $color3;
          }
        }
        &:nth-child(10n+4) {
          .link__a {
            background-color: $color4;
          }
        }
        &:nth-child(10n+5) {
          .link__a {
            background-color: $color5;
          }
        }
        &:nth-child(10n+6) {
          .link__a {
            background-color: $color6;
          }
        }
        &:nth-child(10n+7) {
          .link__a {
            background-color: $color7;
          }
        }
        &:nth-child(10n+8) {
          .link__a {
            background-color: $color8;
          }
        }
        &:nth-child(10n+9) {
          .link__a {
            background-color: $color9;
          }
        }
      }
    }
  }
</style>
