<template>
  <main class="add-tracks page--container">
    <youtube-explorer @clickOnTrack="open" />
    <modal @close="close()">
      <iframe class="add-tracks__iframe" type="text/html" :src="'http://www.youtube.com/embed/'+this.track.yt_id" frameborder="0"></iframe>
      <form class="add-tracks__form">
        <p class="add-tracks__original-title">{{ track.description}}</p>
        <select v-model="style" class="item">
          <option v-for="style in $store.getters.styles" :key="style.id" :value="style.id">
            {{ style.name }}
          </option>
        </select>
        <input :value="artist"  type="text" class="item" placeholder="artist" @keydown.enter.prevent="add()">
        <input :value="title" type="text" class="item" placeholder="title" @keydown.enter.prevent="add()">
        <div class="actions">
          <button @click.prevent="close">
            Cancel
          </button>
          <button @click.prevent="add">
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
        this.title = track._title
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
              user_id: this.$store.getters.session.user.id,
              yt_id: this.track.yt_id,
              title: this.title,
              artist: this.artist,
              duration: this.track.duration,
              style: parseInt(this.style),
              token: this.$store.getters.session.token,
            },
            mutation: gql`mutation($user_id: Int!, $yt_id: String!, $title: String!, $artist: String!, $duration: Int!, $style: Int!, $token: String!) {
              post(user_id: $user_id, yt_id: $yt_id, title: $title, artist: $artist, duration: $duration, style: $style, token: $token) {
                yt_id
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
    &__form {
      background-color: #202020;
      @include breakpoint('tablet') {
        border-radius: 0;
        border-bottom-left-radius: $dialog-border-radius;
        border-bottom-right-radius: $dialog-border-radius;
      }
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
