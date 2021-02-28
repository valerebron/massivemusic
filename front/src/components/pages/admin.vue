<template>
  <main class="admin">
    <tracks :class="[$route.name === 'duration' ? 'tracks--show-duration' : '']" :filter="$route.name" />
    <aside class="dock">
      <router-link class="enable" tag="button" to="/test" title="test all tracks">
        <icon-radio />
      </router-link>
      <button class="pending-tracks__unpending-all validate" @click="validateAll" :class="{'enable' : isProcessable }">
        <icon-valid/>
      </button>
      <button class="pending-tracks__unpending-all drop" @click="deleteAll" :class="{'enable' : isProcessable }">
        <icon-trash/>
      </button>
    </aside>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  export default {
    name: 'admin',
    components: {
      tracks,
    },
    data: function() {
      return {
        isProcessable: false,
      }
    },
    methods: {
      validateAll() {
        if(this.isProcessable) {
          this.$store.dispatch('validateAll', this.$route.name)
        }
      },
      deleteAll() {
        if(this.isProcessable) {
          this.$store.dispatch('deleteAll', this.$route.name)
        }
      },
      load() {
        if(!this.$store.getters.isAdmin) {
          this.$router.push('/')
        }
        else {
          this.$store.dispatch('filterTracks', {type: this.$route.name, value: true })
        }
        if(this.$route.name !== 'all') {
          this.isProcessable = true
        }
      },
    },
    mounted() {
      this.load()
    },
    updated() {
      this.load()
    },
  }
</script>

<style lang="scss" scoped>
.admin {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .tracks {
    margin-top: $header-height+55!important;
  }
  .dock {
    display: flex;
    width: 100%;
    align-items: flex-start;
    margin: 0;
    button {
      flex-grow: 1;
    }
    @include breakpoint('tablet') {
      display: block;
      width: auto;
    }
  }
}
</style>