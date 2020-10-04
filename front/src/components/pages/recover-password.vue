<template>
  <main class="page--container">
    <form class="recover-password" v-if="!isChanged">
      <label for="newpass">
        tape your new password:
      </label>
      <input id="newpass" type="password" ref="pass1">
      <label for="newpass2">
        and re-tape it:
      </label>
      <input id="newpass2" type="password" ref="pass2">
      <div v-if="message" class="message">
        {{ message }}
      </div>
      <button @click.prevent="changePassword">
        send
      </button>
    </form>
    <div v-else class="recover-password">
      <p>
        your password have been changed
        <router-link to="/login" class="nav__link">
          <icon-login />login
        </router-link>
      </p>
    </div>
  </main>
</template>

<script>
import SHA1 from 'sha1'
export default {
  name: 'recover-password',
  data: function() {
    return {
      isChanged: false,
      message: '',
    }
  },
  methods: {
    changePassword: async function() {
      const newPassword = this.$refs.pass1.value
      if(newPassword === this.$refs.pass2.value) {
        if(newPassword.length > 4) {
          this.message = ''
          const payload = {
            email: this.$route.params.email,
            token: this.$route.params.token,
            newPassword: SHA1(newPassword),
          }
          await this.$store.dispatch('changePassword', payload)
          this.isChanged = true
        }
        else {
          this.message = 'password must have more than 4 char'
        }
      }
      else {
        this.message = 'password are different'
      }
    },
  },
}
</script>

<style lang="scss">
.recover-password {
  width: 100%;
  margin: 0 60px;
  margin-top: 140px;
  display: flex;
  justify-content: center;
  .message {
    padding: 16px;
    text-transform: capitalize;
  }
  label {
    text-align: left;
    width: 100%;
  }
}
</style>