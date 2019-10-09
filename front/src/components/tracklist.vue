<template>
    <section :class="'tracklist '">
      <table class="tracks">
        <tr v-for="(track, index) in $store.getters.tracks" class="track" :data-id="track.id_yt" :key="track.id_yt">
          <td :class="'track__index style-'+track.style_id" @click="play(track)">
            {{ index + 1 }}
          </td>
          <td :class="'track__dot style-'+track.style_id" @click="play(track)">
            ‧
          </td>
          <td :class="'track__title style-'+track.style_id" @click="play(track)">
            {{ track.title }}
          </td>
          <td>
            <span class="track__artist" @click.prevent="filterByArtist(track.artist)">
              {{ track.artist }}
            </span>
          </td>
          <td @click.prevent="$store.dispatch('toggleFavorite', track.id_yt)" class="track__favorite">
            <icon-star-inline v-if="isFavorite(track.id_yt)" />
            <icon-star-outline style="opacity: 0.5" v-else />
          </td>
        </tr>
      </table>
    </section>
</template>

<script>
  export default {
    name: 'tracklist',
    methods: {
      play(track) {
        this.$store.dispatch('play', track)
      },
      filterByArtist(artist) {
        this.$store.dispatch('setAppStatus', '2-init-screen')
        this.$store.dispatch('setFilter', {type: 'artist', value: artist})
      },
      isFavorite(id_yt) {
        let favorites = this.$store.getters.favorites
        if(favorites !== null && favorites.indexOf(id_yt) != -1) {
          return true
        }
        else {
          return false
        }
      },
    }
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
  }
  .track {
    cursor: default;
    border-bottom: 1px rgba(255, 255, 255, 0.1) solid;
    height: 50px;
    filter: grayscale(0);
    transition: all 0.2s;
    &:hover {
      background-color: $color-selection;
    }
    &--playing {
      background-color: $color-selection;
    }
    &--invalidate {
      // background-color: $invalidate-color;
      filter: grayscale(80%);
      opacity: 0.5;
      // height: 0;
      // line-height: 0;
      // font-size: 0;
      // border-bottom: 0;
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
  }
</style>
