<template>
  <modal :key="oldTrack.yt_id" @close="close()">
    <iframe class="edit-tracks__iframe" type="text/html" :src="'http://www.youtube-nocookie.com/embed/'+newTrack.id" frameborder="0"></iframe>
    <form class="edit-track">
      <div v-if="error !== ''" class="error-dialog">
        {{ error }}
      </div>
      <input v-model="newTrack.yt_id" pattern="[a-zA-Z0-9_\-]{11}" type="text" class="item" placeholder="id">
      <select v-model="newTrack.style.id" class="item">
        <option v-for="style in styles" :key="style.id" :value="style.id">
          {{ style.name }}
        </option>
      </select>
      <input v-model="newTrack.artist" type="text" class="item" placeholder="artist" required @keydown.enter.prevent="edit()">
      <input v-model="newTrack.title" type="text" :class="'item style-'+newTrack.style" placeholder="title" required @keydown.enter.prevent="edit()">
      <div class="actions">
        <button @click.prevent="close()">
          Cancel
        </button>
        <button class="edit" @click.prevent="edit()">
          Edit
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
  import gql from 'graphql-tag'
  import modal from '@/components/atoms/modal'
  export default {
    name: 'track-edit',
    components: { modal },
    props: ['oldTrack'],
    data: function() {
      return {
        error: '',
        styles: this.$store.getters.styles,
        newTrack: {
          id: 0,
          yt_id: '',
          title: '',
          artist: '',
          style: {
            id: 0,
          },
        },
      }
    },
    methods: {
      load: function() {
        if(this.oldTrack.style) {
          this.newTrack = this.oldTrack // as javascript copy by reference, this is useless REFACTO
        }
      },
      edit: function() {
        this.$apollo.mutate({
          variables: {
            user_id: this.$store.getters.session.user.id,
            token: this.$store.getters.session.token,
            id: this.newTrack.id,
            yt_id: this.newTrack.yt_id,
            title: this.newTrack.title,
            artist: this.newTrack.artist,
            style:  this.newTrack.style.id,
          },
          mutation: gql`mutation($user_id: Int!, $token: String!, $id: Int!, $yt_id: String, $title: String, $artist: String, $style: Int) {
            editPost(user_id: $user_id, token: $token, id: $id, yt_id: $yt_id, title: $title, artist: $artist, style: $style) {
              id
            }
          }`,
        }).then((res) => {
          let track = res.data.editPost
          this.$store.commit('EDIT_TRACK', track)
          this.close()
        }).catch((error) => {
          this.error = error.message.replace('GraphQL error: ', '')
          console.log('%c●', 'color: red', 'edit error: ', this.error)
        })
      },
      close: function() {
        this.$emit('closeEdit')
      },
    },
    mounted: function() {
      this.load()
    },
    updated: function() {
      this.load()
    },
  }
</script>
