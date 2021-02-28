<template>
  <table v-if="tracks.length!==0" class="tracks" :class="{'tracks--loading' : $store.getters.isLoading}" :key="filter.type+filter.value">
    <tr
      v-for="(track, index) in tracks"
      class="track"
      :class="[{
        'track--invalid': track.invalid,
        'track--pending': track.pending,
        'track--playing' : (track.yt_id === $store.getters.playerTrack.yt_id),
        'track--editable': (isEditable || isMyPage),
      }, 'style-bkg-'+track.style.id]"
      :key="track.yt_id"
    >
      <td :class="'track__play style-'+track.style.id" @click="play(track, $event)">
        <icon-play class="play" />
        <icon-pause class="pause" />
        <img class="track__img" :src="'https://i.ytimg.com/vi/'+track.yt_id+'/default.jpg'" :alt="track.title">
      </td>
      <td :class="'track__index style-'+track.style.id" @click="play(track, $event)">
        {{ index + 1 }}
      </td>
      <td :class="'track__title style-'+track.style.id" @click="play(track, $event)" :contenteditable="isEditable" @blur="update($event, track, 'title')">
        {{ track.title }}
        <time class="track__duration" @click="play(track, $event)">
          {{ formatTime(track.duration) }}
        </time>
      </td>
      <td class="track__artist">
        <router-link v-if="!isEditable" :to="stylePath+'/s/'+track.artist" class="track__artist--txt">
          {{ track.artist }}
        </router-link>
        <span v-else class="track__artist--txt" contenteditable="true" @blur="update($event, track, 'artist')">
          {{ track.artist }}
        </span>
      </td>
      <td>
        <icon-star-inline class="track__star" v-if="$store.getters.isFavorite(track)" />
      </td>
      <td class="track__actions">
        <button class="track__actions__toggle-menu" @click.prevent="toggleActions">
          ...
        </button>
        <aside class="track__actions__menu">
          <p class="track__createdat" :title="track.createdAt" @click="play(track, $event)">
            {{ track.createdAt | moment('from', true) }}
          </p>
          <button class="toggle_favorite" v-if="isFavoritable" @click.prevent="$store.dispatch('toggleFavorite', track)">
            <template v-if="$store.getters.isFavorite(track)">
              <icon-star-inline />
              <span class="text-label">
                Remove Favorite
              </span>
            </template>
            <template v-else>
              <icon-star-outline style="opacity: 0.5" />
              <span class="text-label">
                Add Favorite
              </span>
            </template>
          </button>
          <template v-if="isEditable || isMyPage">
            <button class="edit" @click="openEdit(track)">
              <icon-edit/>
              <span class="text-label">
                Edit
              </span>
            </button>
            <button class="validate" @click="openValidate(track)">
              <icon-valid/>
              <span class="text-label">
                Validate
              </span>
            </button>
            <button class="drop" @click="openDrop(track)">
              <icon-trash/>
              <span class="text-label">
                Delete
              </span>
            </button>
          </template>
          <router-link :to="'/user/'+track.user.id+'/profile'" class="track__user__link button" :title="track.user.name">
            <avatar :user="track.user" size="small" />
            <span class="text-label">
              by {{ track.user.name }}
            </span>
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
      No track found
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
        get(){ return this.$route.matched[0].name === 'admin' },
      },
      isFavoritable: {
        get(){ return this.$route.name !== 'invalid' && this.$route.name !== 'pending' },
      },
      isMyPage: {
        get(){ return this.$route.params.user_id === 'me' }
      },
      stylePath: {
        get(){ return (this.$route.name.startsWith('style-')) ? this.$route.matched[0].path : ''  }
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
      play(track, e) {
        let targetClass = e.target.className.split(' ')[0]
        this.closeActions()
        if(!this.isEditable || targetClass === 'track__play' || targetClass === 'track__index') {
          this.$store.dispatch('play', track)
        }
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
        this.closeActions()
      },
      formatTime(time) {
        return window.formatTime(time)
      },
      toggleActions(event) {
        let track = event.target.parentElement.parentElement
        let isOpen = track.classList.contains('open')
        this.closeActions()
        if(!isOpen) {
          track.classList.add('open')
        }
      },
      closeActions() {
        document.querySelectorAll('.track').forEach(track => track.classList.remove('open'))
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
      &--editable {
        .track__title, .track__artist {
          cursor: text;
        }
      }
      &__play {
        > * {
          pointer-events: none;
        }
        cursor: pointer;
        .play, .pause {
          position: relative;
          z-index: $z-index-tracks-play;
          margin: 4px;
          margin-left: 8px;
        }
      }
      &__img {
        height: 22px;
        width: 22px;
        position: absolute;
        top: 50%;
        left: 6px;
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
      &__star {
        color: $favorite-color;
        font-size: 14px;
        @include breakpoint(tablet) {
          display: none;
        }
      }
      &__duration {
        cursor: pointer;
        display: none;
        background-color: white;
        margin-right: 20px;
        float: right;
        padding: 4px;
        border-radius: 8px;
      }
      &__artist {
        @extend %artistStyle;
        &--txt {
          padding: 8px 12px;
          border-radius: 20px;
        }
        &:active, &:focus {
          .track__artist--txt {
            background-color: white;
            color: black;
          }
        }
      }
      &__createdat {
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0 8px;
        cursor: pointer;
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
          .text-label {
            padding-left: 8px;
          }
        }
      }
      &.open {
        position: relative;
        z-index: $z-index-tracks;
        .track__actions__menu {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: black 0 0 30px;
          border-radius: $dialog-border-radius;
          .track__createdat {
            padding-left: 20px;
            width: 100%;
          }
          .track__user__link {
            display: inline-flex;
          }
          button {
            width: 100%;
            text-align: left;
            .text-label {
              padding-left: 10px;
            }
          }
          @include breakpoint(tablet) {
            border-top: 0;
            box-shadow: none;
            border-radius: none;
            .track__createdat {
              display: inline;
            }
          }
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
          top: 50%;
          right: 50px;
          transform: translateY(-50%);
          height: auto;
          padding: 10px;
          background-color: #242424;
          z-index: 200;
          @include breakpoint(tablet) {
            display: inline-flex!important;
            flex-direction: row!important;
            .text-label {
              display: none;
            }
            position: relative;
            background-color: transparent;
            right: 0;
            box-shadow: 0;
            padding: 0;
          }
        }
        .toggle_favorite {
          cursor: pointer;
          color: $favorite-color;
        }
      }
      &:first-child, &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6) {
        .track__actions__menu {
          @include breakpoint(phone) {
            top: 0!important;
            transform: translateY(0%)!important;
          }
        }
      }
      &:last-child, &:nth-last-child(2), &:nth-last-child(3) {
        .track__actions__menu {
          @include breakpoint(phone) {
            top: 100%;
            transform: translateY(-100%);
          }
        }
      }
      @include breakpoint(tablet) {
        .track__actions__menu {
          top: 0;
          transform: translateY(0);
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
