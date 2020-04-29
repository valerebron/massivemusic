<template>
  <main class="user page--container">
    <div>
      <figure class="user-list">
        <img :src="gravatar" />
        <figcaption class="user-list__captions">
          <h1>{{ user.name }}</h1>
          <h2>{{ user.email }}</h2>
          <h3><b>{{ user.tracks.length }}</b> track(s) added</h3>
          <h4>subscribed {{ Date.parse(user.createdAt) | moment('from', 'now') }}</h4>
          <h5>last login {{ Date.parse(user.updatedAt) | moment('from', 'now') }}</h5>
        </figcaption>
      </figure>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'user',
    computed: {
      user: {
        get() { return this.$store.getters.session.user },
      },
      gravatar: {
        get() { return this.$store.getters.myGravatar },
      },
    },
    mounted: function() {
      if(!this.$store.getters.isOnline) {
        this.$router.push('login')
      }
    }
  }
</script>

<style lang="scss">
  .user-list {
    display: flex;
    flex-direction: row;
    padding-top: 10vh;
    &__captions {
      padding-left: 12px;
    }
  }
</style>