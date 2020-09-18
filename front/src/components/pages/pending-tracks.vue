<template>
  <main class="pending-tracks">
    <tracks :filter="{ type: 'pending', value: $store.getters.session.user.id }"/>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  export default {
    name: 'pending-tracks',
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
