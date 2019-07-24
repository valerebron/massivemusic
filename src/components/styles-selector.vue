<template>
  <section class="styles-selector">
    <button v-for="style in styles" :key="style.id" @mousedown="filterStyle(style.id)">
      {{ style.id }}
      {{ style.value }}
    </button>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'tracklist',
    data() {
      return {
        styles: '',
      }
    },
    methods: {
      getStyles() {
        axios
          .get(window.APIURL+'/styles')
          .then((res) => {
            this.styles = res.data
          })
      },
      filterStyle(id) {
        this.$emit('changeStyleFilter', id)
      },
    },
    mounted: function(){
      this.getStyles()
    },
  }
</script>

<style lang="scss">
  .styles-selector {
    display: flex;
    justify-content: center;
  }
</style>
