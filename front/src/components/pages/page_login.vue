<template>
  <main class="login">
    <modal @close="close()">
      <form class="login__form">
        <div v-if="error !== ''" class="error-dialog">
          {{ error }}
        </div>
        <router-link v-if="$route.name === 'login'" class="login__sign" to="signup" tag="button">
          Subscribe ?
        </router-link>
        <router-link v-if="$route.name === 'signup'" class="login__sign" to="login" tag="button">
          Login ?
        </router-link>
        <input class="login__credential" type="email" v-model="credential" placeholder="email or name" required @keydown.enter.prevent="submit()">
        <input class="login__password" type="password" v-model="password" placeholder="password" required @keydown.enter.prevent="submit">
        <input v-if="$route.name === 'signup'" class="login__name" type="text" v-model="name" placeholder="name" required @keydown.enter.prevent="submit()">
        <button class="login__button" @click.prevent="submit()">
          <template v-if="$route.name === 'login'">login</template>
          <template v-if="$route.name === 'signup'">signup</template>
        </button>
      </form>
    </modal>
  </main>
</template>

<script>
  import SHA1 from 'sha1'
  import gql from 'graphql-tag'
  import modal from '../elements/modal'
  export default {
    name: 'login',
    components: { modal },
    data: function() {
      return {
        error: '',
        credential: '',
        password: '',
        name: '',
        isOpen: true,
      }
    },
    methods: {
      submit: function() {
        if(this.$route.name === 'login') {
          this.login()
        }
        if(this.$route.name === 'signup') {
          this.signup()
        }
      },
      login: async function() {
        this.$apollo.mutate({
          variables: {
            credential: this.credential,
            hash: await SHA1(this.password),
          },
          mutation: gql`mutation($credential: String!, $hash: String!) {
            login(credential: $credential, hash: $hash) {
              token
              user {
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
          }`,
        }).then((res) => {
          this.$store.dispatch('modal', false)
          this.$store.dispatch('login', res.data.login)
          this.$store.dispatch('resetCounters')
          this.$router.push('user')
        }).catch((error) => {
          this.error = window.formatError(error.message)
          console.log('%c●', 'color: red', 'login error')
        })
      },
      signup: function() {
        this.$apollo.mutate({
          variables: {
            name: this.name,
            email: this.credential,
            hash: SHA1(this.password),
          },
          mutation: gql`mutation($name: String!, $email: String!, $hash: String!) {
            signup(name: $name, email: $email, hash: $hash) {
              token
              user {
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
          }`,
        }).then((res) => {
          this.$store.dispatch('modal', false)
          this.$store.dispatch('login', res.data.signup)
          this.$router.push('user')
        }).catch((error) => {
          this.error = window.formatError(error.message)
          console.log('%c●', 'color: red', 'signup error')
        })
      },
      close: function() {
        this.$store.dispatch('modal', false)
        if(this.$route.name === 'login') {
          this.$router.push('/')
        }
      },
    },
    mounted: function() {
      if(this.$store.getters.isOnline) {
        this.$router.push('user')
      }
      else {
        this.$store.dispatch('modal', true)
      }
    },
  }
</script>

<style lang="scss">
  .login {
    &__form {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .actions {
      display: flex;
      width: 100%;
    }
    &__button {
      text-transform: uppercase;
      margin-top: 8px;
      width: 100%;
      color: black;
      @extend %appStyleBkgColor;
      border-radius: 0 0 10px 10px;
      &:hover {
        color: white;
      }
    }
    &__sign {
      margin: 20px 0;
      text-align: center;
    }
  }
</style>
