<template>
  <main class="favorites">
    <tracks v-if="!$store.getters.isFavoritesNull" :filter="{ type: 'favorites', value: Date.now() }"/>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  export default {
    name: 'favorites',
    components: {
      tracks
    },
  }
</script>
