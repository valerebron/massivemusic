<template>
  <main class="massive-app" :class="'state-'+appStatus+' route-'+this.$route.name+' current-style-'+playerStyle+' player-state-'+playerState+' '+pointerActivity+' '+touchClass">
    <loader class="main-loader" />
    <theheader />
    <router-view></router-view>
    <player />
  </main>
</template>

<script>
  import loader from '../assets/loader.vue'
  import theheader from './header'
  import player from './player'
  import gql from 'graphql-tag';
  export default {
    name: 'app',
    components: {
      theheader,
      loader,
      player,
    },
    data: function() {
      return {
        pointerActivity: 'pointer-active', // pointer-idle
        touchClass: '',
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
    },
    apollo: {
      tracksGQL: {
        query: gql`query tracksQuery {
          tracks {
            id,
            title,
            artist,
            user {id, name},
            style {id, slug, name},
            duration,
            playcount,
            invalid,
            createdAt,
            updatedAt,
          },
          styles {
            id,
            slug,
            name,
          }
        }`,
        update(datas) {
          console.log(this.$apollo)
          this.$store.dispatch('setAppStyles', datas.styles)
          localStorage.setItem('stylesCached', JSON.stringify(datas.styles))
          this.$store.dispatch('initTracks', datas.tracks)
          localStorage.setItem('tracksCached', JSON.stringify(datas.tracks))
          this.$store.dispatch('setAppStatus', 'init')
          this.$store.dispatch('setFavorites')
          // 3- Datas are ready
          window.datasReady = true
          if(window.playerReady) {
            this.$store.dispatch('loadFirstTrack')
          }
        }
      },
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
    },
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
        opacity: 0;
      }
    }
  }

  .main-loader {
    @extend %appStyleStroke;
    transition: opacity 0.3s;
    position: fixed;
    .state-0-loading & {
      opacity: 1;
    }
  }
</style>
