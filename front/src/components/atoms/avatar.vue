<template>
  <img
    :class="'avatar avatar--'+size"
    :src="imgUrl"
    :alt="user.name"
    @load="isLoaded = true"
    @error="setDefaultImage($event)"
    @click="$emit('click')"
    v-show="isLoaded"
  />
</template>

<script>
export default {
  name: 'avatar',
  props: ['user', 'size'],
  data: function() {
    return {
      isLoaded: false,
    }
  },
  computed: {
    imgUrl: function() {
      let url = ''
      if(this.user.role) {
        if(this.user.role === 'ROBOT') {
          if(this.size === 'small') {
            url = this.user.channel_avatar_small
          }
          if(this.size === 'medium') {
            url = this.user.channel_avatar_medium
          }
          if(this.size === 'big') {
            url = this.user.channel_avatar_medium
          }
        }
        else {
          if(this.size === 'small') {
            url = '/avatars/'+this.user.id+'-30px.png'
          }
          if(this.size === 'medium') {
            url = '/avatars/'+this.user.id+'-100px.png'
          }
          if(this.size === 'big') {
            url = '/avatars/'+this.user.id+'-300px.png'
          }
        }
      }
      else {
        url = this.user
      }
      return url
    }
  },
  methods: {
    setDefaultImage: function (e) {
      let src = ''
      switch(this.size) {
        case 'small': src = '/avatars/0-30px.png'
        break
        case 'medium': src = '/avatars/0-100px.png'
        break
        case 'big': src = '/avatars/0-300px.png'
        break
      }
      e.target.setAttribute('src', src)
    }
  },
}
</script>

<style lang="scss">
.avatar {
  border-radius: 100%;
  object-fit: cover;
  &--small {
    width: 30px;
    height: 30px;
  }
  &--medium {
    width: 100px;
    height: 100px;
  }
  &--big {
    width: 300px;
    height: 300px;
  }
}
</style>
