<template>
  <main class="pending-tracks">
    <tracks :filter="{ type: 'pending', value: 'only' }"/>
  </main>
</template>

<script>
  import tracks from '../elements/tracks.vue'
  export default {
    name: 'pending-tracks',
    components: {
      tracks
    },
    beforeCreated() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('login')
      }
    },
  }
</script>
