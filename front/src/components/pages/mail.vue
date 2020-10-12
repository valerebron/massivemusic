<template>
  <main class="mail">
    <div class="mail__page">
      <section class="mail__body">
        <div class="mail__form">
          <h2>
            Massive Mail
          </h2>
          <header>
            <div>
              <label for="to">to</label>
              <input id="to" v-model="to" name="to" type="email" placeholder="all users">
            </div>
            <div>
              <label for="subject">subject</label>
              <input id="subject" v-model="subject" name="subject" type="text" required>
            </div>
          </header>
          <main>
            <label for="content">content</label>
            <textarea v-model="mailContent" name="content" class="content" id="content" cols="30" rows="10" required></textarea>
            <button class="style-bkg-11" @click="sendMail">
              send
              <loader :isLoading="isLoading"/>
            </button>
            <div class="mail__result">
              {{ res }}
            </div>
          </main>
        </div>
        <aside class="mail__preview">
          <table class="container hero-subheader" border="0" cellpadding="0" cellspacing="0" style="width: 100%">
            <tr>
              <td>
                <br />
                <a href="https://massivemusic.fr" style="width: 100%; display: inline-block; text-align: center; font-size: 22px; text-decoration: none; color: #3f3f3f; text-transform: uppercase; font-weight: bold;">
                  <img src="https://massivemusic.fr/logo.png" style="height: 80px;"/>
                </a>
              </td>
            </tr>
            <tr>
              <td class="hero-subheader__title" style="font-size: 18px; font-weight: bold; color: black; padding: 80px 0 15px 0;" align="left">
                {{ subject }}
              </td>
            </tr>
          </table>
          <table class="container" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td v-html="mailContent" class="hero-subheader__content" style="font-size: 16px; line-height: 27px; color: #969696; padding: 0 60px 90px 0;" align="left">
              </td>
            </tr>
          </table>
          <table class="container" border="0" cellpadding="0" cellspacing="0" align="center" style="border-top: 1px solid #eeeeee;">
            <tr>
              <td align="middle">
              </td>
            </tr>

            <tr>
              <td style="color: #adadad; text-align: center; font-size: 15px; padding: 10px 0 60px 0; line-height: 22px;">
                <br />
                <br />
                <div class="styles">
                  <a href="https://massivemusic.fr/dubstep" class="style__link style-bkg-11">
                    DUBSTEP
                  </a>
                  <a href="https://massivemusic.fr/drumandbass" class="style__link style-bkg-12">
                    DRUM & BASS
                  </a>
                  <a href="https://massivemusic.fr/dub" class="style__link style-bkg-13">
                    DUB
                  </a>
                </div>
                <br />
                <br />
                {{ new Date().getFullYear() }} - 
                <a href="https://massivemusic.fr/" target="_blank" style="text-decoration: none; border-bottom: 1px solid #d5d5d5; color: #727272;">MassiveMusic.fr</a>
                <br />
                <br />
              </td>
            </tr>
          </table>
        </aside>
      </section>
    </div>
  </main>
</template>

<script>
  import gql from 'graphql-tag'
  import loader from '@/components/atoms/loader.vue'
  export default {
    name: 'mail',
    components: {loader},
    data: function() {
      return {
        to: '',
        subject: '',
        mailContent: '',
        isLoading: false,
        res: '',
      }
    },
    methods: {
      sendMail: function() {
        if(this.subject !== '' && this.mailContent !== '') {
          this.isLoading = true
          this.$apollo.query({
            variables: {
              to: this.to,
              subject: this.subject,
              content: this.mailContent,
              token: this.$store.getters.session.token,
            },
            query: gql`query($to: String, $subject: String!, $content: String!, $token: String!) {
              sendMail(to: $to, subject: $subject, content: $content, token: $token)
            }`,
          }).then((res) => {
            this.isLoading = false
            this.res = res.data.sendMail
          }).catch((error) => {
            this.isLoading = false
            this.error = error.message.replace('GraphQL error: ', '')
            console.log('%c●', 'color: red', 'sendMail error: ', this.error)
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .mail {
    margin: 20px;
    &__body {
      @include breakpoint(tablet) {
        display: flex;
        justify-content: space-around;
      }
    }
    &__form {
      min-width: 350px;
      @include breakpoint(tablet) {
        margin-right: 20px;
      }
      .content {
        text-align: left;
        padding: 16px;
      }
    }
    &__page {
      width: 100%;
    }
    &__preview {
      max-width: 490px;
      background-color: white;
      border: rgb(218, 218, 218) 20px solid;
      padding: 20px;
      width: 100%;
      .hero-subheader__content {
        color: grey;
        p {
          color: grey;
        }
        a {
          color: grey;
          text-decoration: underline;
        }
      }
      .style__link {
        padding: 4px 10px;
        margin-right: 14px;
        color: white;
      }
    }
    button {
      width: 100%;
      margin-top: 30px;
      margin-bottom: 40px;
    }
  }
</style>