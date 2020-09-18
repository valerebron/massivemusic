<template>
  <main class="user-profile page--container">
    <div class="user-profile__container">
      <edit :user="user"/>
    </div>
  </main>
</template>

<script>
  import gql from 'graphql-tag'
  import edit from '@/components/molecules/user/edit'
  export default {
    name: 'user-profile',
    components: {
      edit
    },
    data: function() {
      return {
        user: {},
      }
    },
    methods: {
      fetchUser: function() {
        if(this.$route.params.user_id === 'me') {
          this.user = { ...this.$store.getters.session.user }
        }
        else {
          window.apollo.query({
            variables: {
              user_id: parseInt(this.$route.params.user_id),
            },
            query: gql`
              query($user_id: Int) {
                user(user_id: $user_id) {
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
                  channel_id
                  channel_style
                  channel_avatar_small
                  channel_avatar_medium
                  channel_avatar_high
                  channel_description
                  channel_enable_tracks
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
    created: function() {
      this.fetchUser()
    },
  }
</script>

<style lang="scss">
  .user-profile {
    &__container {
      display: flex;
      justify-content: center;
      width: 100%;
      @include breakpoint(tablet) {
        display: block;
      }
    }
  }
</style>