<template>
    <section :class="'tracklist '+tracksState">
      <!-- <div class="tracklist__header">
        tracks: {{ tracks.length }}
        query: {{ currentQuery }}
        style: {{ currentStyle }}
        tracklist state: {{ tracksState }}
      </div> -->
      <loader/>
      <table class="tracks" @click="setAppState('3-player-open')">
        <tr :class="'track style-'+track.style" v-for="(track,index) in tracks" :data-id="track.id_yt" :key="track.id_yt">
          <td @click="play(track)" class="track__index">{{ index + 1 }}</td>
          <td @click="play(track)">{{ track.title }}</td>
          <td class="track__action">{{ track.artist }} </td>
          <td @click.prevent="toggleFavorite(track)" class="track__favorite">
            <icon-star-inline v-if="isFavorite(track.id_yt)" />
            <icon-star-outline style="opacity: 0.5" v-else />
          </td>
        </tr>
      </table>
    </section>
</template>

<script>
  import axios from 'axios'
  import loader from '../assets/loader.vue'
  export default {
    name: 'tracklist',
    components: {
      loader,
    },
    props: [
      'player',
      'togglePlay',
      'play',
      'currentStyle',
      'currentQuery',
      'setAppState',
      'appStyle',
      'favorites',
      'toggleFavorite',
      'isFavorite',
    ],
    data() {
      return {
        tracks: {},
        tracksState: '',
        finishTyping: '',
      }
    },
    methods: {
      loadTrack() {
        // 1-local favorites
        if(this.$route.name == 'Favorites') {
          this.tracksState = 'loading'
          this.tracks = JSON.parse(localStorage.getItem('favorites'))
          this.tracksState = ''
          this.currentQuery = ''
          this.$store.commit('setAppTracks', this.tracks)
          this.$store.commit('setAppNbResult', this.tracks.length)
          this.$emit('trackListReady')
        }
        // 2-massive tracks
        else {
          this.tracksState = 'loading'
          axios
            .get(window.APIURL+'/tracks', {
              params: {
                search: this.currentQuery,
                appStyle: this.appStyle,
              }
            })
            .then((res) => {
              this.tracks = res.data.items
              this.tracksState = ''
              this.$store.commit('setAppTracks', this.tracks)
              this.$store.commit('setAppNbResult', res.data.count)
              let self = this
              setTimeout(function(){
                self.$emit('trackListReady')
              }, 2000)
            })
        }
      },
    },
    watch: {
      currentQuery: function() {
        clearTimeout(this.finishTyping)
        this.finishTyping = setTimeout(() => {
          this.loadTrack()
        }, 500)
      },
      appStyle: function() {
        this.$store.commit('setAppStyle', this.appStyle)
        this.loadTrack()
        this.setAppState('3-player-open')
      },
      $route: function(to) {
        switch(to.name) {
          case 'Home':
            this.loadTrack()
          break
          case 'Favorites':
            this.loadTrack()
          break
        }
      },
    },
    mounted: function() {
      this.$store.commit('setAppStyle', this.appStyle)
      this.loadTrack()
    },
  }
</script>

<style lang="scss">
  .tracklist {
    margin-top: $header-height + 40px;
    margin-bottom: $header-height + 80px;
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
    border-collapse: collapse;
    .state-4-search & {
      opacity: 0.3;
    }
  }
  .track {
    cursor: default;
    border-bottom: 1px rgba(255, 255, 255, 0.1) solid;
    height: 50px;
    &:hover {
      background-color: $color-selection;
    }
    &--playing {
      background-color: $color-selection;
    }
    &__index {
      text-align: center;
    }
    td {
      vertical-align: middle;
    }
    &__favorite {
      cursor: pointer;
      color: $favorite-color;
    }
  }
</style>
