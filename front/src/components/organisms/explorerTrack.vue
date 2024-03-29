<template>
  <ul class="explorer" :class="{ 'explorer--init' : tracks.length === 0 }">
    <li class="explorer__search">
      <loader class="explorer__loader" v-if="isLoading"/>
      <icon-youtube class="explorer__ytlogo" />
      <input
        class="explorer__search-input"
        v-model="query"
        type="search"
        placeholder="search tracks on youtube"
        @keydown.enter="search(); $event.target.blur()"
      />
    </li>
    <li class="typo-center" v-if="didyoumean !== '' && didyoumean && input.value !== '' && !isLoading" @click="didyoumeanSearch">
      <button>
        Did you mean : <b> {{ didyoumean }}</b> ?
      </button>
    </li>
    <li
      v-for="(track, index) in tracks"
      class="track"
      :class="track.id"
      @click="send(track)"
      :key="index"
    >
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
      <span class="track__createdAt typo-one-line">
        {{ parseInt(track.publishedAt / 1000) | moment('from', true) }}
      </span>
    </li>
    <li>
      <button class="explorer__more" @click="getTracks()" v-if="tracks.length > 0">more</button>
    </li>
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
      },
      focusOnMounted: {
        type: Boolean,
        default: false
      },
    },
    data: function() {
      return {
        tracks: [],
        query: '',
        token: '',
        apikey: '',
        isNewQuery: false,
        isLoading: false,
        didyoumean: '',
      }
    },
    computed: {
      input: function() {
        return document.getElementsByClassName('explorer__search-input')[0]
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
              apikey: this.apikey,
            },
            query: gql`query($search: String!, $token: String, $apikey: String) {
              searchTrack(search: $search, token: $token, apikey: $apikey) {
                videos {
                  id
                  title
                  artist
                  duration
                  publishedAt
                }
                token
                apikey
                didyoumean
              }
            }`,
          }).then((res) => {
            if(this.token === '') {
              this.tracks = (res.data.searchTrack.videos[0].duration ? res.data.searchTrack.videos : [])
              this.didyoumean = (res.data.searchTrack ? res.data.searchTrack.didyoumean : '')
            }
            else {
              this.tracks = this.tracks.concat(res.data.searchTrack.videos)
            }
            this.token = (res.data.searchTrack.token ? res.data.searchTrack.token : '')
            this.apikey = (res.data.searchTrack.apikey ? res.data.searchTrack.apikey : '')
            this.isLoading = false
          }).catch((error) => {
            console.log('%c●', 'color: red', 'youtube search track error: ', error)
          })
        }
        else {
          this.tracks = []
          this.isLoading = false
        }
      },
      search: function() {
        this.tracks = []
        this.token = ''
        this.getTracks()
      },
      send(track) {
        if(track) {
          this.$emit('clickOnTrack', track)
        }
      },
      didyoumeanSearch() {
        this.query = this.didyoumean
        this.search()
      },
    },
    mounted: function() {
      if(this.focusOnMounted) {
        this.input.focus()
      }
      if(this.initQuery !== '') {
        this.query = this.initQuery
        this.search()
      }
    },
  }
</script>

<style lang="scss" scoped>
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
      color: $app-color;
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
        color: $app-color;
        font-size: 12px;
        background-color: rgba(0, 0, 0, 0.74);
        border-radius: 14px;
        padding: 2px 6px;
      }
    }
    &__createdAt {
      flex-grow: 1;
      text-align: right;
    }
  }
</style>
