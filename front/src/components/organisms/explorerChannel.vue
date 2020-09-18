<template>
  <ul class="channel-explorer">
    <li class="channel-explorer__search">
      <loader class="channel-explorer__loader" :isLoading="isLoading"/>
      <input
        class="channel-explorer__search-input"
        v-model="query"
        type="search"
        placeholder="search channels on youtube"
        @keydown.enter="search"
      />
    </li>
    <li v-for="(channel, index) in channels" class="channel" :key="index" @click="send(channel)">
      <div class="typo-center" v-if="channel.channel_id === 'didyoumean'">
        Did you mean : <b> {{ channel.name }}</b> ?
      </div>
      <template v-else>
        <img class="avatar avatar--medium" :src="channel.channel_avatar_medium" />
        <div>
          <h3 class="channel__name">
            {{ channel.name }}
            <icon-valid v-if="channel.official" class="channel-explorer__official" />
          </h3>
          <em class="channel__infos">
            {{ channel.nb_videos }} videos -
            {{ channel.nb_subscriber }} abonnées
          </em>
        </div>
        <a class="channel__link" :href="'https://youtube.com/channel/'+channel.channel_id+'/videos'" target="_blank">
          see channel page
        </a>
      </template>
    </li>
    <li>
      <!-- <button class="channel-explorer__more" @click="more" v-if="query !== ''">more</button> -->
    </li>
  </ul>
</template>

<script>
  import gql from 'graphql-tag'
  import loader from '@/components/atoms/loader.vue'
  export default {
    name: 'explorerYoutube',
    components: {
      loader,
    },
    props: {
      initQuery: {
        type: String,
        default: '',
      }
    },
    data: function() {
      return {
        channels: [],
        query: '',
        isNewQuery: false,
        isLoading: false,
      }
    },
    computed: {
      input: function() {
        return document.getElementsByClassName('channel-explorer__search-input')[0]
      },
    },
    methods: {
      search: function() {
        this.isLoading = true
        if(this.query !== '') {
          this.$apollo.query({
            variables: {
              search: this.query,
            },
            query: gql`query($search: String!) {
              searchChannel(search: $search){
                token,
                channels {
                  name
                  channel_id
                  nb_videos
                  nb_subscriber
                  official
                  channel_avatar_small
                  channel_avatar_medium
                }
              }
            }`,
          }).then((res) => {
            this.channels = (res.data.searchChannel ? res.data.searchChannel.channels : [])
            window.scroll(0,0)
            this.isLoading = false
          }).catch((error) => {
            console.log('%c●', 'color: red', 'youtube channel error: ', error)
          })
        }
        else {
          this.channels = []
          window.scroll(0,0)
          this.isLoading = false
        }
      },
      async send(channel) {
        this.isLoading = true
        if(channel.channel_id === 'didyoumean') {
          this.query = channel.name
          await this.search()
          this.isLoading = false
        }
        else {
          let res = await this.$apollo.query({
            variables: {
              id: channel.channel_id,
            },
            query: gql`query($id: String) {
              getChannelDesc(id: $id)
            }`,
          }).catch((error) => {
            console.log('%c●', 'color: red', 'youtube get desc error: ', error)
          })
          channel.channel_description = res.data.getChannelDesc
          channel.role = 'ROBOT'
          this.$emit('clickOnChannel', channel)
          this.isLoading = false
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
  .channel-explorer {
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
    &__official {
      background-color: $validate-color;
      border-radius: 20px;
      padding: 2px;
      margin-left: 20px;
      height: 14px;
      width: 14px;
      svg {
        margin-top: -2px;
      }
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
    .channel {
      cursor: pointer;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      overflow: hidden;
      border-bottom: 1px rgba(255, 255, 255, 0.1) solid;
      transition: all 0.2s;
      padding: 4px 0;
      background-color: $app-bkg;
      &:hover {
        background-color: $color-selection;
      }
      &__name {
        flex-grow: 1;
        margin: 0;
        padding: 40px;
      }
      &__name, &__link {
        display: flex;
        align-items: center;
      }
      > * {
        padding: 2px 6px;
      }
    }
  }
</style>