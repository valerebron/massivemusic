<template>
    <section class="tracklist" :class="tracksState">
      <!-- <div class="tracklist__header">
        tracks: {{ tracks.length }}
        query: {{ currentQuery }}
        style: {{ currentStyle }}
        tracklist state: {{ tracksState }}
      </div> -->
      <table class="tracks" @click="setAppState('3-player-open')">
        <tr :class="'track style-'+track.style" v-for="(track,index) in tracks" @click="play(track)" :data-id="track.id_yt" :key="track.id_yt">
          <td>{{ index + 1 }}</td>
          <td>{{ track.title }}</td>
          <td>{{ track.artist }} </td>
          <td>
            <icon-star-outline />
          </td>
        </tr>
      </table>
    </section>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'tracklist',
    props: [
      'player',
      'togglePlay',
      'play',
      'currentStyle',
      'currentQuery',
      'setAppState',
    ],
    data() {
      return {
        tracks: {},
        tracksState: '',
        finishTyping: '',
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
    },
    watch: {
      currentQuery: function() {
        clearTimeout(this.finishTyping)
        this.finishTyping = setTimeout(() => {
          this.search()
        }, 500)
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
    margin-top: $header-height;
    z-index: $z-layer-tracklist;
    &__header {
      color: white;
    }
    &_search {
      z-index: $z-layer-search;
    }
  }
  .tracks {
    list-style-type: none;
    .state-4-search & {
      opacity: 0.3;
    }
  }
  .track {
    cursor: default;
    &--playing {
      color: red;
    }
    td {
      vertical-align: top;
    }
  }
</style>
