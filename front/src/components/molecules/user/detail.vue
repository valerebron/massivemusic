<template>
  <figure class="user" :class="{ loading : isLoading }">
    <div class="user__image-container">
      <avatar :user="user" size="big" />
      <button @click="sync" v-if="user.role === 'ROBOT'" :class="'style-bkg-'+user.channel_style">
        <span class="user__sync-button">
          <icon-sync />
          <loader :isLoading="isLoading"/>
        </span>
        <span class="typo-one-line">
          sync channel
        </span>
      </button>
    </div>
    <figcaption class="user__captions">
      <h1 class="user__name">
        {{ user.name }}
        <span :class="'style-'+user.channel_style">
          .
        </span>
      </h1>
      <a v-if="user.role === 'ROBOT'" target="_blank" :href="'https://youtube.com/channel/'+user.channel_id+''" :title="user.name">
        see channel on youtube
      </a>
      <h3>
        <router-link :to="'/user/'+$route.params.user_id+'/tracks'">
          <b>{{ this.user.tracks.length }}</b> track
        </router-link>
      </h3>
      <h4>subscribed: {{ Date.parse(user.createdAt) | moment('from', 'now') }}</h4>
      <h5>last activity: {{ Date.parse(user.updatedAt) | moment('from', 'now') }}</h5>
      <h4 v-if="user.role ==! 'ROBOT'">
        {{ user.email }}
      </h4>
      <p v-if="user.channel_description !== ''">
        {{ user.channel_description }}
      </p>
      <router-link v-if="$route.params.user_id === 'me' || $store.getters.isAdmin" :to="'/user/'+$route.params.user_id+'/edit'" tag="button">
        <icon-edit/>
        Edit profile
      </router-link>
    </figcaption>
  </figure>
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
        nb_tracks: '',
      }
    },
    props: ['user'],
    methods: {
      sync: async function() {
        this.isLoading = true
        let newTracks = await this.$store.dispatch('syncTracks', this.$props.user)
        if(newTracks) {
          this.$props.user.tracks.push(...newTracks)
        }
        this.isLoading = false
      },
    },
  }
</script>

<style lang="scss">
  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include breakpoint(tablet) {
      flex-direction: row;
    }
    padding-top: 10vh;
    &__name {
      display: flex;
      flex-direction: row;
      align-items: center;
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
      @include breakpoint(tablet) {
        padding-left: 40px;
      }
    }
    &__sync-button {
      .ion {
        .loading & {
          display: none;
        }
      }
    }
    .loader {
      margin-left: 0!important;
      margin-right: 8px;
    }
  }
</style>