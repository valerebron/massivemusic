<template>
  <ul class="youtube-explorer">
    <li class="youtube-explorer__search">
      <loader class="youtube-explorer__loader" :class="{ loading : isLoading }"/>
      <input
        class="youtube-explorer__search-input"
        v-model="query"
        type="search"
        placeholder="search tracks on youtube"
        @keydown.enter="search"
      />
    </li>
    <li
      v-for="(track, index) in tracks"
      class="track"
      :class="track.videoId"
      :key="index"
      @click="send(track)"
    >
      <span class="track__index">{{ index + 1 }}</span>
      <figure class="track__thumb">
        <img
          class="track__thumb__pic"
          :src="'https://tube.osrp.xyz/vi/'+track.videoId+'/mqdefault.jpg'"
          :alt="track.description"
        />
        <figcaption class="track__thumb__cap">{{ formatSeconds(track.lengthSeconds) }}</figcaption>
      </figure>
      <template v-if="track.artist !== '' && track.title != ''">
        <span class="track__artist typo-one-line">{{ track.artist }}</span>
        <span class="track__title typo-one-line">{{ track._title }}</span>
      </template>
      <span v-else class="track__title typo-one-line">
        {{ track.description }}
      </span>
    </li>
    <li>
      <button class="youtube-explorer__more" @click="more" v-if="query !== ''">more</button>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
import loader from '../../assets/icon-loader.vue'
export default {
  name: 'youtubeExplorer',
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
      endpoint: 'https://tube.osrp.xyz/api/v1/search?sort_by=relevance',
      tracksRaw: [],
      page: 1,
      query: '',
      isNewQuery: false,
      isLoading: false,
      tracksFormated: [],
      separator: [
        '-',
        '–',
      ],
      forbiddenWords: [
        ' (Original Mix)',
        ' (Official Video)',
      ],
    }
  },
  computed: {
    input: function() {
      return document.getElementsByClassName('youtube-explorer__search-input')[0]
    },
    tracks: function() {
      let tracks = this.tracksRaw
        .filter(track => track.lengthSeconds < 1200)
        .map(track => {
          track.description = track.title
          if(track.title.split(' - ').length === 1) {
            track._title = ''
            track.artist = ''
          }
          else {
            track._title = track.description.split(' - ')[1]
            track.artist = track.description.split(' - ')[0]
          }
          track.duration = track.lengthSeconds,
          track.id = track.videoId
          track.style = 11
          return track
        })
        return tracks
    }
  },
  methods: {
    formatSeconds(seconds) {
      let min = parseInt(seconds / 60)
      let sec = parseInt(seconds % 60)
      sec = sec < 10 ? '0' + sec : sec
      // min = (min < 10 ? '0'+min : min)
      return min + ':' + sec
    },
    search: function() {
      this.isLoading = true
      this.page = 1
      let url = this.endpoint + '&q=' + this.query + '&page=' + this.page
      axios.get(url).then(response => {
        this.tracksRaw = ''
        this.tracksRaw = response.data
        window.scroll(0,0)
        this.isLoading = false
      })
    },
    more: function() {
      this.isLoading = true
      this.page = this.page + 1
      let url = this.endpoint + '&q=' + this.query + '&page=' + this.page
      axios.get(url).then(response => {
        this.tracksRaw = this.tracksRaw.concat(response.data)
        this.isLoading = false
      })
    },
    send(track) {
      track.title = track._title
      this.$emit('clickOnTrack', track)
    }
  },
  mounted: function() {
    this.input.focus()
    if(this.initQuery !== '') {
      this.query = this.initQuery
      this.search()
    }
  }
};
</script>

<style lang="scss">
.youtube-explorer {
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
    height: $youtube-explorer-search-height;
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
    &.loading {
      opacity: 1;
    }
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
