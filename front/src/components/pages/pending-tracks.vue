<template>
  <main class="pending-tracks">
    <tracks :filter="{ type: 'pending', value: $store.getters.session.user.id }"/>
    <aside class="dock">
      <button class="pending-tracks__unpending-all" @click="unpendingAll">
        <icon-valid/>
        Validate All
      </button>
    </aside>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  export default {
    name: 'pending-tracks',
    components: {
      tracks
    },
    methods: {
      unpendingAll: function() {
        this.$store.dispatch('validateAllPending')
      },
    },
    mounted() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('/login')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .pending-tracks {
    .dock {
      position: fixed;
      width: 100%;
      z-index: $z-index-pages-ui;
      bottom: $player-height;
      display: flex;
      justify-content: center;
      align-items: center;      
    }
    &__unpending-all {
      display: flex;
      background-color: black;
      &:hover {
        background-color: $validate-color;
      }
    }
  }
</style>