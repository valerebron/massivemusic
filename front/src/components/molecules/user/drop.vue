<template>
  <modal :key="user.id" @close="close()">
    <form class="drop-user">
      <p>Delete User : <br><br>{{ user.name }} ?</p>
      <div class="actions">
        <button @click.prevent="close()">
          Cancel
        </button>
        <button class="drop" @click.prevent="drop(user)">
          Delete
        </button>
      </div>
    </form>
  </modal>
</template>

<script>
  import modal from '@/components/atoms/modal'
  export default {
    name: 'drop-user',
    components: { modal },
    props: ['user'],
    methods: {
      drop: async function(user) {
        this.close()
        window.scroll(0,0)
        await this.$store.dispatch('dropUser', user)
      },
      close: function() {
        this.$emit('closeDrop')
        this.$router.push('/')
      },
    },
  }
</script>
