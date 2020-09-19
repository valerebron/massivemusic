<template>
  <modal :key="track.yt_id" @close="close()">
    <form class="drop-track">
      <p>Delete track : <br><br>{{ track.title }} from {{ track.artist }} ?</p>
      <div class="actions">
        <button @click.prevent="close()">
          Cancel
        </button>
        <button class="drop" @click.prevent="drop(track)">
          Delete
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
  import modal from '@/components/atoms/modal'
  export default {
    name: 'track-drop',
    components: { modal },
    props: ['track'],
    methods: {
      drop: async function(track) {
        await this.$store.dispatch('dropTrack', track)
        this.close()
      },
      close: function() {
        this.$emit('closeDrop')
      },
    },
  }
</script>
