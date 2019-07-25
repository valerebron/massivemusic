<template>
    <section class="tracklist" :class="tracksState">
      <div class="tracklist__header">
        <styles_selector @changeStyleFilter="styleFilter($event)" />
        <input class="tracklist__search" type="search" @input="currentQuery = $event.target.value">
        tracks: {{ tracks.length }}
        query: {{ currentQuery }}
        style: {{ currentStyle }}
        tracklist state: {{ tracksState }}
      </div>
      <ul class="tracks">
        <li class="track" v-for="track in tracks" @click="play(track)" :data-id="track.id_yt" :key="track.id_yt">
          {{ track.title }}
          {{ track.artist }}
          {{ track.style }}
        </li>
      </ul>
    </section>
</template>

<script>
  import axios from 'axios'
  import styles_selector from './styles-selector.vue'
import { setTimeout } from 'timers';

  export default {
    name: 'tracklist',
    components: {
      styles_selector
    },
    props: [
      'player',
      'togglePlay',
      'play',
    ],
    data() {
      return {
        tracks: {},
        tracksState: '',
        currentQuery: '',
        currentStyle: '',
      }
    },
    methods: {
      search() {
        // all tracks
        if(this.currentQuery == 'all' || this.currentQuery == '') {
          this.tracksState = 'loading'
          axios
            .get(window.APIURL+'/tracks', {
              params: {
                currentStyle: this.currentStyle
              }
            })
            .then((res) => {
              this.tracks = res.data
              this.tracksState = ''
              this.currentQuery = ''
              let self = this
              setTimeout(function(){
                self.$emit('trackListReady')
              }, 2000)
            })
        }
        else {
          // query
          this.tracksState = 'loading'
          axios
            .get(window.APIURL+'/tracks/s/'+this.currentQuery, {
              params: {
                currentStyle: this.currentStyle
              }
            })
            .then((res) => {
              this.tracks = res.data
              this.tracksState = ''
            })
        }
      },
      styleFilter(id) {
        if(this.currentStyle == id) {
          this.currentStyle = ''
        }
        else {
          this.currentStyle = id
        }
      },
    },
    watch: {
      currentQuery: function() {
        this.search()
      },
      currentStyle: function() {
        this.search()
      },
    },
    mounted: function() {
      this.search()
    },
  }
</script>

<style lang="scss">
  .tracklist {
    &__header {
      // position: fixed;
    }
  }
  .tracks {
    list-style-type: none;
  }
  .track {
    &--playing {
      color: red;
    }
  }
</style>
