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
    metaInfo: {
      title: 'Home Massivemusic'
    },
    computed: {
      keywords: function() {
        return this.$route.params.keywords
      },
    },
  }
</script>
