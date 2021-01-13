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
    },
  }
</script>
