<template>
    <section :class="tracksState">
      <input type="search" @input="search($event.target.value)">
      {{ tracks.length }}
      {{ tracksState }}
      <ul class="tracks">
        <li class="track" v-for="track in tracks" @click="play(track.id_yt)" :data-id="track.id_yt" :key="track.id_yt">
          {{ track.title }}
          {{ track.artist }}
          {{ track.style }}
        </li>
      </ul>
    </section>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'tracklist',
    props: {
      player: player,
    },
    data() {
      return {
        tracks: {},
        tracksState: '',
      }
    },
    methods: {
      search(query) {
        // all tracks
        if(query == 'all' || query == '') {
          this.tracksState = 'loading'
          axios
            .get(window.APIURL+'/tracks')
            .then((res) => {
              this.tracks = res.data
              this.tracksState = ''
            })
        }
        else {
          // found track(s)
          this.tracksState = 'loading'
          axios
            .get(window.APIURL+'/tracks/s/'+query)
            .then((res) => {
              this.tracks = res.data
              this.tracksState = ''
            })
        }
      }
    },
    mounted: function() {
      this.search('all')
    },
  }
</script>

<style lang="scss">
  .tracks {
    background-color: black;
    color: white;
    list-style-type: none;
  }
  .track {
    &--playing {
      color: red;
    }
  }
</style>
