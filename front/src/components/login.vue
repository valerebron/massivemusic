<template>
  <dialog class="login" open>
    <form class="login__form">
      <input v-model="name" type="text" placeholder="login">
      <input v-model="password" type="password" placeholder="password">
      <menu>
        <button @click.prevent="login">
          ok  
        </button>
      </menu>
    </form>
  </dialog>
</template>

<script>
  export default {
    name: 'login',
    methods: {
      login: function(e) {
        console.log(e)
      },
    },
  }
</script>

<style lang="scss">
  .login {
    margin-top: $header-height + 40px;
    margin-bottom: $header-height + 80px;
    z-index: $z-layer-tracklist;
    &__header {
      color: white;
    }
    &_search {
      z-index: $z-layer-search;
    }
  }
</style>
