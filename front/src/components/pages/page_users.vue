<template>
  <section>
    <div>
      <address v-for="user in users" :key="user.id" class="user-list">
        <router-link :to="'/user/'+user.id+'/profile'">
          <figure class="user-list__figure">
            <img class="user-list__avatar" :src="'/avatars/'+user.id+'-100px.png'" />
            <figcaption class="user-list__captions">
              <h2>{{ user.name }}</h2>
              <h4>subscribed {{ Date.parse(user.createdAt) | moment('from', 'now') }}</h4>
              <h5>last login {{ Date.parse(user.updatedAt) | moment('from', 'now') }}</h5>
            </figcaption>
          </figure>
        </router-link>
      </address>
    </div>
  </section>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    name: 'users',
    data: function() {
      return {
        users: {}
      }
    },
    mounted: function() {
      window.apollo.query({
        query: gql`
          query {
            users {
              id
              name
              role
              createdAt
              updatedAt
            }
          }
        `,
      }).then((res) => {
      this.users = res.data.users.reverse()
      }).catch(() => {
        console.log('%c●', 'color: red', 'user error')
      })
    },
  }
</script>

<style lang="scss" scoped>
  .user-list {
    float: left;
    border-radius: 26px;
    margin: 10px;
    &:hover {
      background-color: $color-selection;
    }
    &__figure {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
    &__captions {
      padding-left: 18px;
    }
    &__avatar {
      width: 100px;
      height: 100px;
    }
  }
</style>