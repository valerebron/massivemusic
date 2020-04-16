<template>
  <dialog>
    <a @click="close()" class="close-dialog"></a>
    <div>
      <slot></slot>
    </div>
  </dialog>
</template>
<script>
  export default {
    name: 'modals',
    methods: {
      close: function() {
        this.$store.dispatch('modal', false)
        if(this.$route.name === 'login') {
          this.$router.push('/')
        }
      },
    },
  }
</script>

<style lang="scss">
  .close-dialog {
    position: fixed;
    width: 100vw;
    height: 100vh;
    cursor: normal;
    background-color: #000000d7;
  }
</style>