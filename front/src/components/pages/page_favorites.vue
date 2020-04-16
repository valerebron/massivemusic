<template>
  <main class="favorites">
    <tracks :filter="{ type: 'favorites', value: Date.now() }"/>
  </main>
</template>

<script>
  import tracks from '../elements/tracks.vue'
  export default {
    name: 'favorites',
    components: {
      tracks
    },
  }
</script>
