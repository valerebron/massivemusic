<template>
  <main class="users">
    <section class="user-list">
      <loader v-if="isLoading" />
      <card v-for="user in usersFiltered" :user="user" :key="user.id" />
    </section>
    <aside class="dock" :class="{ 'dock--mobile-open' : isDockMobileOpen }">
      <label class="search-filter__label">
        <input class="search-filter" ref="searchUser" v-model="filterSearch" type="search" placeholder="search">
        <i class="counter">
          {{ usersFiltered.length }}
        </i>
      </label>
      <checkbox @changeCheckbox="filterBots" :state="filterBotsState" @click="filterBots">
        youtube channels
      </checkbox>
    </aside>
    <button class="dock-toggle enable" @click="isDockMobileOpen = !isDockMobileOpen">
      <icon-settings/>
    </button>
  </main>
</template>

<script>
  import checkbox from '@/components/atoms/checkbox'
  import card from '@/components/molecules/user/card'
  import loader from '@/components/atoms/loader.vue'
  export default {
    name: 'users',
    components: {
      card,
      checkbox,
      loader,
    },
    data: function() {
      return {
        users: [],
        filterBotsState: false,
        filterSearch: '',
        isDockMobileOpen: false,
        isLoading: false,
      }
    },
    computed: {
      usersFiltered: function() {
        return this.users.filter(user => user.name.toLowerCase().includes(this.filterSearch.toLowerCase()))
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
      this.isLoading = true
      await this.$store.dispatch('initUsers')
      this.users = this.$store.getters.users
      this.isLoading = false
      this.$refs.searchUser.focus()
    },
  }
</script>

<style lang="scss">
.users {
  justify-content: center;
  .loader {
    width: 50px;
    height: 50px;
  }
  .search-filter {
    color: black;
    border-radius: 20px;
    &__label {
      margin-right: 20px;
      position: relative;
      .counter {
        top: 18px;
      }
    }
  }
  .dock--mobile-open {
    display: grid;
    @include breakpoint(tablet) {
      display: flex;
    }
  }
  .user-list {
    padding-top: $header-height;
    border-radius: 26px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 60px;
    margin: 10px;
    .card {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      text-align: center;
    }
  }
}
</style>