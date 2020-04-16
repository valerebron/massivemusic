<template>
  <main class="user page--container">
    <ul>
      <li>
        User profile here
      </li>
      <li>
        name
      </li>
      <li>
        picture
      </li>
      <li>
        favourite song ?
      </li>
      <li>
        date inscription
      </li>
      <li>
        time listening music
      </li>
      <li>
        favourite style ...
      </li>
      <li>
        {{ $store.getters.isOnline }}
      </li>
    </ul>
  </main>
</template>

<script>
  export default {
    name: 'user',
    mounted: function() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('login')
      }
    }
  }
</script>

