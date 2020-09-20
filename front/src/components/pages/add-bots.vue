<template>
  <main class="add-bots page--container">
    <explorerChannel @clickOnChannel="open"/>
    <modal @close="close()">
      <form class="add-bots__form">
        <avatar v-if="channel !== ''" class="add-bots__avatar" :user="channel" size="medium" />
        <input v-model="channel.name" type="text" class="item" placeholder="name" @keydown.enter.prevent="add()">
        <styleSelector class="add-bots__style" preSelected="0"/>
        <textarea name="description" placeholder="About you" v-model="channel.channel_description" id="" cols="30" rows="10"></textarea>
        <p>Enable Tracks ?</p>
        <checkbox class="add-bots__enable-tracks" :state="channel.channel_enable_tracks"></checkbox>
        <div class="actions">
          <button @click.prevent="close">
            Cancel
          </button>
          <button class="validate" @click.prevent="add">
            Add
          </button>
        </div>
      </form>
    </modal>
  </main>
</template>

<script>
  import avatar from '@/components/atoms/avatar'
  import modal from '@/components/atoms/modal'
  import styleSelector from '@/components/organisms/styleSelector'
  import explorerChannel from '@/components/organisms/explorerChannel'
  import checkbox from '@/components/atoms/checkbox'
  export default {
    name: 'add-bots',
    components: {
      modal,
      styleSelector,
      explorerChannel,
      checkbox,
      avatar,
    },
    data: function() {
      return {
        channel: '',
      }
    },
    methods: {
      open: function(channel) {
        this.channel = channel
        this.$store.dispatch('modal', true)
      },
      close: function() {
        this.channel = {}
        this.$store.dispatch('modal', false)
      },
      add: async function() {
        if(document.querySelector('.add-bots__style .selected')) {
          this.channel.channel_enable_tracks = document.querySelector('.add-bots__enable-tracks input').checked
          this.channel.channel_style = parseInt(document.querySelector('.add-bots__style .selected').dataset.key)
          this.channel.token = this.$store.getters.session.token
          this.channel.email = this.channel.name.replace(/[^a-zA-Z]/g, '').toLowerCase()+'@youtube.com'
          this.channel.channel_avatar_high = this.channel.channel_avatar_medium
          await this.$store.dispatch('addBot', this.channel)
          this.$store.dispatch('modal', false)
          window.scroll(0,0)
          this.$router.push('/bots')
        }
        else {
          console.log('choose a style before')
        }
      },
    },
    mounted: function() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss">
  .add-bots {
    &__form {
      background-color: #202020;
      @include breakpoint('tablet') {
        border-radius: 0;
        border-bottom-left-radius: $dialog-border-radius;
        border-bottom-right-radius: $dialog-border-radius;
      }
    }
    &__avatar {
      padding: 20px;
    }
  }
</style>
