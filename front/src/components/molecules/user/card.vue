<template>
  <address class="card">
    <figure class="card__figure">
      <router-link class="card__link" :to="'/user/'+user.id+'/profile'">
        <avatar class="card__avatar" :user="user" size="medium" />
        <router-link :to="'/user/'+user.id+'/tracks'" class="card__nb-track" :class="'style-bkg-'+user.channel_style" v-if="user.tracks && user.tracks.length !== 0">
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
    display: table;
    border-radius: 26px;
    margin: 10px;
    &__link {
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all .3s;
      &:hover {
        .card__avatar {
          box-shadow: white 0 0 4px;
        }
        .card__name {
          text-decoration: underline;
        }
      }
      &:active {
        position: relative;
        top: 2px;
      }
    }
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
      display: flex;
      align-items: center;
      font-weight: bold;
      background-color: beige;
      color: black;
      border-radius: 16px;
      padding: 2px 4px;
      font-size: 12px;
      margin-top: -10px;
      .ion {
        margin-left: 4px;
      }
      &:hover {
        text-decoration: none!important;
        box-shadow: white 0 0 4px;
      }
    }
  }
</style>