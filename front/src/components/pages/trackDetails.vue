<template>
  <main class="page--container track">
    <section class="card">
        <picture class="track__picture">
          <button class="track__play" @click="$store.dispatch('play', track)">
            <icon-play-pause/>
            <loader v-if="$store.getters.playerState === 'buffering'" />
          </button>
          <img class="track__img" @click="$store.dispatch('play', track)" :src="'https://i.ytimg.com/vi/'+track.yt_id+'/0.jpg'" :alt="track.title">
        </picture>
        <h1 class="track__title" :class="'style-'+track.style.id" @click="$store.dispatch('play', track)">
          {{ track.title }}
        </h1>
        <h2>
          <router-link :to="'/s/'+track.artist" class="track__artist--txt">
            {{ track.artist }}
          </router-link>
        </h2>
      <router-link :to="'/user/'+track.user.id+'/profile'" class="track__user__link button" :title="track.user.name">
        <avatar :user="track.user" size="small" />
        <span class="text-label">
          {{ track.user.name }}
        </span>
      </router-link>
      <h4>
        track played {{ track.playcount }} time(s)
      </h4>
      <h5>
        added the 
        {{ track.createdAt | moment('d/M/Y HH:m') }}
        ({{ track.createdAt | moment('from', true) }} ago)
      </h5>
      <h5>
        <time class="track__duration" @click="play(track, $event)">
          duration: 
          {{ track.duration | formatTime }}
        </time>
      </h5>
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
    metaInfo: {
      title: 'on track Massivemusic'
    },
    computed: {
      track: function() { return this.$store.getters.getTrackDetails },
    },
    created: function() {
      this.$store.dispatch('getTrackDetails', this.$route.params.id)
    },
  }
</script>

<style lang="scss">
  .track {
    justify-content: center;
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
  }
</style>