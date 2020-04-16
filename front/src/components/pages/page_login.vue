<template>
  <main class="login">
    <modal>
      <form class="login__form">
        <div v-if="error !== ''" class="login__error">
          {{ error }}
        </div>
        <router-link v-if="$route.name === 'login'" class="login__sign" to="signup" tag="button">
          Subscribe ?
        </router-link>
        <router-link v-if="$route.name === 'signup'" class="login__sign" to="login" tag="button">
          Login ?
        </router-link>
        <input class="login__email" type="email" v-model="email" placeholder="email" required>
        <input class="login__password" type="password" v-model="password" placeholder="password" required>
        <input v-if="$route.name === 'signup'" class="login__name" type="text" v-model="name" placeholder="name" required>
        <button class="login__button" @click.prevent="submit">
          <template v-if="$route.name === 'login'">login</template>
          <template v-if="$route.name === 'signup'">signup</template>
        </button>
      </form>
    </modal>
  </main>
</template>

<script>
  import gql from 'graphql-tag'
  import modal from '../elements/modal'
  export default {
    name: 'login',
    components: { modal },
    data: function() {
      return {
        error: '',
        email: '',
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
      login: function() {
        this.$apollo.mutate({
          variables: {
            email: this.email,
            password: this.password,
          },
          mutation: gql`mutation($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              user {
                id
                email
                name
                role
                tracks {
                  id
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
          this.$router.push('user')
        }).catch((error) => {
          this.error = error.message.replace('GraphQL error: ', '')
          console.log('%c●', 'color: red', 'login error: ', this.error)
        })
      },
      signup: function() {
        this.$apollo.mutate({
          variables: {
            name: this.name,
            email: this.email,
            password: this.password,
          },
          mutation: gql`mutation($name: String!, $email: String!, $password: String!) {
            signup(name: $name, email: $email, password: $password) {
              token
              user {
                id
                email
                name
                role
                tracks {
                  id
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
          this.error = error.message.replace('GraphQL error: ', '')
          console.log('%c●', 'color: red', 'login error: ', this.error)
        })
      }
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
    &__error {
      background-color: rgba(255, 0, 0, 0.445);
      padding: 20px;
      margin-bottom: 20px;
      width: 100%;
      text-align: center;
      padding-left: 0;
      padding-right: 0;
      @include breakpoint('tablet') {
        border-top-left-radius: $dialog-border-radius;
        border-top-right-radius: $dialog-border-radius;
      }
    }
  }
</style>
