<template>
  <main class="style">
    <tracks :filter="{ type: 'style', value: this.styleId }"/>
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
  }
</script>
