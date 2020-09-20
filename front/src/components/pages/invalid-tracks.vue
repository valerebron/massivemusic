<template>
  <main class="invalid-tracks">
    <tracks :filter="{ type: 'invalid', value: $store.getters.session.user.id }"/>
    <aside class="dock">
      <button class="pending-tracks__unpending-all" @click="validateAll">
        <icon-valid/>
        Validate All
      </button>
    </aside>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  export default {
    name: 'invalid-tracks',
    components: {
      tracks
    },
    methods: {
      validateAll: function() {
        this.$store.dispatch('validateAllInvalid')
      },
    },
    mounted() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('/login')
      }
    },
  }
</script>
