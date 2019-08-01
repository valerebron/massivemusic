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
      'appStyle',
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
                appStyle: this.appStyle
              }
            })
            .then((res) => {
              this.tracks = res.data
              this.tracksState = ''
              this.currentQuery = ''
              this.$store.commit('setAppTracks', this.tracks)
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
                appStyle: this.appStyle
              }
            })
            .then((res) => {
              this.tracks = res.data
              this.tracksState = ''
              this.$store.commit('setAppTracks', this.tracks)
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
      appStyle: function() {
        this.$store.commit('setAppStyle', this.appStyle)
        this.search()
        this.setAppState('3-player-open')
      },
    },
    mounted: function() {
      this.$store.commit('setAppStyle', this.appStyle)
      this.search()
    },
  }
</script>

<style lang="scss">
  .tracklist {
    margin-top: $header-height+40px;
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
    width: 100%;
    .state-4-search & {
      opacity: 0.3;
    }
  }
  .track {
    cursor: default;
    &--playing {
      background-color: $color-selection;
    }
    td {
      vertical-align: top;
    }
  }
</style>
