<template>
  <section>
    <div>
      <card v-for="user in $store.getters.users" :user="user" :key="user.id" />
    </div>
  </section>
</template>

<script>
  import card from '@/components/molecules/user/card'
  export default {
    name: 'users',
    components: {
      card,
    },
    data: function() {
      return {
        users: {}
      }
    },
    created: async function() {
      await this.$store.dispatch('initUsers')
    },
  }
</script>

<style lang="scss" scoped>
  .user-list {
    float: left;
    border-radius: 26px;
    margin: 10px;
    &__figure {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      text-align: center;
    }
  }
</style>