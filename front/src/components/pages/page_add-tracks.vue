<template>
  <main class="add-tracks page--container">
    <youtube-explorer @clickOnTrack="open" />
    <modal class="add-tracks__dialog">
      <iframe class="add-tracks__iframe" type="text/html" :src="'http://www.youtube.com/embed/'+this.track.id" frameborder="0"></iframe>
      <form class="add-tracks__form">
        <p class="add-tracks__original-title">{{ track.description}}</p>
        <select class="add-tracks__item add-tracks__style" v-model="style">
          <option v-for="style in $store.getters.styles" :key="style.id" :value="parseInt(style.id)">
            {{ style.name }}
          </option>
        </select>
        <input type="text" class="add-tracks__item" :value="artist" placeholder="artist">
        <input type="text" :class="'add-tracks__item style-'+track.style" :value="title" placeholder="title">
        <div class="actions">
          <button class="add-tracks__add" @click.prevent="close">
            Cancel
          </button>
          <button class="add-tracks__add" @click.prevent="add">
            Add
          </button>
        </div>
      </form>
    </modal>
  </main>
</template>

<script>
  import youtubeExplorer from '../elements/youtubeExplorer'
  import modal from '../elements/modal'
  import gql from 'graphql-tag'
  export default {
    name: 'addTracks',
    components: {
      youtubeExplorer,
      modal,
    },
    data: function() {
      return {
        track: {},
        title: '',
        artist: '',
        style: 0,
      }
    },
    methods: {
      open: function(track) {
        this.track = track
        this.artist = track.artist
        this.title = track.title
        this.$store.dispatch('modal', true)
      },
      close: function() {
        this.track = {}
        this.$store.dispatch('modal', false)
      },
      add: function() {
        if(this.$store.getters.isOnline) {
          this.$apollo.mutate({
            variables: {
              userId: this.$store.getters.session.user.id,
              id: this.track.id,
              title: this.title,
              artist: this.artist,
              duration: this.track.duration,
              style: this.style,
              token: this.$store.getters.session.token,
            },
            mutation: gql`mutation($userId: String!, $id: String!, $title: String!, $artist: String!, $duration: Int!, $style: Int!, $token: String!) {
              post(userId: $userId, id: $id, title: $title, artist: $artist, duration: $duration, style: $style, token: $token) {
                id
                title
                artist
                duration
                style {
                  id
                }
                user {
                  id
                }
              }
            }`,
          }).then((res) => {
            this.$store.dispatch('addTrackToSession', res.data.post)
            this.close()
          }).catch((error) => {
            console.log('%c●', 'color: red', 'add-track error: ', error)
          })
        }
        else {
          this.$router.push('login')
        }
      },
    },
    mounted: function() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('login')
      }
    }
  }
</script>

<style lang="scss">
  .add-tracks {
    &__dialog {
      flex-direction: column;
    }
    &__form {
      background-color: #202020;
      display: flex;
      flex-direction: column;
      align-items: center;
      @include breakpoint('tablet') {
        border-radius: 0;
        border-bottom-left-radius: $dialog-border-radius;
        border-bottom-right-radius: $dialog-border-radius;
      }
    }
    &__item {
      width: 90%!important;
    }
    .actions {
      width: 100%;
      padding-top: 20px;
    }
    &__add, &__cancel {
      width: 50%;
    }
    &__iframe {
      text-align: center;
      height: 100px;
      min-height: 0;
      @include breakpoint('tablet') {
        border-radius: 0;
        border-top-left-radius: $dialog-border-radius;
        border-top-right-radius: $dialog-border-radius;
      }
    }
    &__original-title {
      color: white;
      padding-bottom: 12px;
      text-align: center;
    }
  }
</style>
