<template>
  <section>
    <div class="user-list">
      <card v-for="bot in bots" :user="bot" :key="bot.id" />
    </div>
  </section>
</template>

<script>
  import card from '@/components/molecules/user/card'
  export default {
    name: 'bots',
    components: {
      card
    },
    data: function() {
      return {
        bots: {},
      }
    },
    created: async function() {
      await this.$store.dispatch('initUsers')
      this.bots = this.$store.getters.robots
    },
  }
</script>
