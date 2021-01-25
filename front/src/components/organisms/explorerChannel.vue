<template>
  <ul class="explorer" :class="{ 'explorer--init' : channels.length === 0 }">
    <li class="explorer__search">
      <loader class="explorer__loader"  v-if="isLoading"/>
      <icon-youtube class="explorer__ytlogo" />
      <input
        class="explorer__search-input"
        v-model="query"
        type="search"
        placeholder="search channels on youtube"
        @keydown.enter="search(); $event.target.blur()"
      />
    </li>
    <li class="typo-center" v-if="didyoumean !== '' && didyoumean" @click="didyoumeanSearch">
      <button>
        Did you mean : <b> {{ didyoumean }}</b> ?
      </button>
    </li>
    <li v-for="(channel, index) in channels" class="channel" :key="index" @click="send(channel)">
      <img @error="'/avatars/0-100px.png'" class="avatar avatar--medium" :src="channel.channel_avatar_medium" />
      <div>
        <h3 class="channel__name">
          {{ channel.name }}
          <icon-valid v-if="channel.official" class="channel__official" />
        </h3>
        <em class="channel__infos">
          {{ channel.nb_videos }} videos -
          {{ channel.nb_subscriber }} abonnées
        </em>
      </div>
      <a class="channel__link" :href="'https://youtube.com/channel/'+channel.channel_id+'/videos'" target="_blank">
        see channel page
        <icon-exit />
      </a>
    </li>
    <li>
      <!-- <button class="explorer__more" @click="more" v-if="query !== ''">more</button> -->
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
        didyoumean: '',
      }
    },
    computed: {
      input: function() {
        return document.getElementsByClassName('explorer__search-input')[0]
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
                didyoumean,
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
            this.didyoumean = (res.data.searchChannel ? res.data.searchChannel.didyoumean : '')
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
      },
      didyoumeanSearch() {
        this.query = this.didyoumean
        this.search()
      },
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
    &__link {
      text-decoration: underline;
    }
    > * {
      padding: 2px 6px;
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
  }
</style>
