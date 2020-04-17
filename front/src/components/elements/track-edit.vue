<template>
  <modal :key="oldTrack.id" @close="close()">
    <form class="edit-track">
      <input v-model="newTrack.newId" pattern="[a-zA-Z0-9]{11}" type="text" class="item" placeholder="id">
      <select v-model="newTrack.style.id" class="item">
        <option v-for="style in styles" :key="style.id" :value="parseInt(style.id)">
          {{ style.name }}
        </option>
      </select>
      <input v-model="newTrack.artist" type="text" class="item" placeholder="artist">
      <input v-model="newTrack.title" type="text" :class="'item style-'+newTrack.style" placeholder="title">
      <div class="actions">
        <button class="action" @click.prevent="close">
          Cancel
        </button>
        <button class="action" @click.prevent="edit()">
          Edit
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
  import gql from 'graphql-tag'
  import modal from '../elements/modal'
  export default {
    name: 'track-edit',
    components: { modal },
    props: ['oldTrack'],
    data: function() {
      return {
        styles: this.$store.getters.styles,
        newTrack: {
          newId: '',
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
          this.newTrack = this.oldTrack
          this.newTrack.newId = this.oldTrack.id
        }
      },
      edit: function() {
        this.$apollo.mutate({
          variables: {
            userId: this.$store.getters.session.user.id,
            token: this.$store.getters.session.token,
            trackId: this.newTrack.id,
            id: this.newTrack.newId,
            title: this.newTrack.title,
            artist: this.newTrack.artist,
            style: this.newTrack.style.id,
          },
          mutation: gql`mutation($userId: String!, $token: String!, $trackId: String!, $id: String, $title: String, $artist: String, $style: Int) {
            editPost(userId: $userId, token: $token, trackId: $trackId, id: $id, title: $title, artist: $artist, style: $style) {
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
