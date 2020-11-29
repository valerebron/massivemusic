<template>
  <nav class="nav">
    <router-link to="/" class="nav__link">
      <icon-home />all styles
    </router-link>
    <router-link
      class="nav__link nav__link--style"
      :class="'style-hover-bkg-'+style.id"
      v-for="style in $store.getters.styles"
      :to="'/'+style.slug"
      :key="style.id">
      {{ style.name }}
    </router-link>
    <router-link to="/users" class="nav__link">
      <icon-users />
      users
    </router-link>
    <template v-if="$store.getters.isOnline">
      <router-link to="/user/me/profile" class="nav__link nav__link--user">
        <avatar :user="$store.getters.session.user" size="small" />
        my Profile
      </router-link>
      <router-link v-if="$store.getters.isAdmin" to="/admin" class="nav__link">
        <icon-admin />
        admin
      </router-link>
      <router-link v-if="$store.getters.isAdmin" to="/add-bots" class="nav__link">
        <icon-add-bot />
        add channel
      </router-link>
      <router-link to="/add-tracks" class="nav__link nav__link--add-tracks">
        <icon-add />
        add tracks
      </router-link>
      <router-link v-if="$store.getters.isAdmin" to="/mail" class="nav__link">
        <icon-mail />
        mail
      </router-link>
    </template>
    <router-link to="/favorites" class="nav__link nav__link--favorite">
      <icon-star />
      favorites
    </router-link>
    <div v-if="$store.getters.isOnline" @click="logout" class="nav__link">
      <icon-logout/>
      logout
    </div>
    <router-link v-else to="/login" class="nav__link">
      <icon-login />login
    </router-link>
  </nav>
</template>

<script>
import gql from 'graphql-tag'
import avatar from '@/components/atoms/avatar'
export default {
  name: 'navigation',
  components: {
    avatar,
  },
  methods: {
    loadStyles() {
      this.$apollo
        .query({
          query: gql`
            query {
              styles {
                id
                name
                slug
              }
            }
          `
        })
        .then(res => {
          this.$store.dispatch('initStyles', res.data.styles)
        })
        .catch(error => {
          console.log('%c●', 'color: red', 'loadStyle: ', error)
        });
    },
    logout: function() {
      if (!this.$store.getters.isOnline) {
        this.$router.push('/login')
      } else {
        let session = this.$store.getters.session;
        this.$apollo
          .mutate({
            variables: {
              user_id: session.user.id,
              token: session.token
            },
            mutation: gql`
              mutation($user_id: Int!, $token: String!) {
                logout(user_id: $user_id, token: $token) {
                  id
                }
              }
            `
          })
          .then(() => {
            this.$store.dispatch('logout')
            this.$router.push('/login')
          })
          .catch(error => {
            console.log('%c●', 'color: red', 'logout: ', error)
          });
      }
    }
  },
  mounted: function() {
    this.loadStyles();
  }
};
</script>

<style lang="scss">
.nav {
  top: $header-height;
  height: calc(100vh - #{$header-height});
  min-height: calc(100vh - #{$header-height});
  z-index: $z-index-nav;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  flex-direction: column;
  background-color: $app-bkg;
  // background-color: $header-bkg;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  transition-property: transform, visibility, width;
  transform: translateX(-100%);
  width: 100%;
  @include breakpoint(tablet) {
    width: $nav-width;
  }
  &__link {
    flex-grow: 1;
    display: flex;
    color: $app-color;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
    @include breakpoint(tablet) {
      width: auto;
      justify-content: flex-start;
    }
    align-items: center;
    cursor: pointer;
    padding: 14px 16px!important;
    font-size: 18px;
    @include breakpoint(tablet) {
      font-size: 16px;
    }
    text-transform: capitalize;
    &--user {
      border-top: 1px rgba(255, 255, 255, 0.1) solid;
    }
    &--add-tracks.router-link-exact-active {
      .ion svg {
        fill: $validate-color;
      }
    }
    &--favorite.router-link-exact-active {
      .ion svg {
        fill: $favorite-color;
      }
    }
    &--style {
      &::before {
        content: "";
        height: 6px;
        width: 6px;
        border-radius: 6px;
        margin: 0 6px;
        margin-right: 16px;
      }
    }
    .ion, .avatar {
      margin-right: 10px;
    }
    .avatar {
      width: 16px;
      height: 16px;
      border-radius: 16px;
    }
    &:last-child {
      margin-bottom: 20px;  // fix player over nav
    }
    &:active {
      opacity: 0.5;
    }
    &:hover,
    &.router-link-exact-active {
      color: black;
      background-color: #e7e7e7;
      cursor: default;
      font-weight: bold;
    }
  }
}
</style>
