<template>
  <ul class="track-explorer">
    <li class="track-explorer__search">
      <loader class="track-explorer__loader" :isLoading="isLoading"/>
      <input
        class="track-explorer__search-input"
        v-model="query"
        type="search"
        placeholder="search tracks on youtube"
        @keydown.enter="search()"
      />
    </li>
    <li
      v-for="(track, index) in tracks"
      class="track"
      :class="track.id"
      @click="send(track)"
      :key="index"
    >
      <div class="typo-center" v-if="track.id === 'didyoumean'">
        Did you mean : <b> {{ track.title }}</b> ?
      </div>
      <template v-else>
        <span class="track__index">{{ index + 1 }}</span>
        <figure class="track__thumb">
          <img
            class="track__thumb__pic"
            :src="'https://i.ytimg.com/vi/'+track.id+'/mqdefault.jpg'"
          />
          <figcaption class="track__thumb__cap">
            {{ formatSeconds(track.duration) }}
          </figcaption>
        </figure>
        <span class="track__artist typo-one-line">{{ track.artist }}</span>
        <span class="track__title typo-one-line">{{ track.title }}</span>
        <span class="track__createdAt typo-one-line">{{ track.publishedAt }}</span>
      </template>
    </li>
    <!-- <li>
      <button class="track-explorer__more" @click="more()" v-if="query !== ''">more</button>
    </li> -->
  </ul>
</template>

<script>
  import gql from 'graphql-tag'
  import loader from '@/components/atoms/loader.vue'
  export default {
    name: 'explorerTrack',
    components: {
      loader
    },
    props: {
      initQuery: {
        type: String,
        default: '',
      }
    },
    data: function() {
      return {
        tracks: [],
        query: '',
        token: '',
        isNewQuery: false,
        isLoading: false,
      }
    },
    computed: {
      input: function() {
        return document.getElementsByClassName('track-explorer__search-input')[0]
      },
    },
    methods: {
      formatSeconds(seconds) {
        let min = parseInt(seconds / 60)
        let sec = parseInt(seconds % 60)
        sec = sec < 10 ? '0' + sec : sec
        // min = (min < 10 ? '0'+min : min)
        return min + ':' + sec
      },
      getTracks: function() {
        this.isLoading = true
        if(this.query !== '') {
          this.$apollo.query({
            variables: {
              search: this.query,
              token: this.token,
            },
            query: gql`query($search: String!, $token: String) {
              searchTrack(search: $search, token: $token) {
                tracks {
                  id
                  title
                  artist
                  duration
                  publishedAt
                }
                token
              }
            }`,
          }).then((res) => {
            if(this.token === '') {
              this.tracks = (res.data.searchTrack ? res.data.searchTrack.tracks : [])
            }
            else {
              this.tracks.concat(res.data.searchTrack.tracks)
              console.log(res.data.searchTrack.tracks[0].id)
              console.log(this.tracks)
            }
            this.token = (res.data.searchTrack.token ? res.data.searchTrack.token : [])
            window.scroll(0,0)
            this.isLoading = false
          }).catch((error) => {
            console.log('%c●', 'color: red', 'youtube search track error: ', error)
          })
        }
        else {
          this.tracks = []
          window.scroll(0,0)
          this.isLoading = false
        }
      },
      search: function() {
        this.tracks = []
        this.token = ''
        this.getTracks()
      },
      more: function() {
        this.getTracks()
      },
      send(track) {
        if(track.id === 'didyoumean') {
          this.query = track.title
          this.search()
        }
        else {
          this.$emit('clickOnTrack', track)
        }
      }
    },
    mounted: function() {
      this.input.focus()
      if(this.initQuery !== '') {
        this.query = this.initQuery
        this.search()
      }
    }
  }
</script>

<style lang="scss">
  .track-explorer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 0;
    padding-left: 0;
    list-style-type: none;
    &__search {
      z-index: $z-index-header-elt;
      position: sticky;
      top: $header-height;
    }
    &__search-input {
      width: 100%;
      height: $explorer-search-height;
      border-bottom: 1px darken($youtube-red, 30%) solid;
      background-color: $app-bkg;
      margin: 0;
      text-align: center;
      font-size: 26px;
      font-weight: bold;
    }
    .loader {
      position: absolute;
      top: 0;
      width: $search-height;
      height: 100%;
      stroke: $youtube-red;
      z-index: $z-index-header-elt;
    }
    &__more {
      width: 100%;
      text-transform: uppercase;
    }
    .track {
      cursor: pointer;
      display: flex;
      align-items: center;
      overflow: hidden;
      border-bottom: 1px rgba(255, 255, 255, 0.1) solid;
      transition: all 0.2s;
      height: 50px;
      padding: 4px 0;
      background-color: $app-bkg;
      &:hover {
        background-color: $color-selection;
      }
      > * {
        padding: 2px 6px;
      }
      &__index,
      &__title {
        color: white;
      }
      &__artist {
        font-weight: bold;
        &:hover {
          text-decoration: none;
        }
      }
      &__thumb {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &__pic {
          width: 60px;
        }
        &__cap {
          position: absolute;
          color: white;
          font-size: 12px;
          background-color: rgba(0, 0, 0, 0.74);
          border-radius: 14px;
          padding: 2px 6px;
        }
      }
    }
  }
</style>