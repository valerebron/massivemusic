<template>
  <figure class="user user--edit card" v-if="$route.params.user_id === 'me' || $store.getters.isAdmin">
    <avatar :user="user" size="big" @click="clickOnAvatar" ref="userEditAvatar" />
    <figcaption class="user__captions">
      <h2 class="user__name">
        {{ user.name }}
        <span :class="'style-'+user.channel_style">
          .
        </span>
      </h2>
      <p class="user__favorite">
        Favorite BassMusic Style ?
      </p>
      <styleSelector class="user__style" @changeStyle="editUser" :preSelected="user.channel_style"></styleSelector>
      <upload
        @onFileSelected="onFileSelected"
        placeholder="avatar"
        v-if="user.role !== 'ROBOT'"
      />
      <input type="text" v-model="user.email" disabled>
      <textarea name="description" placeholder="About you" @change="editUser" v-model="user.channel_description" id="" cols="30" rows="10"></textarea>
      <template v-if="$route.params.user_id === 'me' || $store.getters.isAdmin">
        <p>
          <checkbox class="user__enable-tracks" @changeCheckbox="editUser" :state="user.channel_enable_tracks">
            Enable Tracks ?
          </checkbox>
        </p>
        <button class="user__drop drop cta" @click="openDrop(user)">
          <icon-trash/>
          DELETE
        </button>
        <drop @closeDrop="closeDrop" :user="user"/>
      </template>
      <router-link :to="'/user/'+$route.params.user_id+'/profile'" tag="button" class="cta">
        <icon-back/>
        go back to profile
      </router-link>
    </figcaption>
  </figure>
</template>

<script>
  import styleSelector from '@/components/organisms/styleSelector'
  import avatar from '@/components/atoms/avatar'
  import upload from '@/components/atoms/upload'
  import checkbox from '@/components/atoms/checkbox'
  import drop from '@/components/molecules/user/drop'
  import gql from 'graphql-tag'
  export default {
    name: 'user-profile-edit',
    components: {
      styleSelector,
      avatar,
      checkbox,
      drop,
      upload,
    },
    props: ['user'],
    data: function() {
      return {
        isDropOpen: false,
        avatarB64: '',
      }
    },
    methods: {
      clickOnAvatar() {
        document.querySelector('.upload__input').click()
      },
      editUser() {
        if(this.$store.getters.isAdmin) {
          this.user.channel_enable_tracks = document.querySelector('.user__enable-tracks input').checked
        }
        if(document.querySelector('.user__style .selected')) {
          this.user.channel_style = parseInt(document.querySelector('.user__style .selected').dataset.key)
        }
        else {
          this.user.channel_style = 0
        }
        this.$apollo.mutate({
          variables: {
            id: this.user.id,
            token: this.$store.getters.session.token,
            channel_style: this.user.channel_style,
            channel_enable_tracks: this.user.channel_enable_tracks,
            channel_description: this.user.channel_description,
            avatar_b64: this.avatarB64,
          },
          mutation: gql`mutation($id: Int!, $token: String!, $channel_style: Int, $channel_enable_tracks: Boolean, $channel_description: String, $avatar_b64: String){
            editUser(id: $id, token: $token, channel_style: $channel_style, channel_enable_tracks: $channel_enable_tracks, channel_description: $channel_description, avatar_b64: $avatar_b64) {
              id
              channel_style
              channel_enable_tracks
              channel_description
            }
          }`
        }).then((res) => {
          if(this.$route.params.user_id === 'me') {
            this.$store.dispatch('updateMe', res.data.editUser)
          }
        })
        .catch((error) => {
          this.error = error.message.replace('GraphQL error: ', '')
          console.log('%c●', 'color: red', 'edit user error: ', this.error)
        })
      },
      async onFileSelected (url, b64) {
        this.avatarB64 = b64
        this.$refs.userEditAvatar.$el.src = url
        this.editUser()
      },
      openDrop() {
        this.isDropOpen = true
        this.$store.dispatch('modal', true)
      },
      closeDrop() {
        this.$store.dispatch('modal', false)
        this.isDropOpen = false
      },
    },
  }
</script>

<style lang="scss">
  .user {
    &--edit {
      .avatar {
        cursor: pointer;
      } 
    }
    &__drop {
      float: right;
      text-transform: uppercase;
    }
  }
</style>