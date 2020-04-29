<template>
  <main class="my-tracks">
    <tracks :filter="{ type: 'user', value: $store.getters.session.user.id }"/>
  </main>
</template>

<script>
  import tracks from '../elements/tracks.vue'
  export default {
    name: 'my-tracks',
    components: {
      tracks
    },
    mounted() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('login')
      }
    },
  }
</script>
