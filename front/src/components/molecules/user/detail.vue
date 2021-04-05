<template>
  <figure v-if="user.createdAt" class="user card" :class="{ loading : isSyncing }">
    <div class="user__image-container">
      <avatar :user="user" size="big" />
    </div>
    <figcaption class="user__captions">
      <h1 class="user__name">
        {{ user.name }}
        <span :class="'style-'+user.channel_style">
          .
        </span>
      </h1>
      <button @click="sync" v-if="user.role === 'ROBOT' && $store.getters.isAdmin" :class="'style-bkg-'+user.channel_style">
        <span class="user__sync-button">
          <icon-sync />
          <loader v-if="isSyncing"/>
        </span>
        <span class="typo-one-line sync-text">
          sync channel
        </span>
      </button>
      <h2>
        <router-link class="nb-tracks" :class="'style-bkg-'+user.channel_style+' button'" :to="'/user/'+$route.params.user_name+'/'+$route.params.user_id+'/tracks'">
          <icon-play class="play" />
          <b class="count"> {{ this.user.tracks.length }}</b> track(s)
        </router-link>
      </h2>
      <a v-if="user.role === 'ROBOT'" class="user__link" target="_blank" :href="'https://youtube.com/channel/'+user.channel_id+''" :title="user.name">
        see channel on youtube
        <icon-exit />
      </a>
      <h3 :title="user.createdAt">subscribed: {{ Date.parse(user.createdAt) | moment('from', 'now') }}</h3>
      <h4 :title="user.updatedAt">last activity: {{ Date.parse(user.updatedAt) | moment('from', 'now') }}</h4>
      <h5 v-if="user.role ==! 'ROBOT'">
        {{ user.email }}
      </h5>
      <p v-if="user.channel_description !== ''">
        {{ user.channel_description }}
      </p>
      <router-link v-if="$route.params.user_id === 'me' || $store.getters.isAdmin" :to="'/user/'+$route.params.user_name+'/'+$route.params.user_id+'/edit'" tag="button" class="cta">
        <icon-edit/>
        Edit profile
      </router-link>
    </figcaption>
  </figure>
  <loader class="user" v-else/>
</template>

<script>
  import avatar from '@/components/atoms/avatar'
  import loader from '@/components/atoms/loader.vue'
  export default {
    name: 'detail',
    components: {
      avatar,
      loader,
    },
    data: function() {
      return {
        isLoading: false,
        isSyncing: false,
        nb_tracks: '',
      }
    },
    props: ['user'],
    methods: {
      sync: async function() {
        this.isSyncing = true
        console.log('wait for new tracks')
        let newTracks = await this.$store.dispatch('syncTracks', this.$props.user)
        if(newTracks) {
          this.$props.user.tracks.push(...newTracks)
        }
        this.isSyncing = false
      },
    },
    created: function() {
      this.isLoading = true
    },
    mounted: function() {
      this.isLoading = false
    },
    metaInfo() {
      return {
        title: `${this.user.name} profile page | massivemusic.fr`,
        meta: [
          { name: 'og:title', content: `${this.user.name} profile page | massivemusic.fr` },
          { name: 'og:image', content: `${window.location.host}/avatars/${this.user.id}-300px.png` },
        ],
      }
    },
  }
</script>

<style lang="scss">
  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include breakpoint(desktop) {
      flex-direction: row;
    }
    &.loader {
      width: 50px;
      height: 50px;
    }
    .nb-tracks {
      font-size: 22px;
      text-decoration: none;
      .play {
        padding-right: 10px;
      }
      .count {
        margin-right: 10px;
      }
    }
    &__name {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    &__image-container {
      display: flex;
      flex-direction: column;
      button {
        font-weight: bold;
        margin-top: 24px;
        text-transform: uppercase;
      }
    }
    &__captions {
      padding: 10px;
      text-align: center;
      @include breakpoint(desktop) {
        padding-left: 40px;
      }
      p {
        text-align: left;
        font-size: 18px;
        line-height: 200%;
      }
    }
    &__go-back {
      display: block;
    }
    .sync-text {
      margin-left: 12px;
      font-size: 18px;
      font-weight: bold;
    }
    &__sync-button {
      .ion {
        .loading & {
          display: none;
        }
      }
    }
    &__link {
      display: block;
      padding: 20px;
      text-decoration: underline;
    }
    .loader {
      margin-left: 0!important;
      margin-right: 8px;
    }
  }
</style>