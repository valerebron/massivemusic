<template>
  <div id="home" class="row">
    <div v-for="post in posts" :key="post._id" class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
      <erudi_link :post="post" />
    </div>
    <erudi_add @postSaved="pushPost($event)" />
  </div>
</template>

<script>
  import axios from 'axios'
  import erudi_add from './erudi_add.vue'
  import erudi_link from './erudi_link.vue'

  export default {
    name: 'home',
    components: {
      erudi_add,
      erudi_link
    },
    data: function () {
      return {
        posts: '',
        newPost: ''
      }
    },
    methods: {
      listPost: function() {
        this.$emit('pageLoading')
        this.$data['posts'] = ''
        axios
        .get(window.APIURL+'/posts')
        .then(response => {
          this.$data['posts'] = response.data
          this.$emit('pageFinishLoading')
        })
      },
      pushPost: function(newPost) {
        this.posts.splice(0, 0, newPost)
      },
      searchPost: function() {
        this.$emit('pageLoading')
        this.$data['posts'] = ''
        axios
        .get(window.APIURL+'/posts/s/you')
        .then(response => {
          this.$data['posts'] = response.data
          this.$emit('pageFinishLoading')
        })
      }
    },
    mounted () {
      this.listPost()
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          // new Notification('Hi home!')
        }
      })
      this.searchPost()
    }
  }
</script>

<style lang="scss">
  @import '../scss/main.scss';
  #home {
    justify-content: center;
  }
</style>
