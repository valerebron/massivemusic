<template>
    <main class="massive-app" :class="'state-'+appStatus+' apollo-loading-'+$apollo.loading+' route-'+this.$route.name+' current-style-'+playerStyle+' player-state-'+playerState+' '+pointerActivity+' '+touchClass">
      <theheader />
      <router-view></router-view>
      <player />
      <div class="main-loader">
        <div class="main-loader__wrapper">
          <div class="main-loader__1"></div>
          <div class="main-loader__2"></div>
        </div>
      </div>
    </main>
</template>

<script>
  import theheader from './header'
  import player from './player'
  import gql from 'graphql-tag';
  export default {
    name: 'app',
    components: {
      theheader,
      player
    },
    data: function() {
      return {
        pointerActivity: 'pointer-active', // pointer-idle
        touchClass: ''
      }
    },
    computed: {
      appStatus: {
        get(){ return this.$store.getters.appState },
        set(value){ this.$store.dispatch('setAppStatus', value) }
        // get(){ return window.status },
        // set(value){ window.status = value }
      },
      playerStyle: {
        get(){ return this.$store.getters.playerStyle }
      },
      playerState: {
        get(){ return this.$store.getters.playerState }
      },
    },
    mounted: function() {
      this.touchClass = (("ontouchstart" in document.documentElement) ? ' touch' : ' no-touch')
      this.changeScopeOnScroll()
      this.trackPointerActivity()

      const mainLoader = document.querySelector('.main-loader')
      const mainLoader2 = document.querySelector('.main-loader__2')

      setTimeout(()=> {
        // console.log('launch progress bar')
        mainLoader2.style.width = '120px'
      }, 1)
      let apolloWatcher = setInterval(() => {
        if(!this.$apollo.loading) {
          // console.log('destroy loader')
          setTimeout(() => {
            mainLoader.style.display = 'none'
            clearInterval(apolloWatcher)
          }, 400);

          this.$store.dispatch('initTracks', this.$apollo.data.tracks)
          localStorage.setItem('tracksCached', JSON.stringify(this.$apollo.data.tracks))
          this.$store.dispatch('setAppStyles', this.$apollo.data.styles)
          localStorage.setItem('stylesCached', JSON.stringify(this.$apollo.data.styles))

          this.$store.dispatch('setAppStatus', 'init')
          this.$store.dispatch('setFavorites')
          // 3- Datas are ready
          window.datasReady = true
          if(window.playerReady) {
              this.$store.dispatch('loadFirstTrack')
          }

        }
      }, 100)
    },
    apollo: {
      styles: gql`
      query {
        styles {
          id
          name
          slug
        }
      }`,
      tracks: gql`
      query {
        tracks {
          id
          title
          artist
          duration
          playcount
          invalid
          style {
            id
          }
          user {
            name
          }
        }
      }`,
      users: gql`
      query {
        users {
          name
          email
        }
      }`,
    },
    methods: {
      changeScopeOnScroll() {
        let pageOffset = 155
        let trackHeight = 50
        let loadOffset = 1
        let that = this
        window.onscroll = function() {
          let nbTrackScrolled = ((document.documentElement.scrollTop + window.innerHeight - pageOffset) / trackHeight) + loadOffset
          if(nbTrackScrolled > that.$store.getters.scope) {
            that.$store.dispatch('stretchScope')
          }
        }
      },
      trackPointerActivity() {
        let self = this
        let pointerTimeout =''
        window.onmousemove = function() {
          self.pointerActivity = 'pointer-active'
          clearTimeout(pointerTimeout)
          pointerTimeout = setTimeout(()=>{
            self.pointerActivity = 'pointer-idle'
          }, 3000)
        }
      },
    }
  }
</script>

<style lang="scss">
  html {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }
  body {
    &.no-scroll {
      overflow: hidden;
    }
  }

  .massive-app {
    &.pointer-idle.state-full {
      cursor: none;
      .player__bottom {
        opacity: 1;
      }
    }
  }

  .apollo-loading-true {
    .massive-logo {
      height: 100vh;
    }
    .massive-nav, .search, .tracklist, .player {
      opacity: 0;
    }
  }

  .apollo-loading-false {
    .main-loader {
      opacity: 0;
    }
  }

  .main-loader {
    transition: opacity 0.3s;
    position: fixed;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    &__1, &__2 {
      transition: width 0.6s;
      position: absolute;
      height: 2px;
      width: 0px;
      content: '';
      display: block;
    }
    &__1 {
      width: 120px;
      background-color: rgb(68, 68, 68);
    }
    &__2 {
      @extend %appStyleBkgColor;
    }
    &__wrapper {
      position: relative;
      top: 60px;
      left: -60px;
    }
  }

</style>
