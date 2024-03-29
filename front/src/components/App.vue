<template>
  <body class="app" :class="bodyClass">
    <theheader/>
    <navigation/>
    <router-view class="page"></router-view>
    <player/>
  </body>
</template>

<script>
  import TouchSweep from 'touchsweep'
  import theheader from '@/components/templates/header'
  import navigation from '@/components/templates/navigation'
  import player from '@/components/templates/player'
  export default {
    name: 'app',
    components: {
      theheader,
      navigation,
      player,
    },
    metaInfo() {
      return {
        link: [
          {rel: 'canonical', href: window.location.href }
        ],
        meta: [
          { name: 'og:url', content: window.location.href },
          { name: 'og:site_name', content: 'Massivemusic' },
        ],
      }
    },
    computed: {
      route: function() {
        return this.$route.name
      },
      playerStyle: function() {
        return this.$store.getters.playerStyle
      },
      playerState: function() {
        return this.$store.getters.playerState
      },
      bodyClass: function() {
        return [
          {
            'app--nav' : this.$store.getters.ui.nav,
            'app--player' : this.$store.getters.ui.player,
            'app--search' : this.$store.getters.ui.search,
            'app--full' : this.$store.getters.ui.full,
            'touch': ("ontouchstart" in document.documentElement),
            'no-touch': !("ontouchstart" in document.documentElement),
          },
          'route-'+this.$route.name,
          'current-style-'+this.playerStyle,
          'player-'+this.playerState,
        ]
      },
    },
    methods: {
      changeScopeOnScroll() {
        let that = this
        let isfinishScrolling
        document.onscroll = function() {
          clearTimeout(isfinishScrolling)
          isfinishScrolling = setTimeout(function() {
            if(document.getElementsByClassName('tracks')[0]) {
              let scrollHeight = document.getElementsByClassName('tracks')[0].scrollHeight
              let frameHeight = window.innerHeight - (document.getElementsByClassName('player')[0].clientHeight + document.getElementsByClassName('header')[0].clientHeight)
              let offset = 600
              if(document.scrollingElement.scrollTop + frameHeight + offset > scrollHeight) {
                that.$store.dispatch('filterTracks', { type: 'skip', value: '' })
              }
            }
          }, 100)
        }
      },
      keyboardAlias() {
        let self = this
        window.onkeydown = function(e) {
          switch(e.key) {
            case 'MediaPlayPause':
              self.play(self.track)
            break
            case 'MediaTrackNext':
              self.playNext()
            break
            case 'MediaTrackPrevious':
              self.playPrev()
            break
            case 'Escape':
              self.$store.dispatch('ui', {type: 'search', value: false})
              self.$store.dispatch('modal', false)
            break
          }
        }
      },
      closeNavIfMobile() {
        if(window.innerWidth < 769) {
          this.$store.dispatch('ui', {type: 'nav', value: false})
        }
      },
      swipeActions() {
        const area = document.querySelector('.app')
        new TouchSweep(area, {value: 1}, 80)
        area.addEventListener('swiperight', () => {
          if(this.$store.getters.ui.search) {
            this.$store.dispatch('ui', {type: 'search', value: false})
          }
          else if(!this.$store.getters.ui.nav) {
            this.$store.dispatch('ui', {type: 'nav', value: true})
          }
        })
        area.addEventListener('swipeleft', () => {
          if(this.$store.getters.ui.nav) {
            this.$store.dispatch('ui', {type: 'nav', value: false})
          }
          else if(!this.$store.getters.ui.search) {
            this.$store.dispatch('ui', {type: 'search', value: true})
            document.getElementsByClassName('search__input')[0].focus()
          }
        })
      },
    },
    beforeCreate: function() {
      window.apollo = this.$apollo
    },
    mounted: function() {
      this.closeNavIfMobile()
      this.changeScopeOnScroll()
      this.keyboardAlias()
      this.swipeActions()
    },
    watch: {
      $route() {
        this.closeNavIfMobile()
        window.scrollTo(0, 0)
      },
    },
  }
</script>

<style lang="scss">
  .app {
    display: flex;
    overflow-x: hidden;
    .page {
      z-index: $z-index-tracks;
      width: 100%;
      // min-height: calc(100vh - #{$header-height} - #{$player-height});
      display: flex;
      transition: all 0.2s;
      & > *:first-child {
        // min-height: calc(100vh - 75px);
        margin-top: $header-height;
        margin-bottom: 0;
        .app--player {
          margin-bottom: $player-height;
        }
      }
      &--container {
        width: $page-width-phablet;
        @include breakpoint(tablet) {
          width: $page-width-tablet;
        }
        @include breakpoint(desktop) {
          width: $page-width-desktop;
        }
        @include breakpoint(bigscreen) {
          width: $page-width-bigscreen;
        }
        margin: 0 auto;
        min-height: 100vh;
      }
    }
    &--nav {
      overflow-y: hidden;
      @include breakpoint(tablet) {
        overflow-y: auto;
      }
      .nav {
        transform: translateX(0%);
      }
      .page {
        padding-left: $nav-width;
      }
    }
    &--search {
      .logo {
        display: none;
      }
      .search {
        flex-grow: 1;
        justify-content: right;
        &__input {
          display: block;
          flex-grow: 1;
          margin: 0 10px;
          padding: 10px 0;
        }
        &__count {
          display: inline-block;
          right: 80px;
        }
      }
    }
    &--player {
      .page {
        margin-bottom: $player-height;
      }
      .player {
        transform: translateY(0%);
        height: auto;
      }
      .nav {
        height: calc(100vh - #{$header-height} - #{$player-height});
        min-height: calc(100vh - #{$header-height} - #{$player-height});
      }
    }
    &--full {
      overflow: hidden;
      .header, .player__bottom {
        background-color: #00000075;
      }
      .header {
        z-index: $z-index-logo + 20;
        .nav-toggle, .search {
          display: none;
        }
        .logo {
          width: 100%;
          justify-content: center;
        }
      }
      .player {
        height: 100vh;
        bottom: 0;
        &__top {
          position: fixed;
          width: 100%;
          height: calc(100vh - #{$player-height});
          top: 0;
          #player {
            height: 100vh;
          }
        }
        &__bottom {
          position: fixed;
          width: 100%;
          bottom: 0;
          .player-infos {
            text-shadow: black 0px 0px 1px;
          }
        }
        .player-next {
          width: 44px;
          height: 64px;
          border: auto;
          svg {
            width: auto;
          }
        }
      }
      .up-down-icon {
        transform: rotateX(180deg);
      }
    }
    &[data-dialog='true'] {
      overflow: hidden!important;
      .player {
        opacity: 0;
      }
      .page {
        z-index: $z-index-dialog;
      }
    }
  }
</style>
