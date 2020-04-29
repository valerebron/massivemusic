<template>
  <modal :key="track.yt_id" @close="close()">
    <form class="drop-track">
      <p>Validate track : <br><br>{{ track.title }} from {{ track.artist }} ?</p>
      <div class="actions">
        <button class="action" @click.prevent="close()">
          Cancel
        </button>
        <button class="action" @click.prevent="validate(track)">
          Validate
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
  import gql from 'graphql-tag'
  import modal from '../elements/modal'
  export default {
    name: 'track-validate',
    components: { modal },
    props: ['track'],
    methods: {
      validate: function(track) {
        this.$apollo.mutate({
          variables: {
            user_id: this.$store.getters.session.user.id,
            token: this.$store.getters.session.token,
            id: track.id,
          },
          mutation: gql`mutation($user_id: Int!, $token: String!, $id: Int!) {
            validatePost(user_id: $user_id, token: $token, id: $id) {
              id
            }
          }`,
        }).then(() => {
          document.getElementsByClassName(track.yt_id)[0].classList.remove('track--pending')
          this.close()
        }).catch((error) => {
          this.error = error.message.replace('GraphQL error: ', '')
          console.log('%c●', 'color: red', 'drop error: ', this.error)
        })
      },
      close: function() {
        this.$emit('closeValidate')
      },
    },
  }
</script>
