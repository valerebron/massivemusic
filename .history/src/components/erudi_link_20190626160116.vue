<template>
  <article class="link" :class="[ isYoutubeLink(post.post_link) ? 'link--video' : '']" :data-id="post._id">
    <a v-if="isYoutubeLink(post.post_link)" class="link__a" href="#">
      <iframe class="link__video-embed" :src="getYoutubeEmbedUrl(post.post_link)" allowfullscreen></iframe>
      <img v-if="post.post_image" class="link__image" :src="post.post_image" alt="">
      <p v-else>
        {{ post.post_title }}
      </p>
    </a>

    <a v-else-if="origin === 'page_post'" class="link__a" :href="post.post_link" target="_blank">
      <img v-if="post.post_image" class="link__image" :src="post.post_image" alt="">
      <p v-else>
        {{ post.post_title }}
      </p>
    </a>

    <router-link v-else class="link__a" :to="'/post-'+post._id">
      <img v-if="post.post_image" class="link__image" :src="post.post_image" alt="">
      <p v-else>
        {{ post.post_title }}
      </p>
    </router-link>

    <footer class="link__footer">
      <router-link v-if="post.post_tag" :to="'/'+post.post_tag" class="link__tag">
        {{ post.post_tag }}
      </router-link>
      <router-link :to="'/post-'+post._id">
        <p class="link__description">
          {{ post.post_description }}
        </p>
        <div class="link__title">
          {{ post.post_title }}
        </div>
      </router-link>
      <time class="link__time" :datetime="post.post_timestamp">
        {{ this.time }}
      </time>
      <router-link class="link__comment" :to="'/post-'+post._id">
        <commentSvg class="link__comment__svg" />
        <span class="link__comment__nb">
          {{ this.nb_comments }}
        </span>
      </router-link>
    </footer>
    <slot name="editform"></slot>
  </article>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import commentSvg from '../assets/comment.svg'
  export default {
    name: 'erudi_link',
    components: {
      commentSvg
    },
    data: function() {
      return {
        nb_comments: ''
      }
    },
    props: ['post', 'origin'],
    methods: {
      getURLParameter: function(url) {
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1)
        var obj = {}
        if (queryString) {
          queryString = queryString.split('#')[0]
          var arr = queryString.split('&')
          for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=')
            var paramName = a[0]
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1]
            if (paramName.match(/\[(\d+)?\]$/)) {
              var key = paramName.replace(/\[(\d+)?\]/, '')
              if (!obj[key]) obj[key] = []
              if (paramName.match(/\[\d+\]$/)) {
                var index = /\[(\d+)\]/.exec(paramName)[1]
                obj[key][index] = paramValue
              } else {
                obj[key].push(paramValue)
              }
            } else {
              if (!obj[paramName]) {
                obj[paramName] = paramValue
              } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                obj[paramName] = [obj[paramName]]
                obj[paramName].push(paramValue)
              } else {
                obj[paramName].push(paramValue)
              }
            }
          }
        }
        return obj
      },
      getYoutubeEmbedUrl: function(url) {
        let ytid = ''
        if(url.indexOf('youtube.com') > 0 || url.indexOf('youtu.be') > 0) {
          if(url.indexOf('youtube.com') > 0) {
            ytid = this.getURLParameter(url).v
          }
          else if(url.indexOf('youtu.be') > 0) {
            let urlSplited = url.split('/')
            ytid = urlSplited[urlSplited.length - 1]
          }
          return 'https://www.youtube.com/embed/'+ytid
        }
      },
      isYoutubeLink: function(url) {
        if(url.indexOf('youtube.com') > 0 || url.indexOf('youtu.be') > 0) {
          return true
        }
        else {
          return false
        }
      },
    },
    computed: {
      time: function() {
        moment.locale('fr')
        return moment(this.post.post_timestamp, 'x').fromNow()
      }
    },
    mounted: function() {
      axios
      .get(window.APIURL+'/comments/count/'+this.post._id)
      .then((mongoResp) => {
        if(mongoResp.data > 0) {
          this.nb_comments = mongoResp.data
        }
      })
    }
  }
</script>

<style lang="scss">
  @import '../scss/main.scss';
  .link {
    box-shadow: 0 0 3px grey;
    margin-bottom: 30px;
    position: relative;
    z-index: 10;
    &:hover {
      .link__image {
        transform: scale(1.05);
      }
      .link__a {
        font-size: 30px;
      }
      .link__footer {
        color: white;
        background-color: black;
      }
      .link__description {
        color: white;
      }
      .link__comment svg path {
        fill: white;
      }
      .link__comment__nb {
        color: black;
      }
    }
    &--video {
      .link__a {
        background-color: black!important;
      }
      .link__image {
        pointer-events: none;
      }
      &:hover {
        .link__image {
          opacity: 0;
        }
      }
    }
    &__video-embed {
      position: absolute;
      left: 0;
      width: 100%;
      height: 50%;
      border: none;
      z-index: 0;
    }
    &__a {
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 180px;
      text-decoration: none;
      overflow: hidden;
      text-decoration: none;
      color: black;
      font-size: 28px;
      font-weight: bold;
      text-transform: uppercase;
      transition: 0.3s background-color;
      transition: 0.3s font-size;
      &:hover {
        text-decoration: none;
        color: black;
      }
    }
    &__videoSvg {
      position: absolute;
      width: 20%;
      height: auto;
      bottom: 10px;
      right: 10px;
      z-index: $indexVideoIcon;
    }
    &__image {
      opacity: 1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: 0.3s all;
    }
    &__time {
      align-self: flex-start;
      display: inline-block;
      font-size: 11px;
      font-weight: 300;
      color: grey;
      padding: 10px 20px;
      position: relative;
    }
    &__title {
      font-size: 14px;
      font-weight: 600;
      font-style: italic;
      color: grey;
      display: block;
      text-align: left;
      padding: 10px 20px 0 20px;
    }
    &__tag {
      background-color: black;
      color: white;
      align-self: flex-end;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
      padding: 0 14px;
      height: 24px;
      margin-top: -12px;
      z-index: $indexTags;
      &::before {
        content: '#';
        padding: 0 2px;
        font-weight: normal;
        font-size: 14px;
      }
      &:hover {
        color: white;
        text-decoration: none;
      }
    }
    &__footer {
      display: flex;
      flex-direction: column;
      background-color: white;
      border-top: 1px dashed black;
      padding-bottom: 6px;
      transition: all 0.3s;
    }
    &__description {
      text-transform: uppercase;
      font-weight: bold;
      color: black;
      font-size: 14px;
      text-align: left;
      padding: 10px 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      max-height: 180px;
    }
    &__comment {
      position: absolute;
      bottom: 8px;
      right: 8px;
      opacity: 0.5;
      transition: all 0.3s;
      color: white;
      &:hover {
        opacity: 1;
        text-decoration: none;
        color: white;
      }
      &__nb {
        position: absolute;
        left: 0;
        width: 100%;
        font-size: 14px;
        line-height: 22px;
        font-weight: bold;
      }

      .erudi-post & {
        display: none;
      }
    }
  }
</style>
