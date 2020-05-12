<template>
  <modal :key="track.yt_id" @close="close()">
    <form class="drop-track">
      <p>Delete track : <br><br>{{ track.title }} from {{ track.artist }} ?</p>
      <div class="actions">
        <button class="action" @click.prevent="close()">
          Cancel
        </button>
        <button class="action" @click.prevent="drop(track)">
          Delete
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
  import gql from 'graphql-tag'
  import modal from '../elements/modal'
  export default {
    name: 'track-drop',
    components: { modal },
    props: ['track'],
    methods: {
      drop: function(track) {
        this.$apollo.mutate({
          variables: {
            user_id: this.$store.getters.session.user.id,
            token: this.$store.getters.session.token,
            id: track.id,
          },
          mutation: gql`mutation($user_id: Int!, $token: String!, $id: Int!) {
            dropPost(user_id: $user_id, token: $token, id: $id) {
              id
            }
          }`,
        }).then(() => {
          this.$store.commit('DROP_TRACK', track)
          document.getElementsByClassName(track.yt_id)[0].remove()
          this.close()
        }).catch((error) => {
          this.error = error.message.replace('GraphQL error: ', '')
          console.log('%c●', 'color: red', 'drop error: ', this.error)
        })
      },
      close: function() {
        this.$emit('closeDrop')
      },
    },
  }
</script>
