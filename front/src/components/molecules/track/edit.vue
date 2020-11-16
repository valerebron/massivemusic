<template>
  <modal :key="trackToEdit.yt_id" @close="close()">
    <iframe class="edit-tracks__iframe" type="text/html" :src="'https://www.youtube-nocookie.com/embed/'+newTrack.id" frameborder="0"></iframe>
    <form class="edit-track">
      <div v-if="error !== ''" class="error-dialog">
        {{ error }}
      </div>
      <a v-if="$store.getters.isAdmin" :href="'https://www.youtube.com/watch?v='+newTrack.yt_id" target="_blank" class="edit-track__link">
        check on youtube
      </a>
      <input v-model="newTrack.yt_id" pattern="[a-zA-Z0-9_\-]{11}" type="text" class="item" placeholder="id">
      <styleSelector class="add-bots__style" :preSelected="newTrack.style.id"/>
      <input v-model="newTrack.artist" type="text" class="item" placeholder="artist" required @keydown.enter.prevent="edit()">
      <input v-model="newTrack.title" type="text" :class="'item style-'+newTrack.style" placeholder="title" required @keydown.enter.prevent="edit()">
      <div class="actions">
        <button @click.prevent="close()">
          Cancel
        </button>
        <button class="edit" @click.prevent="edit()">
          Edit
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
  import modal from '@/components/atoms/modal'
  import styleSelector from '@/components/organisms/styleSelector'
  export default {
    name: 'track-edit',
    components: { modal, styleSelector },
    props: ['trackToEdit'],
    data: function() {
      return {
        error: '',
        styles: this.$store.getters.styles,
        newTrack: {
          id: 0,
          yt_id: '',
          title: '',
          artist: '',
          style: {
            id: 0,
          },
        },
      }
    },
    methods: {
      load: function() {
        if(this.trackToEdit.style) {
          this.newTrack = this.trackToEdit // as javascript copy by reference, this is useless REFACTO
        }
      },
      edit: async function() {
        let track = {
          user_id: this.$store.getters.session.user.id,
          id: this.newTrack.id,
          yt_id: this.newTrack.yt_id,
          title: this.newTrack.title,
          artist: this.newTrack.artist,
          style:  this.newTrack.style.id,
        }
        await this.$store.dispatch('editTrack', track)
        this.close()
      },
      close: function() {
        this.$emit('closeEdit')
      },
    },
    mounted: function() {
      this.load()
    },
    updated: function() {
      this.load()
    },
  }
</script>

<style lang="scss">
  .edit-track {
    &__link {
      padding: 8px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>