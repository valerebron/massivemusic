<template>
  <main class="style">
    <tracks v-if="keywords" :filter="[{ type: 'style', value: this.styleId }, { type: 'search', value: keywords }]"/>
    <tracks v-else          :filter="{ type: 'style', value: this.styleId }"/>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  export default {
    name: 'page-style',
    components: {
      tracks
    },
    props: ['styleId'],
    computed: {
      keywords: function() {
        return this.$route.params.keywords
      },
      style: function() {
        return this.$store.getters.styles.filter(style => style.id === this.styleId)[0]
      },
    },
    metaInfo() {
      return {
        title: `${this.style.name} tracks | massivemusic.fr`,
        description: `here you can find all ${this.style.name} tracks of massivemusic.fr`,
        meta: [
          { name: 'desciption', content: `here you can find all ${this.style.name} tracks of massivemusic.fr` },
          { name: 'twitter:card', content: `here you can find all ${this.style.name} tracks of massivemusic.fr` },
          { name: 'og:title', content: `here you can find all ${this.style.name} tracks of massivemusic.fr` },
          { name: 'og:description', content: `here you can find all ${this.style.name} tracks of massivemusic.fr` },
        ],
      }
    },
  }
</script>
