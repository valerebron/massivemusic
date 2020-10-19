<template>
  <table v-if="tracks.length!==0" class="tracks" :class="{'tracks--loading' : $store.getters.isLoading}" :key="filter.type+filter.value">
    <tr
      v-for="(track, index) in tracks"
      class="track"
      :class="[{
        'track--invalid': track.invalid,
        'track--pending': track.pending,
        'track--playing' : (track.yt_id === $store.getters.playerTrack.yt_id)
      }, 'style-bkg-'+track.style.id]"
      :key="track.yt_id"
    >
      <td :class="'track__index style-'+track.style.id" @click="forcePlay(track)">
        {{ index + 1 }}
      </td>
      <td :class="'track__dot style-'+track.style.id" @click="play(track)">
        ‧
      </td>
      <td :class="'track__title style-'+track.style.id" @click="play(track)" :contenteditable="isEditable" @blur="update($event, track, 'title')">
        {{ track.title }}
        <time class="track__duration">
          {{ formatTime(track.duration) }}
        </time>
      </td>
      <td class="track__artist" @click="search(track.artist)" :contenteditable="isEditable" @blur="update($event, track, 'artist')">
        {{ track.artist }}
      </td>
      <td class="track__createdat">
        {{ Date.parse(track.createdAt) | moment('from', 'now') }}
      </td>
      <td class="track__actions">
        <button class="toggle_favorite" v-if="isFavoritable" @click.prevent="$store.dispatch('toggleFavorite', track)">
          <icon-star-inline v-if="$store.getters.isFavorite(track)" />
          <icon-star-outline v-else style="opacity: 0.5" />
        </button>
        <template v-if="isEditable">
          <button class="edit" @click="openEdit(track)">
            <icon-edit/>
          </button>
          <button class="validate" @click="openValidate(track)">
            <icon-valid/>
          </button>
          <button class="drop" @click="openDrop(track)">
            <icon-trash/>
          </button>
        </template>
      </td>
      <td class="track__user">
        <router-link :to="'/user/'+track.user.id+'/profile'" class="track__user__link" :title="track.user.name">
          <avatar :user="track.user" size="small" />
        </router-link>
      </td>
    </tr>
    <trackEdit v-if="isEditable && isEditOpen" :trackToEdit="trackToEdit" @closeEdit="closeEdit()" />
    <trackValidate v-if="isEditable && isValidateOpen" :track="trackToValidate" @closeValidate="closeValidate()" />
    <trackDrop v-if="isEditable && isDropOpen" :track="trackToDrop" @closeDrop="closeDrop()" />
  </table>
  <section v-else-if="$store.getters.trackIsLoading" class="tracks">
    <loader />
  </section>
  <section v-else class="no-track tracks">
    No track :(
  </section>
</template>

<script>
  import avatar from '@/components/atoms/avatar'
  import trackEdit from '@/components/molecules/track/edit'
  import trackValidate from '@/components/molecules/track/validate'
  import trackDrop from '@/components/molecules/track/drop'
  import loader from '@/components/atoms/loader.vue'
  export default {
    name: 'tracks',
    components: { trackEdit, trackValidate, trackDrop, avatar, loader },
    props: ['filter'],
    computed:{
      tracks: {
        get(){ return this.$store.getters.tracks },
      },
      isEditable: {
        get(){ return this.$route.params.user_id === 'me' || this.$route.name === 'admin' || this.$route.name === 'invalid-tracks' || this.$route.name === 'pending-tracks' },
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
        isLoading: true,
        trackToEdit: {},
      }
    },
    methods: {
      play(track) {
        if(!this.isEditable) {
          this.$store.dispatch('play', track)
        }
      },
      forcePlay(track) {
        this.$store.dispatch('play', track)
      },
      async load() {
        if(this.filter.type === 'favorites') {
          this.$store.dispatch('filterFavorites')
        }
        else {
          await this.$store.dispatch('filterTracks', this.filter)
        }
      },
      async update(event, track, type) {
        Object.assign(this.trackToEdit, track)
        this.trackToEdit[type] = event.target.innerText
        this.trackToEdit['user_id'] = track.user.id,
        this.trackToEdit['style'] = track.style.id,
        await this.$store.dispatch('editTrack', this.trackToEdit)
      },
      openEdit(track) {
        Object.assign(this.trackToEdit, track)
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
        if(!this.isEditable) {
          this.$store.dispatch('filterTracks', {type: 'search', value: terms})
        }
      },
      formatTime(time) {
        return window.formatTime(time)
      },
    },
    async mounted() {
      this.$store.commit('RESET_FILTERS')
      await this.load()
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
    &--show-duration.tracks .track__duration {
      display: inline;
    }
    .loader {
      display: flex;
      width: 60px;
      height: 60px;
      position: fixed;
      top: calc(50vh - 60px);
      left: calc(50vw - 60px);
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
      &:active {
        opacity: 0.5;
      }
      &:focus {
        background-color: $color-selection;
      }
      background-color: transparent;
      &--playing {
        .track {
          &__title, &__dot, &__index {
           color: white;
          }
        }
      }
      &--invalid {
        background-color: $invalidate-color;
        filter: grayscale(50%);
      }
      &--pending {
        background-color: $pending-color;
        filter: grayscale(20%);
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
      &__duration {
        display: none;
        background-color: white;
        margin-right: 20px;
        float: right;
        padding: 4px;
        border-radius: 8px;
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
      &__user {
        display: none;
        @include breakpoint(phablet) {
          display: table-cell;
        }
        &__link {
          text-align: center;
          display: flex;
          border-radius: 40px;
          overflow: hidden;
          width: 30px;
          height: 30px;
        }
      }
      &__actions {
        display: none;
        text-align: right;
        @include breakpoint(tablet) {
          display: table-cell;
        }
        .toggle_favorite {
          cursor: pointer;
          color: $favorite-color;
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
