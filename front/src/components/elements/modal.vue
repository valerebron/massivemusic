<template>
  <dialog>
    <a @click="$emit('close')" class="close-dialog"></a>
    <div>
      <slot></slot>
    </div>
  </dialog>
</template>
<script>
  export default {
    name: 'modals',
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