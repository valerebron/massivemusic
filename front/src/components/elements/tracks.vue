<template>
  <table class="tracks" :key="filter.type">
    <tr v-for="(track, index) in tracks" class="track" :class="[{'track--invalid': track.invalid}, track.id]" :key="track.id">
      <td :class="'track__index style-'+track.style.id" @click="play(track)">
        {{ index + 1 }}
      </td>
      <td :class="'track__dot style-'+track.style.id" @click="play(track)">
        ‧
      </td>
      <td :class="'track__title style-'+track.style.id" @click="play(track)">
        {{ track.title }}
      </td>
      <td class="track__artist" @click="search(track.artist)">
        {{ track.artist }}
      </td>
     <td>
       {{ Date.parse(track.createdAt) | moment('from', 'now') }}
     </td>
      <td @click.prevent="$store.dispatch('toggleFavorite', track)" class="track__favorite">
        <icon-star-inline v-if="$store.getters.isFavorite(track)" />
        <icon-star-outline v-else style="opacity: 0.5" />
      </td>
      <td v-if="$route.name === 'my-tracks' || $route.name === 'pending-tracks'">
        <button class="track__drop" @click="drop(track)">
          <icon-trash/>
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    name: 'tracks',
    props: ['filter'],
    computed:{
      tracks: {
        get(){ return this.$store.getters.tracks },
      },
    },
    methods: {
      play(track) {
        this.$store.dispatch('play', track)
      },
      load() {
        if(this.filter.type === 'favorites') {
          this.$store.dispatch('filterFavorites')
        }
        else {
          this.$store.dispatch('filterTracks', this.filter)
        }
      },
      drop(track) {
        this.$store.dispatch('dropTrack', track)
      },
      search(terms) {
        this.$store.dispatch('filterTracks', {type: 'search', value: terms})
      },
    },
    mounted() {
      // console.log('mounted')
      this.$store.commit('RESET_FILTERS')
      this.load()
    },
    updated() {
      // console.log('updated')
      this.load()
    },
  }
</script>

<style lang="scss">
  .tracks {
    z-index: $z-index-tracks;
    width: 100%;
    border-collapse: collapse;
    .track {
      cursor: default;
      border-bottom: 1px rgba(255, 255, 255, 0.1) solid;
      height: 50px;
      filter: grayscale(0);
      transition: all 0.2s;
      &:hover {
        background-color: $color-selection;
      }
      &:active {
        opacity: 0.5;
      }
      &:focus {
        background-color: $color-selection;
      }
      &--playing {
        background-color: $color-selection;
      }
      &--invalid {
        background-color: $invalidate-color;
        filter: grayscale(80%);
      }
      &--invalidate, &--dropped {
        background-color: $invalidate-color;
        filter: grayscale(80%);
        opacity: 0.5;
        height: 0;
        display: none;
      }
      &__index {
        text-align: center;
      }
      td {
        vertical-align: middle;
      }
      &__dot {
        font-size: 34px;
        text-align-last: left;
      }
      &__title {
        padding-left: 8px;
      }
      &__artist {
        @extend %artistStyle;
      }
      &__favorite {
        cursor: pointer;
        color: $favorite-color;
      }
      &__drop {
        .ion {
          pointer-events: none;
        }
      }
    }
  }
</style>
