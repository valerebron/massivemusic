<template>
  <main class="test page--container">
    <div>
      <p class="tester">
        <button class="testButton" @click="test">TEST</button>
        <b>tested</b>
        {{ tested_count }}
        <b>Invalid</b>
        {{ invalidated_count }}
        <template v-if="time_elapsed > 0">
          <b>E.T.A.</b>
          {{ ETA }}
        </template>
      </p>
      <tracks :filter="{ type: '', value: '' }"/>
    </div>
  </main>
</template>

<script>
  import tracks from '../elements/tracks.vue'
  export default {
    name: 'test',
    components: {
      tracks
    },
    data: function() {
      return {
        tested_count: 0,
        invalidated_count: 0,
        time_elapsed: 0,
      }
    },
    computed: {
      averageTimePerTrack: {
        get() {
          return this.time_elapsed / this.tested_count
        }
      },
      ETA: {
        get(){
          let sec = (this.$store.getters.count - this.tested_count) * this.averageTimePerTrack
          let hours = Math.floor(sec / 3600)
          sec %= 3600
          let minutes = Math.floor(sec / 60)
          sec = sec % 60
          return hours + 'h ' + minutes + 'm ' + Math.floor(sec) + 's'
        }
      },
    },
    mounted: function() {
      this.$store.dispatch('filterTracks', {type: 'reset', value: Date.now()})
      if(!this.$store.getters.isOnline) {
        this.$router.push('login')
      }
    },
    methods: {
      test: function() {
        this.chronometre()
        let self = this
        document.querySelector('.tracks tr:first-child td:nth-child(2)').click()
        window.PLAYER.on('stateChange', function(event) {
          let playerState = this.$store.getters.playerState(event.data)
          if(playerState === 'playing') {
            document.getElementsByClassName('player-next')[0].click()
            self.tested_count = self.tested_count + 1
          }
          if(playerState === 'buffering') {
            setTimeout(function() {
              document.getElementsByClassName('player-next')[0].click()
            }, 8000)
          }
        })
        window.PLAYER.on('error', function() {
          self.invalidated_count = self.invalidated_count + 1
          self.tested_count = self.tested_count + 1
        })
      },
      chronometre() {
        setInterval(()=>{
          this.time_elapsed = this.time_elapsed + 1
        }, 1000)
      },
    },
  }
</script>

<style lang="scss">
  .tester {
    position: sticky;
    .testButton {
      background-color: rgba(255, 255, 255, 0.103);
      margin-right: 10px;
    }
  }
  .track {
    position: relative;
  }
</style>