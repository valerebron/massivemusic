<template>
  <modal :key="trackToEdit.yt_id" @close="close()">
    <iframe class="edit-tracks__iframe" type="text/html" :src="iframeSrc" :key="newTrack.yt_id" frameborder="0"></iframe>
    <form class="edit-track">
      <div v-if="error !== ''" class="error-dialog">
        {{ error }}
      </div>
      <styleSelector class="edit-track__style" :preSelected="newTrack.style.id"/>
      <input v-model="newTrack.artist" type="text" class="item" placeholder="artist" required @keydown.enter.prevent="edit()">
      <input v-model="newTrack.title" type="text" :class="'item style-'+newTrack.style" placeholder="title" required @keydown.enter.prevent="edit()">
      <explorerTrack @clickOnTrack="updateId" :initQuery="trackToEdit.title+' '+trackToEdit.artist" />
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
  import explorerTrack from '@/components/organisms/explorerTrack'
  export default {
    name: 'track-edit',
    components: { modal, styleSelector, explorerTrack },
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
        iframeSrc: '',
      }
    },
    methods: {
      load: function() {
        this.iframeSrc = 'https://www.youtube-nocookie.com/embed/'+this.newTrack.yt_id
        if(this.trackToEdit.style) {
          this.newTrack = this.trackToEdit // as javascript copy by reference, this is useless REFACTO
        }
      },
      updateId: function(track) {
        this.newTrack.yt_id = track.id
        this.iframeSrc = 'https://www.youtube-nocookie.com/embed/'+this.newTrack.yt_id
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
    height: 50vh;
    overflow-y: scroll;
    &__link {
      padding: 8px;
      &:hover {
        text-decoration: underline;
      }
    }
    &__style {
      margin-top: 10px;
    }
    .explorer {
      min-height: auto;
      margin-bottom: 20px;
      &__search {
        top: 0;
      }
      .track__createdAt {
        color: grey;
        font-size: 10px;
        overflow: visible;
        white-space: wrap;
      }
    }
  }
</style>