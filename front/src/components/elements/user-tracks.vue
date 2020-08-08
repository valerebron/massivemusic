<template>
  <main class="user-tracks">
    <tracks :filter="{ type: 'user', value: user_id }"/>
  </main>
</template>

<script>
  import tracks from '../elements/tracks.vue'
  export default {
    name: 'user-tracks',
    components: {
      tracks
    },
    computed: {
      user_id: {
        get() {
          if(this.$route.params.user_id === 'me') {
            return this.$store.getters.session.user.id
          }
          else {
            return this.$route.params.user_id
          }
        }
      }
    }
  }
</script>
