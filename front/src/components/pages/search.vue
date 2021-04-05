<template>
  <main class="search">
    <tracks :filter="{ type: 'search', value: keywords }"/>
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
    metaInfo() {
      return {
        title: `${this.keywords} | massivemusic.fr`,
        description: `all about ${this.keywords} | massivemusic.fr`,
        meta: [
          { name: 'og:title', content: `${this.keywords} | massivemusic.fr` },
          { name: 'og:description', content: `all about ${this.keywords} | massivemusic.fr` },
          { name: 'og:type', content: 'music:artist' },
          { name: 'keywords', content: this.keywords },
        ],
      }
    },
  }
</script>
