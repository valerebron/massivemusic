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
      <td :class="'track__play style-'+track.style.id" @click="forcePlay(track)">
        <icon-play class="play" />
        <icon-pause class="pause" />
        <img class="track__img" :src="'https://i.ytimg.com/vi/'+track.yt_id+'/default.jpg'" :alt="track.title">
      </td>
      <td :class="'track__index style-'+track.style.id" @click="forcePlay(track)">
        {{ index + 1 }}
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
      <td class="track__actions">
        <button class="track__actions__toggle-menu" @click.prevent="toggleActions">
          ...
        </button>
        <aside class="track__actions__menu">
          <p class="track__createdat" :title="track.createdAt">
            {{ Date.parse(track.createdAt) | moment('from', 'now') }}
          </p>
          <button class="toggle_favorite" v-if="isFavoritable" @click.prevent="$store.dispatch('toggleFavorite', track)">
            <icon-star-inline v-if="$store.getters.isFavorite(track)" />
            <icon-star-outline v-else style="opacity: 0.5" />
          </button>
          <template v-if="isEditable || isMyPage">
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
          <router-link tag="button" :to="'/user/'+track.user.id+'/profile'" class="track__user__link" :title="track.user.name">
            <avatar :user="track.user" size="small" />
          </router-link>
        </aside>
      </td>
    </tr>
    <trackEdit v-if="(isEditable || isMyPage) && isEditOpen" :trackToEdit="trackToEdit" @closeEdit="close()" />
    <trackValidate v-if="(isEditable || isMyPage) && isValidateOpen" :track="trackToValidate" @closeValidate="close()" />
    <trackDrop v-if="(isEditable || isMyPage) && isDropOpen" :track="trackToDrop" @closeDrop="close()" />
  </table>
  <section v-else-if="$store.getters.trackIsLoading" class="tracks">
    <loader />
  </section>
  <section v-else class="no-track tracks">
    <p class="no-track__txt">
      No track found :(
    </p>
    <router-link tag="button" :to="'/add-tracks/'+this.$store.getters.search" class="tracks__add-tracks">
      <icon-youtube />
      add track from youtube
    </router-link>
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
        get(){ return this.$route.name === 'admin' || this.$route.name === 'invalid-tracks' || this.$route.name === 'pending-tracks' },
      },
      isFavoritable: {
        get(){ return this.$route.name !== 'invalid-tracks' && this.$route.name !== 'pending-tracks' },
      },
      isMyPage: {
        get(){ return this.$route.params.user_id === 'me' }
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
        this.close()
        Object.assign(this.trackToEdit, track)
        this.isEditOpen = true
        this.$store.dispatch('modal', true)
      },
      openDrop(track) {
        this.close()
        this.trackToDrop = track
        this.isDropOpen = true
        this.$store.dispatch('modal', true)
      },
      openValidate(track) {
        this.close()
        this.trackToValidate = track
        this.isValidateOpen = true
        this.$store.dispatch('modal', true)
      },
      close() {
        this.$store.dispatch('modal', false)
        this.isEditOpen = this.isDropOpen = this.isValidateOpen =  false
      },
      search(terms) {
        if(!this.isEditable) {
          this.$store.dispatch('filterTracks', { type: 'search', value: terms })
        }
      },
      formatTime(time) {
        return window.formatTime(time)
      },
      toggleActions(event) {
        let menu = event.target.parentElement.parentElement
        let isOpen = menu.classList.contains('open')
        document.querySelectorAll('.track').forEach(menu => menu.classList.remove('open'))
        if(!isOpen) {
          menu.classList.add('open')
        }
      },
    },
    async mounted() {
      await this.load()
    },
    watch: {
      async filter() {
        await this.load()
      },
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
    .no-track__txt {
      text-align: center;
    }
    &__add-tracks {
      margin: 12px;
      color: rgb(37, 37, 37);
      background-color: $youtube-red;
      // text-transform: uppercase;
      font-weight: bold;
      transition: all .3s;
      &:hover {
        color: $youtube-red;
        border-radius: 8px;
      }
      .ion {
        padding-right: 16px;
      }
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
      // transition: all 0.2s;
      &:hover {
        filter: brightness(1.3);
      }
      &:active {
        opacity: 0.5;
      }
      &:focus {
        background-color: $color-selection;
      }
      background-color: transparent;
      .play {
        display: flex;
        cursor: pointer;
      }
      .pause {
        display: none;
      }
      &--playing {
        &.track {
          .track__title, .track__index, .track__play .ion, .track__artist, .track__createdat, .track__actions__toggle-menu {
           color: black;
           font-weight: bold;
          }
          .player-playing & {
            .play {
              display: none;
            }
            .pause {
              display: flex;
            }
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
      &__play {
        .play {
          display: flex;
          position: relative;
          z-index: $z-index-tracks-play;
          margin: 4px;
        }
      }
      &__img {
        height: 22px;
        width: 22px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 20px;
        z-index: $z-index-tracks;
        object-fit: none;
      }
      &__index {
        text-align: center;
        cursor: pointer;
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
        cursor: pointer;
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
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0 8px;
        @include breakpoint(desktop) {
          // display: table-cell;
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
        }
      }
      &.open {
        position: relative;
        z-index: $z-index-tracks;
        .track__actions__menu {
          display: block;
          align-items: center;
          box-shadow: black 0 0 30px;
          @include breakpoint(tablet) {
            box-shadow: none;
          }
          border: 1px rgba(255, 255, 255, 0.1) solid;
          border-top: 0;
          button {
            display: inline;
            height: 100%;
          }
        }
      }
      &.track--playing {
        .track__actions__menu {
          box-shadow: black 0 30px 30px;
          @include breakpoint(tablet) {
            box-shadow: none;
          }
        }
      }
      &__actions {
        text-align: right;
        position: relative;
        &__toggle-menu {
          font-weight: bold;
          @include breakpoint(tablet) {
            display: none;
          }
        }
        &__menu {
          display: none;
          position: fixed;
          padding: 0;
          top: 58px;
          right: 0;
          height: auto;
          padding: 10px;
          background-color: black;
          z-index: 200;
          @include breakpoint(tablet) {
            display: inline-flex;
            position: relative;
            background-color: transparent;
            right: 0;
            top: 0;
            box-shadow: 0;
            padding: 0;
          }
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
