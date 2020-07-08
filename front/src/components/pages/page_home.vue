<template>
  <main class="home">
    <tracks :filter="{ type: '', value: '' }"/>
  </main>
</template>

<script>
  import tracks from '../elements/tracks.vue'
  export default {
    name: 'home',
    components: {
      tracks
    },
    mounted() {
      this.$store.dispatch('filterTracks', {type: 'reset', value: Date.now()})
    },
  }
</script>
