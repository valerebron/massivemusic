<template>
  <modal :key="track.yt_id" @close="close()">
    <form class="validate-track">
      <p>Validate track : <br><br>{{ track.title }} from {{ track.artist }} ?</p>
      <div class="actions">
        <button @click.prevent="close()">
          Cancel
        </button>
        <button class="validate" @click.prevent="validate(track)">
          Validate
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
  import modal from '@/components/atoms/modal'
  export default {
    name: 'track-validate',
    components: { modal },
    props: ['track'],
    methods: {
      validate: async function(track) {
        await this.$store.dispatch('validateTrack', track)
        this.close()
      },
      close: function() {
        this.$emit('closeValidate')
      },
    },
  }
</script>
