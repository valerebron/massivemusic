<template>
  <main class="login">
    <modal @close="close()">
      <form class="login__form" v-if="!emailSent">
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
          ref="upload"
        />
        <input
          v-if="$route.name === 'signup'"
          class="login__name"
          type="text"
          v-model="name"
          placeholder="Username"
          required
          @keydown.enter.prevent="submit($event)"
        >
        <input
          class="login__credential"
          type="email" v-model="credential"
          :placeholder="$route.name === 'login' ? 'Email or Username' : 'Email'"
          required
          ref="credential"
          @keydown.enter.prevent="submit($event)"
        >
        <input
          class="login__password"
          type="password"
          v-model="password"
          placeholder="Password"
          required
          @keydown.enter.prevent="submit($event)"
        >
        <a
          v-if="$route.name === 'login'"
          @click="sendPassword"
          class="login__forgot"
        >
          forgot password ?
        </a>
        <router-link v-if="$route.name === 'login'" class="login__sign" to="signup" tag="button">
          no account yet ?
        </router-link>
        <router-link v-if="$route.name === 'signup'" class="login__sign" to="login" tag="button">
          already got an account ?
        </router-link>
        <loader v-if="isLoading" />
        <button class="login__button cta" @click.prevent="submit($event)">
          <template v-if="$route.name === 'login'">login</template>
          <template v-if="$route.name === 'signup'">subscribe</template>
        </button>
      </form>
      <div v-else class="login__sent">
        {{ forgotText }}
        <button @click="close" class="back-button">
          back
        </button>
      </div>
    </modal>
  </main>
</template>

<script>
  import SHA1 from 'sha1'
  import gql from 'graphql-tag'
  import modal from '@/components/atoms/modal'
  import upload from '@/components/atoms/upload'
  import avatar from '@/components/atoms/avatar'
  import loader from '@/components/atoms/loader.vue'

  export default {
    name: 'login',
    components: { modal, upload, avatar, loader },
    data: function() {
      return {
        error: '',
        credential: '',
        password: '',
        name: '',
        isOpen: true,
        avatar: '',
        avatarB64: '',
        forgotText: '',
        emailSent: false,
        isLoading: false,
      }
    },
    methods: {
      clickOnUpload() {
        document.querySelector('.upload__input').click()
      },
      onFileSelected: async function (url, b64) {
        this.avatar = url
        this.avatarB64 = b64
      },
      sendPassword() {
        let credential = this.$refs.credential.value
        if(credential === '') {
          this.error = 'insert email to send password'
        }
        else {
          this.error = ''
          this.$apollo.mutate({
            variables: {
              email: credential,
            },
            mutation: gql`mutation($email: String!) {
              sendPassword(email: $email)
            }`,
          }).then((res) => {
            if(res.data) {
              this.emailSent = true
              this.forgotText = 'An email as been sent to '+credential+'.'
            }
          }).catch((error) => {
            this.error = error
            console.log('%c●', 'color: red', 'send password error: ', error)
          })
        }
      },
      submit: function(e) {
        this.isLoading = true
        if(this.$route.name === 'login' && this.credential !== '' && this.password !== '') {
          e.target.blur()
          this.login()
        }
        else if(this.$route.name === 'signup' && this.credential !== '' && this.password !== '' && this.name !== '') {
          e.target.blur()
          this.signup()
        }
        else {
          this.isLoading = false
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
          this.isLoading = false
          this.avatar = res.data.login.user
          this.$store.dispatch('modal', false)
          this.$store.dispatch('login', res.data.login)
          this.$router.push('/user/'+res.data.login.user.name+'/me/profile')
        }).catch((error) => {
          this.isLoading = false
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
          this.isLoading = false
          this.$store.dispatch('modal', false)
          this.$store.dispatch('login', res.data.signup)
          this.$router.push('/user/'+res.data.signup.user.name+'/me/profile')
        }).catch((error) => {
          this.isLoading = false
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
        this.$router.push('/user/'+this.$store.getters.session.user.name+'/me/profile')
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
    &__form, &__sent {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .loader {
      width: 50px;
      height: 50px;
    }
    .actions {
      display: flex;
      width: 100%;
    }
    &__button {
      text-transform: uppercase;
      margin-top: 8px;
      width: 100%;
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
    &__forgot {
      cursor: pointer;
      font-size: 12px;
      text-decoration: underline;
    }
    &__sent {
      color: white;
      padding: 60px 30px;
      line-height: 24px;
      text-align: center;
      a {
        margin-top: 20px;
        cursor: pointer;
      }
      .back-button {
        margin-top: 20px;
      }
    }
  }
</style>
