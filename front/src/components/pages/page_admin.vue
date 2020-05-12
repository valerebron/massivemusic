<template>
  <main class="admin">
    <tracks :filter="{ type: 'home', value: Date.now() }"/>
  </main>
</template>

<script>
  import tracks from '../elements/tracks.vue'
  export default {
    name: 'admin',
    components: {
      tracks
    },
    mounted() {
      if(!this.$store.getters.isAdmin) {
        this.$router.push('home')
      }
    },
  }
</script>
