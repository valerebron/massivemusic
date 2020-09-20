<template>
  <img :class="'avatar avatar--'+size" :src="img_url" :alt="user.name" @error="setDefaultImage($event)"/>
</template>

<script>
export default {
  name: 'avatar',
  props: ['user', 'size'],
  computed: {
    img_url: function() {
      let url = ''
      if(this.user.role === 'ROBOT') {
        if(this.size === 'small') {
          url =this.user.channel_avatar_small
        }
        if(this.size === 'medium') {
          url =this.user.channel_avatar_medium
        }
        if(this.size === 'big') {
          url =this.user.channel_avatar_medium
        }
      }
      else {
        if(this.size === 'small') {
          url ='/avatars/'+this.user.id+'-30px.png'
        }
        if(this.size === 'medium') {
          url ='/avatars/'+this.user.id+'-100px.png'
        }
        if(this.size === 'big') {
          url ='/avatars/'+this.user.id+'-300px.png'
        }
      }
      return url
    }
  },
  methods: {
    setDefaultImage: function (e) {
      let src = ''
      switch(this.size) {
        case 'samll': src = '/avatars/0-30px.png'
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
  border-radius: 300px;
  &--small {
    max-width: 30px;
    max-height: 30px;
  }
  &--medium {
    max-width: 100px;
    max-height: 100px;
  }
  &--big {
    max-width: 300px;
    max-height: 300px;
  }
}
</style>
