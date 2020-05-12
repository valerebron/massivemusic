<template>
  <nav class="nav">
    <template v-if="$store.getters.isOnline">
      <router-link to="user" class="nav__link nav__link--user">
        <img class="gravatar" :src="gravatar" alt="">
        {{ $store.getters.session.user.name }}
      </router-link>
      <router-link v-if="$store.getters.isAdmin" to="admin" class="nav__link">
        <icon-admin />
        admin
      </router-link>
      <router-link to="add-tracks" class="nav__link">
        <icon-add />add Tracks
      </router-link>
    </template>
    <router-link v-else to="login" class="nav__link">
      <icon-login />login
    </router-link>
    <router-link to="favorites" class="nav__link nav__link--favorite">
      <icon-star />
      favorites
    </router-link>
    <template v-if="$store.getters.isOnline">
      <router-link to="my-tracks" class="nav__link">
        <icon-contact />
        my tracks
      </router-link>
      <router-link to="pending-tracks" class="nav__link">
        <icon-pending />pending Tracks
      </router-link>
      <router-link to="invalid-tracks" class="nav__link">
        <icon-invalid />invalid Tracks
      </router-link>
    </template>
    <router-link to="/" class="nav__link">
      <icon-home />all styles
    </router-link>
    <router-link
      class="nav__link nav__link--style"
      :class="'style-hover-bkg-'+style.id"
      v-for="style in $store.getters.styles"
      :to="style.slug"
      :key="style.id">
      {{ style.name }}
    </router-link>
    <div v-if="$store.getters.isOnline" @click="logout" class="nav__link">
      <icon-logout/>
      logout
    </div>
  </nav>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'navigation',
  computed: {
    gravatar: {
      get() { return this.$store.getters.myGravatar },
    },
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
        this.$router.push('login')
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
            this.$router.push('login')
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
    text-shadow: 0 0 4px black;
    flex-grow: 1;
    display: flex;
    color: white;
    justify-content: center;
    width: 100%;
    @include breakpoint(tablet) {
      width: auto;
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
    @include breakpoint(tablet) {
      justify-content: flex-start;
    }
    align-items: center;
    cursor: pointer;
    padding: 10px 16px;
    font-size: 16px;
    text-transform: capitalize;
    .ion, .gravatar {
      margin-right: 10px;
    }
    .gravatar {
      width: 16px;
      height: 16px;
      border-radius: 16px;
    }
    &:active {
      opacity: 0.5;
    }
    &:hover,
    &.router-link-exact-active {
      background-color: $color-selection;
      cursor: default;
    }
    &:first-child {
      @include breakpoint(tablet) {
        margin-top: 20px;
      }
    }
    &:last-child {
      @include breakpoint(tablet) {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
