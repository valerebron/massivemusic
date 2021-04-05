<template>
  <main class="page--container track-details track-details--init" ref="trackDetailsPage" v-if="track">
    <section class="card">
      <picture class="track-details__picture">
        <button class="track-details__play" @click="playTrackDetails" aria-label="play the track">
          <icon-play-pause :class="'style-'+track.style.id"/>
          <loader v-if="$store.getters.playerState === 'buffering'" />
        </button>
        <img class="track-details__img" @click="playTrackDetails" :src="'https://i.ytimg.com/vi/'+track.yt_id+'/0.jpg'" :alt="track.title">
      </picture>
      <h1 class="track-details__title" :class="'style-'+track.style.id" @click="playTrackDetails">
        {{ track.title }}
      </h1>
      <h2>
        <router-link :to="'/s/'+track.artist" class="track-details__artist--txt">
          {{ track.artist }}
        </router-link>
      </h2>
      <router-link :to="'/user/'+track.user.name+'/'+track.user.id+'/profile'" class="track-details__user__link button" :title="track.user.name">
        <avatar :user="track.user" size="small" />
        <span class="text-label">
          {{ track.user.name }}
        </span>
      </router-link>
      <p>
        {{ track.createdAt | moment('d/M/Y HH:m') }}
        ({{ track.createdAt | moment('from', true) }} ago)
      </p>
      <p>
        playcount: {{ track.playcount }}
      </p>
      <p>
        <time class="track-details__duration">
          duration: 
          {{ track.duration | formatTime }}
        </time>
      </p>
    </section>
  </main>
</template>

<script>
  import avatar from '@/components/atoms/avatar'
  import iconPlayPause from '@/assets/icon-play-pause.vue'
  import loader from '@/components/atoms/loader.vue'
  export default {
    name: 'trackDetails',
    components: { avatar, iconPlayPause, loader },
    computed: {
      track: function() { return this.$store.getters.getTrackDetails },
    },
    methods: {
      initTrackDetails: function() {
        this.$refs.trackDetailsPage.classList.remove('track-details--init')
      },
      playTrackDetails: function() {
        this.initTrackDetails()
        this.$store.dispatch('play', this.track)
      },
    },
    created: function() {
      const routeId = this.$route.params.id
      const currentId = this.$store.getters.playerTrack.id
      this.$store.dispatch('getTrackDetails', routeId)
      if(routeId == currentId) {
        this.initTrackDetails()
      }
    },
    metaInfo() {
      return {
        title: `${this.track.title} - ${this.track.artist} | massivemusic.fr`,
        description: this.track.title + ' by ' + this.track.artist,
        meta: [
          { name: 'desciption', content: this.track.title + ' by ' + this.track.artist },
          { name: 'keywords', content: this.track.title + ' ' + this.track.artist },
          { name: 'twitter:card', content: this.track.title + ' by ' + this.track.artist },
          { name: 'og:title', content: this.track.title + ' by ' + this.track.artist },
          { name: 'og:type', content: 'music:song' },
          { name: 'og:image', content: `https://i.ytimg.com/vi/${this.track.yt_id}/0.jpg` },
          { name: 'og:description', content: this.track.title + ' by ' + this.track.artist },
        ],
      }
    },
  }
</script>

<style lang="scss">
  .track-details {
    justify-content: center;
    &--init {
      .track-details__play .play-button {
        &__left {
          clip-path: polygon(0 0, 50% 25%, 50% 75%, 0% 100%);
        }
        &__right {
          clip-path: polygon(50% 25%, 100% 50%, 100% 50%, 50% 75%);
        } 
      }
    }
    .play-button {
      &.style-1 {
        .play-button__right, .play-button__left {
          background-color: $color-1;
        }
      }
      &.style-2 {
        .play-button__right, .play-button__left {
          background-color: $color-2;
        }
      }
      &.style-3 {
        .play-button__right, .play-button__left {
          background-color: $color-3;
        }
      }
    }
    &__title, &__img {
      cursor: pointer;
    }
    &__user__link {
      text-align: right;
      font-size: 18px;
      img {
        padding-right: 10px;
      }
    }
    &__img {
      width: 90%;
      @include breakpoint(tablet) {
        width: 600px;
      }
    }
    &__picture {
      position: relative;
      display: flex;
      place-content: center;
      align-content: center;
      justify-content: center;
    }
    &__play {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .loader {
      position: absolute;
    }
    p {
      font-size: 16px;
      font-weight: bold;
      display: block;
    }
  }
</style>