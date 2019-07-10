<template>
  <main :class="currentState">
    <section class="yt-player">
      <youtube ref="yt" :playerVars="playerVars" @ready="playerReady" @state-change="updatePlayerState"></youtube>
      {{ currentState }}
      {{ tracksState }}
      <progress :value="currentProgress" max="100" @click="seekPlayer"></progress>
      <progress :value="currentBuffer" max="100"></progress>
      <button @click="togglePlay">Play/Pause</button>
      <button @click="playPrev">Prev</button>
      <button @click="playNext">Next</button>
      <button @click="toggleVolume">Mute</button>
      <input type="range" min="0" max="100" :value="currentVolume" @input="updatePlayerVolume">
      {{ currentTime }} / {{ totalTime }}
    </section>
    <section :class="tracksState" class="tracks">
      <input type="search" @input="search($event.target.value)">
      {{ tracks.length }}
      <article class="track" v-for="track in tracks" @click="play(track.id_yt)" :data-id="track.id_yt" :key="track.id_yt">
        {{ track.title.slice(-3, -3) }}
        {{ track.artist }}
        {{ track.style }}
      </article>
    </section>
  </main>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'yt-player',
    data() {
      return {
        playerVars: {height: '0'},
        totalTime: 0,
        currentTime: 0,
        currentStateId: 0,
        currentProgress: 0,
        currentBuffer: 0,
        currentVolume: 0,
        currentYtid: '',
        tracks: {},
        tracksState: '',
      }
    },
    computed: {
      player() {
        return this.$refs.yt.player
      },
      currentState() {
        switch(this.currentStateId) {
          case -1:
            return 'unstarted'
          case 0:
            return 'ended'
          case 1:
            return 'playing'
          case 2:
            return 'paused'
          case 3:
            return 'buffering'
          case 5:
            return 'video-cued'
          default:
            return ''
        }
      },
    },
    methods: {
      formatTime(time) {
        time = Math.round(time)
        let minutes = Math.floor(time / 60),
        seconds = parseInt(time - minutes * 60)
        seconds = seconds < 10 ? '0' + seconds : seconds
        return minutes + ":" + seconds
      },
      updatePlayerState() {
        this.currentStateId = this.player.getPlayerState()
      },
      updatePlayerTime() {
        this.currentTime = this.formatTime(this.player.getCurrentTime())
        this.totalTime = this.formatTime(this.player.getDuration())
      },
      updatePlayerProgress() {
        this.currentProgress = (this.player.getCurrentTime() / this.player.getDuration()) * 100
      },
      updatePlayerBuffer() {
        this.currentBuffer = (this.player.getVideoLoadedFraction() * 100)
      },
      updatePlayerVolume(e) {
        this.player.setVolume(e.target.value)
        this.currentVolume = e.target.value
      },
      initPlayerVolume() {
        this.currentVolume = this.player.getVolume()
      },
      seekPlayer(e) {
        let percent = ((e.x - e.target.offsetLeft) / e.target.offsetWidth) * 100
        let duration = this.player.getDuration()
        let seekToSecond = (percent * duration) / 100

        this.currentProgress = percent
        this.player.seekTo(seekToSecond)
      },
      togglePlay() {
        if(this.player.getPlayerState() == 1) {
          this.player.pauseVideo()
        }
        else {
          this.player.playVideo()
        }
      },
      toggleVolume() {
        if(this.player.isMuted()) {
          this.player.unMute()
        }
        else {
          this.player.mute()
        }
      },
      play(id) {
        if(this.currentYtid == id) {
          this.togglePlay()
        }
        else {
          this.player.loadVideoById(id)
          this.currentYtid = id
          if(document.querySelector('.track--playing') !== null) {
            document.querySelector('.track--playing').classList.remove('track--playing')
          }
          document.querySelector('[data-id="'+id+'"]').classList.add('track--playing')
        }
      },
      playPrev() {
        let currentTrack = document.querySelector('[data-id="'+this.currentYtid+'"]')
        if(currentTrack.previousSibling) {
          let prevId = currentTrack.previousSibling.getAttribute('data-id')
          if(prevId) {
            this.play(prevId)
          }
        }
      },
      playNext() {
        let currentTrack = document.querySelector('[data-id="'+this.currentYtid+'"]')
        if(currentTrack.nextSibling) {
          let nextId = currentTrack.nextSibling.getAttribute('data-id')
          if(nextId) {
            this.play(nextId)
          }
        }
      },
      playerReady() {
        this.initPlayerVolume()
        setInterval(function() {
          this.updatePlayerTime()
          this.updatePlayerProgress()
          this.updatePlayerBuffer()
        }.bind(this), 500)
      },
      search(query) {
        // all tracks
        if(query == 'all' || query == '') {
          this.tracksState = 'loading'
          axios
            .get(window.APIURL+'/tracks')
            .then((res) => {
              this.tracks = res.data
              this.tracksState = ''
            })
        }
        else {
          // found track(s)
          this.tracksState = 'loading'
          axios
            .get(window.APIURL+'/tracks/s/'+query)
            .then((res) => {
              this.tracks = res.data
              this.tracksState = ''
            })
        }
      }
    },
    mounted: function() {
      this.search('all')
    },
  }
</script>

<style lang="scss">
  .tracks {
    background-color: black;
    color: white;
  }
  .track {
    &--playing {
      color: red;
    }
  }
</style>
