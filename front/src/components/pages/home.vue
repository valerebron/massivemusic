<template>
  <main class="home">
    <tracks :filter="{ type: 'reset', value: Date.now() }"/>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  export default {
    name: 'home',
    components: {
      tracks
    },
  }
</script>
