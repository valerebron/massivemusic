<template>
  <main class="massive-app" :class="'state-'+appStatus+' route-'+this.$route.name+' current-style-'+playerStyle+' player-state-'+playerState+' '+pointerActivity">
    <loader/>
    <theheader />
    <router-view></router-view>
    <player />
  </main>
</template>

<script>
  import axios from 'axios'
  import loader from '../assets/loader.vue'
  import theheader from './header'
  import player from './player'
  export default {
    name: 'app',
    components: {
      theheader,
      loader,
      player,
    },
    data: function() {
      return {
        pointerActivity: 'pointer-active' // pointer-idle
      }
    },
    computed: {
      appStatus: {
        get(){ return this.$store.getters.appState },
        set(value){ this.$store.dispatch('setAppStatus', value) }
      },
      playerStyle: {
        get(){ return this.$store.getters.playerTrack.style_id }
      },
      playerState: {
        get(){ return this.$store.getters.playerState }
      },
    },
    mounted: function() {
      this.loadDatas()
      this.changeScopeOnScroll()
      this.trackPointerActivity()
    },
    methods: {
      loadDatas() {
         // 1- cache
        if(localStorage.getItem('stylesCached') && localStorage.getItem('tracksCached')) {
          let stylesCached = JSON.parse(localStorage.getItem('stylesCached'))
          let tracksCached = JSON.parse(localStorage.getItem('tracksCached'))
          this.$store.dispatch('setAppStyles', stylesCached)
          this.$store.dispatch('initTracks', tracksCached)
          this.$store.dispatch('setAppStatus', '2-init-screen')
        }
        else {  // 2- no cache
          axios
            .get(window.APIURL+'/styles')
            .then((res) => {
              this.$store.dispatch('setAppStyles', res.data)
              localStorage.setItem('stylesCached', JSON.stringify(res.data))
              axios
              .get(window.APIURL+'/tracks')
              .then((res) => {
                this.$store.dispatch('initTracks', res.data)
                localStorage.setItem('tracksCached', JSON.stringify(res.data))
                this.$store.dispatch('setAppStatus', '2-init-screen')
              })
              .catch(function(error){
                console.log(error)
              })
            })
            .catch(function(error){
              console.log(error)
            })
        }
        // 3- favorites
        this.$store.dispatch('setFavorites')
      },
      changeScopeOnScroll() {
        let pageOffset = 155
        let trackHeight = 50
        let loadOffset = 1
        let that = this
        window.onscroll = function() {
          let nbTrackScrolled = ((document.documentElement.scrollTop + window.innerHeight - pageOffset) / trackHeight) + loadOffset
          if(nbTrackScrolled > that.$store.getters.scope) {
            that.$store.dispatch('enlargeScope')
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
  body {
    &.no-scroll {
      overflow: hidden;
    }
  }
  .loader {
    @extend %appStyleStroke;
  }
  .massive-app {
    .loader {
      transition: opacity 0.3s;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
    }
    &.state-0-loading {
      .loader {
        opacity: 1;
      }
    }
    &.pointer-idle.state-5-player-full {
      cursor: none;
      .player__bottom {
        opacity: 0;
      }
    }
  }
</style>
