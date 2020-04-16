<template>
  <main class="home">
    <tracks :filter="{ type: 'home', value: Date.now() }"/>
  </main>
</template>

<script>
  import tracks from '../elements/tracks.vue'
  export default {
    name: 'home',
    components: {
      tracks
    },
  }
</script>
