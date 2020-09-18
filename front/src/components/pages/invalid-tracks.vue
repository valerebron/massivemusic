<template>
  <main class="invalid-tracks">
    <tracks :filter="{ type: 'invalid', value: $store.getters.session.user.id }"/>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  export default {
    name: 'invalid-tracks',
    components: {
      tracks
    },
    mounted() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('/login')
      }
    },
  }
</script>
