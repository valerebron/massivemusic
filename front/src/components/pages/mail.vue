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
              <div @click="toggleUserSelector" class="mail__contact">
                <avatar :user="{...to, role: 'USER'}" size="small" />
                {{ to.name }} ({{ to.email }})
              </div>
              <div class="mail__contacts" ref="contacts" :class="{ 'mail__contacts--open' : contactsOpen }" id="to" name="to" type="email" placeholder="all users" required>
                <input class="mail__search" ref="userSearch" type="text" placeholder="search" v-model="searchContact">
                <option @click="selectContact(contact)" class="mail__contact" v-for="contact in contacts.filter(contact => contact.name.toLowerCase().includes(this.searchContact.toLowerCase()))" :key="contact.id">
                  <avatar :user="{ ...contact, role: 'USER'}" size="small" />
                  {{ contact.name }}
                </option>
              </div>
            </div>
            <div>
              <label for="subject">subject</label>
              <input class="mail__subject" id="subject" v-model="subject" name="subject" type="text" required>
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
                <a href="https://massivemusic.fr/" target="_blank" style="text-decoration: none; border-bottom: 1px solid #d5d5d5; color: #727272;">
                  {{ new Date().getFullYear() }} - 
                  MassiveMusic.fr
                </a>
                 - 
                <a href="mailto:contact@massivemusic.fr" target="_blank" style="text-decoration: none; border-bottom: 1px solid #d5d5d5; color: #727272;">
                  contact@massivemusic.fr
                </a>
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
  import avatar from '@/components/atoms/avatar'
  import loader from '@/components/atoms/loader.vue'
  export default {
    name: 'mail',
    components: {
      loader,
      avatar
    },
    data: function() {
      return {
        to: { id: 0, name: 'All users', email: 'all@massivemusic.fr', role: 'USER' },
        contacts: [],
        contactsOpen: false,
        subject: '',
        mailContent: '',
        isLoading: false,
        res: '',
        searchContact: '',
      }
    },
    methods: {
      getContacts: function() {
        this.$apollo.query({
          variables: {
            token: this.$store.getters.session.token,
          },
          query: gql`query($token: String!) {
            getContacts(token: $token) {
              id,
              name,
              email,
            }
          }`,
        }).then((res) => {
          // sort alphabetic order
          this.contacts = res.data.getContacts.sort(function(a, b){
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
          })
          this.contacts.unshift(this.to)
          this.$refs.contacts.scrollTo(0, 0)
        }).catch((error) => {
          console.log(error)
        })
      },
      toggleUserSelector: function() {
        this.contactsOpen = !this.contactsOpen
        this.$refs.userSearch.focus()
        this.$refs.contacts.scrollTo(0, 0)
      },
      selectContact: function(contact) {
        if(this.contactsOpen) {
          this.to = contact
        }
        this.contactsOpen = !this.contactsOpen
      },
      sendMail: function() {
        if(this.subject !== '' && this.mailContent !== '') {
          this.isLoading = true
          this.$apollo.query({
            variables: {
              to: this.to.email,
              name: this.to.name,
              subject: this.subject,
              content: this.mailContent,
              token: this.$store.getters.session.token,
            },
            query: gql`query($to: String, $name: String, $subject: String!, $content: String!, $token: String!) {
              sendMail(to: $to, name: $name, subject: $subject, content: $content, token: $token)
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
    },
    mounted: function() {
      this.getContacts()
    },
  }
</script>

<style lang="scss">
  .mail {
    margin: 20px;
    label {
      margin-top: 10px;
      padding: 10px 0;
      display: inline-block;
    }
    &__body {
      @include breakpoint(tablet) {
        display: flex;
        justify-content: space-around;
      }
    }
    &__contacts {
      transition: height .3s;
      height: 0;
      max-height: 240px;
      overflow: hidden;
      background-color: rgb(24, 24, 24);
      &--open {
        height: 40vh;
        overflow: auto;
      }
    }
    &__search {
      position: sticky;
      top: 0;
      background-color: rgb(40, 40, 40)!important;
    }
    &__contact {
      padding: 4px; 
      display: flex;
      align-items: center;
      &:hover {
        background-color: white;
        color: black;
      }
      .avatar {
        margin: 0 12px;
      }
    }
    &__subject {
      text-align-last: left;
    }
    &__form {
      min-width: 350px;
      @include breakpoint(tablet) {
        margin-right: 20px;
      }
      .content {
        text-align: left;
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