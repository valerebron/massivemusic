<template>
  <main class="add-tracks page--container">
    <explorerTrack @clickOnTrack="open" />
    <modal @close="close()">
      <iframe class="add-tracks__iframe" type="text/html" :src="'https://www.youtube-nocookie.com/embed/'+track.id" frameborder="0"></iframe>
      <form class="add-tracks__form">
        <p class="add-tracks__original-title">{{ track.title}}</p>
        <select v-model="track.style" class="item">
          <option v-for="style in $store.getters.styles" :key="style.id" :value="style.id">
            {{ style.name }}
          </option>
        </select>
        <input :value="track.artist"  type="text" class="item" placeholder="artist" @keydown.enter.prevent="add()">
        <input :value="track.title" type="text" class="item" placeholder="title" @keydown.enter.prevent="add()">
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
  import modal from '@/components/atoms/modal'
  export default {
    name: 'addTracks',
    components: {
      explorerTrack,
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
      color: white;
      padding-bottom: 12px;
      text-align: center;
    }
  }
</style>
