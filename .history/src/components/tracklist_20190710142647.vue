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
    props: [
      'player',
      'togglePlay'
    ],
    data() {
      return {
        tracks: {},
        tracksState: '',
      }
    },
    methods: {
      play(id) {
        if(this.currentYtid == id) {
          this.togglePlay()
        }
        else {
          this.player.stopVideo()
          this.player.loadVideoById(id)
          this.currentYtid = id
          if(document.querySelector('.track--playing') !== null) {
            document.querySelector('.track--playing').classList.remove('track--playing')
          }
          document.querySelector('[data-id="'+id+'"]').classList.add('track--playing')
        }
      },
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
      },
      StyleIdToName(id) {
        switch(this.currentStateId) {
          case 11:
            return 'Dubstep'
          case 12:
            return 'Drum & Bass'
          case 13:
            return 'Dub'
          case 14:
            return 'Break Beat'
          case 15:
            return 'Deep Bass'
          case 19:
            return 'Electro'
          default:
            return ''
        }
      },
    },
    mounted: function() {
      this.search('all')
      console.log(this.player)
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
