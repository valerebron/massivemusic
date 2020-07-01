<template>
  <table v-if="tracks.length!==0" class="tracks" :key="filter.type+filter.value">
    <tr v-for="(track, index) in tracks" class="track" :class="[{'track--invalid': track.invalid},{'track--pending': track.pending}, track.yt_id]" :key="track.yt_id">
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
      <td class="track__createdat">
        {{ Date.parse(track.createdAt) | moment('from', 'now') }}
      </td>
      <td class="track__favorite" v-if="isFavoritable">
        <button @click.prevent="$store.dispatch('toggleFavorite', track)">
          <icon-star-inline v-if="$store.getters.isFavorite(track)" />
          <icon-star-outline v-else style="opacity: 0.5" />
        </button>
      </td>
      <td v-if="isEditable">
        <button class="track__update" @click="openEdit(track)">
          <icon-sync/>
        </button>
        <button class="track__validate" @click="openValidate(track)">
          <icon-valid/>
        </button>
        <button class="track__drop" @click="openDrop(track)">
          <icon-trash/>
        </button>
      </td>
    </tr>
    <trackEdit v-if="isEditable && isEditOpen" :oldTrack="trackToEdit" @closeEdit="closeEdit()" />
    <trackValidate v-if="isEditable && isValidateOpen" :track="trackToValidate" @closeValidate="closeValidate()" />
    <trackDrop v-if="isEditable && isDropOpen" :track="trackToDrop" @closeDrop="closeDrop()" />
  </table>
  <section v-else class="no-track">
    No tracks sorry
  </section>
</template>

<script>
  import trackEdit from './track-edit'
  import trackValidate from './track-validate'
  import trackDrop from './track-drop'
  export default {
    name: 'tracks',
    components: { trackEdit, trackValidate, trackDrop },
    props: ['filter'],
    computed:{
      tracks: {
        get(){ return this.$store.getters.tracks },
      },
      isEditable: {
        get(){ return this.$route.name === 'my-tracks' || this.$route.name === 'admin' || this.$route.name === 'invalid-tracks' || this.$route.name === 'pending-tracks' },
      },
      isFavoritable: {
        get(){ return this.$route.name !== 'invalid-tracks' && this.$route.name !== 'pending-tracks' },
      },
    },
    data: function() {
      return {
        isEditOpen: false,
        isDropOpen: false,
        isValidateOpen: false,
        trackToEdit: {},
      }
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
      openEdit(track) {
        this.trackToEdit = track
        this.isEditOpen = true
        this.$store.dispatch('modal', true)
      },
      closeEdit() {
        this.$store.dispatch('modal', false)
        this.isEditOpen = false
      },
      openDrop(track) {
        this.trackToDrop = track
        this.isDropOpen = true
        this.$store.dispatch('modal', true)
      },
      closeDrop() {
        this.$store.dispatch('modal', false)
        this.isDropOpen = false
      },
      openValidate(track) {
        this.trackToValidate = track
        this.isValidateOpen = true
        this.$store.dispatch('modal', true)
      },
      closeValidate() {
        this.$store.dispatch('modal', false)
        this.isValidateOpen = false
      },
      search(terms) {
        this.$store.dispatch('filterTracks', {type: 'search', value: terms})
      },
    },
    mounted() {
      this.$store.commit('RESET_FILTERS')
      this.load()
    },
    updated() {
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
      td:last-child {
        display: flex;
        justify-content: flex-end;
      }
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
      &--pending {
        background-color: $pending-color;
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
      &__createdat {
        font-size: 12px;
        display: none;
        @include breakpoint(desktop) {
          display: table-cell;
        }
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
  .no-track {
    width: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
  }
</style>
