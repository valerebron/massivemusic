<template>
  <main class="home">
    <tracks v-if="keywords" :filter="{ type: 'search', value: keywords }"/>
    <tracks v-else          :filter="{ type: 'reset', value: Date.now() }"/>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  export default {
    name: 'home',
    components: {
      tracks
    },
    computed: {
      keywords: function() {
        return this.$route.params.keywords
      },
    },
  }
</script>
