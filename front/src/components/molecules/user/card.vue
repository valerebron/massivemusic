<template>
  <address class="card">
    <figure class="card__figure">
      <router-link :to="'/user/'+user.id+'/profile'">
        <avatar class="card__avatar" :user="user" size="medium" />
        <h4 class="card__name">{{ user.name }}</h4>
      </router-link>
    </figure>
  </address>
</template>

<script>
  import avatar from '@/components/atoms/avatar'
  export default {
    name: 'user-card',
    components: { avatar, },
    props: ['user'],
  }
</script>

<style lang="scss">
  .card {
    float: left;
    border-radius: 26px;
    margin: 10px;
    &__figure {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      text-align: center;
    }
    &__avatar {
      width: 100px;
      height: 100px;
      border-radius: 300px;
    }
    &__name {
      font-style: normal;
    }
  }
</style>