<template>
  <modal :key="track.id" @close="close()">
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
            userId: this.$store.getters.session.user.id,
            token: this.$store.getters.session.token,
            trackId: track.id,
          },
          mutation: gql`mutation($userId: String!, $token: String!, $trackId: String!) {
            dropPost(userId: $userId, token: $token, trackId: $trackId) {
              id
            }
          }`,
        }).then(() => {
          this.$store.commit('DROP_TRACK', track)
          document.getElementsByClassName(track.id)[0].classList.add('track--dropped')
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
