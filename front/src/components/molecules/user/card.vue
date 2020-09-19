<template>
  <address class="card">
    <figure class="card__figure">
      <router-link :to="'/user/'+user.id+'/profile'">
        <avatar class="card__avatar" :user="user" size="medium" />
        <router-link :to="'/user/'+user.id+'/tracks'" class="card__nb-track" v-if="user.tracks && user.tracks.length !== 0">
          {{ user.tracks.length }}
          <icon-youtube v-if="user.role === 'ROBOT'" />
        </router-link>
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
    &__nb-track {
      background-color: beige;
      color: black;
      border-radius: 16px;
      padding: 2px 4px;
      font-size: 12px;
    }
  }
</style>