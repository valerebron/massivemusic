<template>
  <section>
    <div class="user-list">
      <aside class="user-list__filters">
        <input class="user-list__search-filter" v-model="filterSearch" type="search" placeholder="search">
        <div class="user-list__bot-filter">
          <checkbox @changeCheckbox="filterBots" :state="filterBotsState"></checkbox>
          <label @click="filterBots">
            youtube channels 
          </label>
        </div>
      </aside>
      <main class="user-list__list">
        <card v-for="user in users.filter(user => user.name.toLowerCase().includes(this.filterSearch.toLowerCase()))" :user="user" :key="user.id" />
      </main>
    </div>
  </section>
</template>

<script>
  import checkbox from '@/components/atoms/checkbox'
  import card from '@/components/molecules/user/card'
  export default {
    name: 'users',
    components: {
      card,
      checkbox,
    },
    data: function() {
      return {
        users: [],
        filterBotsState: false,
        filterSearch: '',
      }
    },
    methods: {
      filterBots() {
        this.filterBotsState = !this.filterBotsState
        if(this.filterBotsState) {
          this.users = this.users.filter(user => user.role === 'ROBOT')
        }
        else {
          this.users = this.$store.getters.users
        }
      },
    },
    created: async function() {
      await this.$store.dispatch('initUsers')
      this.users = this.$store.getters.users
    },
  }
</script>

<style lang="scss">
  .user-list {
    border-radius: 26px;
    width: 100%;
    &__filters {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: $grey-0;
      padding: 0 20px;
    }
    &__search-filter {
      width: 60%;
    }
    &__bot-filter {
      display: flex;
      align-items: center;
      margin-left: 40px;
      label {
        margin-left: 8px;
      }
    }
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 60px;
      margin: 10px;
    }
    .card {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      text-align: center;
    }
  }
</style>