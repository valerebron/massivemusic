<template>
  <button @click="syncAll">
    <icon-sync />
    <loader :isLoading="isLoading"/>
  </button>
</template>

<script>
import loader from '@/components/atoms/loader.vue'
export default {
  name: 'syncAll',
  components: {
    loader,
  },
  data: function() {
    return {
      isLoading: false,
    }
  },
  methods: {
    syncAll: async function() {
      this.isLoading = true
      await this.$store.dispatch('syncAllUsers')
      this.isLoading = false
    },
  },
}
</script>
