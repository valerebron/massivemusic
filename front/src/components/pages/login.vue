<template>
  <main class="login">
    <modal @close="close()">
      <form class="login__form">
        <div v-if="error !== ''" class="error-dialog">
          {{ error }}
        </div>
        <avatar
          class="login__avatar"
          :user="avatar"
          size="medium"
          @click="clickOnUpload()"
        />
        <h3 v-if="$route.name === 'signup'">
          {{ name }}
        </h3>
        <upload
          v-if="$route.name === 'signup'"
          @onFileSelected="onFileSelected"
          placeholder="avatar"
        />
        <input
          class="login__credential"
          type="email" v-model="credential"
          :placeholder="$route.name === 'login' ? 'Email or Username' : 'Email'"
          required
          @keydown.enter.prevent="submit()"
        >
        <input
          class="login__password"
          type="password"
          v-model="password"
          placeholder="Password"
          required
          @keydown.enter.prevent="submit()"
        >
        <input
          v-if="$route.name === 'signup'"
          class="login__name"
          type="text"
          v-model="name"
          placeholder="Username"
          required
          @keydown.enter.prevent="submit()"
        >
        <router-link v-if="$route.name === 'login'" class="login__sign" to="signup" tag="button">
          no account yet ?
        </router-link>
        <router-link v-if="$route.name === 'signup'" class="login__sign" to="login" tag="button">
          already got an account ?
        </router-link>
        <button class="login__button" @click.prevent="submit()">
          <template v-if="$route.name === 'login'">login</template>
          <template v-if="$route.name === 'signup'">subscribe</template>
        </button>
      </form>
    </modal>
  </main>
</template>

<script>
  import SHA1 from 'sha1'
  import gql from 'graphql-tag'
  import modal from '@/components/atoms/modal'
  import upload from '@/components/atoms/upload'
  import avatar from '@/components/atoms/avatar'

  export default {
    name: 'login',
    components: { modal, upload, avatar },
    data: function() {
      return {
        error: '',
        credential: '',
        password: '',
        name: '',
        isOpen: true,
        avatar: '',
        avatarB64: '',
      }
    },
    methods: {
      clickOnUpload() {
        if(document.querySelector('.upload__input')) {
          document.querySelector('.upload__input').click()
        }
      },
      onFileSelected: async function (url, b64) {
        this.avatar = url
        this.avatarB64 = b64
      },
      submit: function() {
        if(this.$route.name === 'login' && this.credential !== '' && this.password !== '') {
          this.login()
        }
        if(this.$route.name === 'signup' && this.credential !== '' && this.password !== '' && this.name !== '') {
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
                channel_id
                channel_style
                channel_avatar_small
                channel_avatar_medium
                channel_avatar_high
                channel_description
              }
            }
          }`,
        }).then((res) => {
          this.avatar = res.data.login.user
          this.$store.dispatch('modal', false)
          this.$store.dispatch('login', res.data.login)
          this.$store.dispatch('resetCounters')
          this.$router.push('/user/me/profile')
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
            avatarB64: this.avatarB64,
          },
          mutation: gql`mutation($name: String!, $email: String!, $hash: String!, $avatarB64: String) {
            signup(name: $name, email: $email, hash: $hash, avatarB64: $avatarB64) {
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
                channel_id
                channel_style
                channel_avatar_small
                channel_avatar_medium
                channel_avatar_high
                channel_description
              }
            }
          }`,
        }).then((res) => {
          this.$store.dispatch('modal', false)
          this.$store.dispatch('login', res.data.signup)
          this.$router.push('/user/me/profile')
        }).catch((error) => {
          this.error = window.formatError(error.message)
          console.log('%c●', 'color: red', 'signup error', this.error)
        })
      },
      close: function() {
        this.$store.dispatch('modal', false)
        this.$router.push('/')
      },
    },
    mounted: function() {
      if(this.$store.getters.isOnline) {
        this.$router.push('/user/me/profile')
      }
      else {
        this.$store.dispatch('modal', true)
      }
    },
    updated: function() {
      this.$store.dispatch('modal', true)
    },
  }
</script>

<style lang="scss">
  .login {
    .avatar {
      .route-signup & {
        cursor: pointer;
      }
    }
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
        color: $app-color;
      }
    }
    &__avatar {
      margin-top: 20px;
    }
    &__sign {
      margin: 20px 0;
      text-align: center;
      &:focus {
        background-color: transparent;
        outline: none;
        border: none;
      }
    }
  }
</style>
