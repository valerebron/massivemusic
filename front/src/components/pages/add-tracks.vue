<template>
  <main class="add-tracks">
    <explorerTrack @clickOnTrack="open" />
    <modal @close="close()">
      <iframe class="add-tracks__iframe" type="text/html" :src="'https://www.youtube-nocookie.com/embed/'+track.id" frameborder="0"></iframe>
      <form class="add-tracks__form">
        <p class="add-tracks__original-title">{{ track.title}}</p>
        <styleSelector class="add-bots__style" @changeStyle="changeStyle($event)" preSelected="0"/>
        <input v-model="track.artist"  type="text" class="item" placeholder="artist" @keydown.enter.prevent="add()">
        <input v-model="track.title" type="text" class="item" placeholder="title" @keydown.enter.prevent="add()">
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
  import explorerTrack from '@/components/organisms/explorerTrack'
  import styleSelector from '@/components/organisms/styleSelector'
  import modal from '@/components/atoms/modal'
  export default {
    name: 'addTracks',
    components: {
      explorerTrack,
      styleSelector,
      modal,
    },
    data: function() {
      return {
        track: {
          title: '',
          artist: '',
          style: 0,
        },
      }
    },
    methods: {
      open: function(track) {
        this.track = track
        this.$store.dispatch('modal', true)
      },
      close: function() {
        this.track = {}
        this.$store.dispatch('modal', false)
      },
      add: async function() {
        if(this.$store.getters.isOnline) {
          await this.$store.dispatch('addTrack', this.track)
          this.close()
        }
        else {
          this.$router.push('/login')
        }
      },
      changeStyle: function(style) {
        this.track.style = style.id
      }
    },
    mounted: function() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss">
  .add-tracks {
    &__form {
      background-color: #202020;
      @include breakpoint('tablet') {
        border-radius: 0;
        border-bottom-left-radius: $dialog-border-radius;
        border-bottom-right-radius: $dialog-border-radius;
      }
    }
    &__iframe {
      text-align: center;
      height: 100px;
      min-height: 0;
      @include breakpoint('tablet') {
        border-radius: 0;
        border-top-left-radius: $dialog-border-radius;
        border-top-right-radius: $dialog-border-radius;
      }
    }
    &__original-title {
      color: $app-color;
      padding-bottom: 12px;
      text-align: center;
    }
  }
</style>
