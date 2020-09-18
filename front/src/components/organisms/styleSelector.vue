<template>
  <div class="styleSelector">
    <button @click.prevent="select($event, style)" v-for="style in this.$store.getters.styles" :class="[style.id == selected ? 'selected style-bkg-'+style.id : 'style-hover-bkg-'+style.id]" :key="style.id" :data-key="style.id">
      {{ style.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'styleSelector',
  props: ['preSelected'],
  computed: {
    selected: {
      get() {return this.$props.preSelected},
    }
  },
  methods: {
    select(event, style) {
      if(this.$el.querySelector('.selected')) {
        let oldButton = this.$el.querySelector('.selected')
        oldButton.className = ''
        oldButton.classList.add('style-hover-bkg-'+oldButton.dataset.key)
      }
      let newButton = event.target
      newButton.className = ''
      newButton.classList.add('selected', 'style-bkg-'+style.id)
      this.$emit('changeStyle')
    },
  },
}
</script>

<style lang="scss">
.styleSelector {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .selected span {
    color: white;
  }
}
</style>
