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
    transition: all .2s;
  }
  .error-dialog {
    background-color: rgba(255, 0, 0, 0.445);
    padding: 20px;
    margin-bottom: 20px;
    width: calc(100% - 40px);
    text-align: center;
    border-top-left-radius: $dialog-border-radius;
    border-top-right-radius: $dialog-border-radius;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
  }
</style>