<template>
  <main class="user-profile page--container">
    <div>
      <figure class="user-list">
        <img :src="'/avatars/'+user.id+'-300px.png'" />
        <figcaption class="user-list__captions">
          <h1>{{ user.name }}</h1>
          <h2 v-if="user.role !== 'ROBOT'">{{ user.email }}</h2>
          <h3>
            <router-link :to="'/user/'+$route.params.user_id+'/tracks'">
              <b>{{ user.tracks.length }}</b> track(s) added
            </router-link>
          </h3>
          <h4>subscribed {{ Date.parse(user.createdAt) | moment('from', 'now') }}</h4>
          <h5>last login {{ Date.parse(user.updatedAt) | moment('from', 'now') }}</h5>
          <template v-if="user.role === 'ROBOT' && $store.getters.isAdmin">
            {{ unserialize(user.email) }}
          </template>
        </figcaption>
      </figure>
    </div>
  </main>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    name: 'user-profile',
    data: function() {
      return {
        user: {
          tracks: [],
          id: this.$route.params.user_id,
        },
      }
    },
    methods: {
      fetchUser: function() {
        console.log(unserialize)
        if(this.$route.params.user_id === 'me') {
          this.user = this.$store.getters.session.user
        }
        else {
          window.apollo.query({
            variables: {
              user_id: parseInt(this.$route.params.user_id),
            },
            query: gql`
              query(
                  $user_id: Int,
              ) {
                user(
                  user_id: $user_id,
                ) {
                  id
                  email
                  name
                  role
                  createdAt
                  updatedAt
                  tracks {
                    yt_id
                    title
                    artist
                    style {
                      id
                    }
                  }
                }
              }
            `,
          }).then((res) => {
          this.user = res.data.user
          }).catch(() => {
            console.log('%c●', 'color: red', 'user error')
          })
        }
      },
    },
    mounted: function() {
      this.fetchUser()
    },
    updated: function() {
      this.fetchUser()
    },
  }
</script>

<style lang="scss" scoped>
  .user-list {
    display: flex;
    flex-direction: row;
    padding-top: 10vh;
    &__captions {
      padding-left: 12px;
    }
  }
</style>