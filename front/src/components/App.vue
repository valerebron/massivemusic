<template>
  <main class="massive-app" :class="'state-'+appStatus+' route-'+this.$route.name+' current-style-'+playerStyle+' player-state-'+playerState">
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
    computed:{
      appStatus:{
        get(){ return this.$store.getters.appState },
        set(value){ this.$store.dispatch('setAppStatus', value) }
      },
      playerStyle:{
        get(){ return this.$store.getters.playerTrack.style_id }
      },
      playerState:{
        get(){ return this.$store.getters.playerState }
      },
    },
    mounted: function() {
      // A- LOAD DATAS
      if(localStorage.getItem('stylesCached')) { // if cache
        let stylesCached = JSON.parse(localStorage.getItem('stylesCached'))
        let tracksCached = JSON.parse(localStorage.getItem('tracksCached'))
        this.$store.dispatch('setAppStyles', stylesCached)
        this.$store.dispatch('initTracks', tracksCached)
        this.$store.dispatch('setAppStatus', '2-init-screen')
      }
      else {  // if no cache
      // 1-styles
        axios
          .get(window.APIURL+'/styles')
          .then((res) => {
            this.$store.dispatch('setAppStyles', res.data)
            localStorage.setItem('stylesCached', JSON.stringify(res.data))
          })
          .catch(function(error){
            console.log(error)
          })
      // 2-tracks
        axios
          .get(window.APIURL+'/tracks')
          .then((res) => {
            this.$store.dispatch('initTracks', res.data)
            this.$store.dispatch('setAppStatus', '2-init-screen')
            localStorage.setItem('tracksCached', JSON.stringify(res.data))
          })
          .catch(function(error){
            console.log(error)
          })
      }
      // 3-favorites
      this.$store.dispatch('setFavorites')
      // B- CHANGE TRACKLIST SCOPE ON SCROLL
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
  }
</script>

<style lang="scss">
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
    iframe {
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
      transition: all 0.3s;
      .state-5-player-full & {
        opacity: 1;
      }
    }
  }
  .loader {
    @extend %appStyleStroke;
  }
</style>
