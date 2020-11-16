<template>
  <modal :key="track.yt_id" @close="close()">
    <form class="drop-track">
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
      validate: function(track) {
        this.$store.dispatch('validate', track)
      },
      close: function() {
        this.$emit('closeValidate')
      },
    },
  }
</script>
