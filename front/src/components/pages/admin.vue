<template>
  <main class="admin">
    <tracks :filter="{ type: 'style', value: 0 }"/>
    <aside class="dock" :class="{ 'dock--mobile-open' : isDockMobileOpen }">
      <checkbox @changeCheckbox="filter($event, 'pending')" class="pending" ref="pending">
        pending
      </checkbox>
      <checkbox @changeCheckbox="filter($event, 'invalid')" class="invalid">
        invalid
      </checkbox>
      <checkbox @changeCheckbox="filter($event, 'empty')" class="empty">
        artist / title empty
      </checkbox>
      <checkbox @changeCheckbox="filter($event, 'duration')" class="duration">
        big / small tracks
      </checkbox>
      <div>
        <router-link class="enable" tag="button" to="/test" title="test all tracks">
          <icon-radio />
        </router-link>
        <button class="pending-tracks__unpending-all validate" @click="validateAll" :class="{'enable' : isValidatable }">
          <icon-valid/>
        </button>
        <button class="pending-tracks__unpending-all drop" @click="deleteAll" :class="{'enable' : isDeletable }">
          <icon-trash/>
        </button>
      </div>
    </aside>
    <button class="dock-toggle enable" @click="isDockMobileOpen = !isDockMobileOpen">
      <icon-settings/>
    </button>
  </main>
</template>

<script>
  import tracks from '@/components/organisms/tracks.vue'
  import checkbox from '@/components/atoms/checkbox'
  export default {
    name: 'admin',
    components: {
      tracks,
      checkbox,
    },
    data: function() {
      return {
        isValidatable: false,
        isDeletable: false,
        isDockMobileOpen: false,
        selectedFilter: '',
      }
    },
    methods: {
      filter(checked, type) {
        document.querySelectorAll('.admin .checkbox:not(.'+type+') input:checked').forEach((checkbox) => { checkbox.checked = false })
        this.$store.dispatch('filterTracks', {type: type, value: checked })
        this.selectedFilter = type
        // show duration for type duration
        if(type === 'duration' && checked) {
          document.querySelector('.tracks').classList.add('tracks--show-duration')
        }
        else {
          document.querySelector('.tracks').classList.remove('tracks--show-duration')
        }
        // manage buttons enable
        this.isDeletable = checked
        this.isValidatable = (checked && type === 'pending') ? true : false
        this.isDockMobileOpen = false
      },
      validateAll(event) {
        if(event.target.classList.contains('enable')) {
          this.$store.dispatch('validateAll')
        }
      },
      deleteAll(event) {
        if(event.target.classList.contains('enable')) {
          this.$store.dispatch('deleteAll', this.selectedFilter)
        }
      },
    },
    mounted() {
      if(!this.$store.getters.isAdmin) {
        this.$router.push('home')
      }
      else {
        document.querySelector('.pending.checkbox input').click()
      }
    },
  }
</script>

<style lang="scss" scoped>
.admin {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .checkbox {
    padding: 0 12px;
  }
  .tracks {
    @include breakpoint(tablet) {
      margin-top: $header-height+55!important;
    }
  }
  .dock--mobile-open {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    @include breakpoint(tablet) {
      display: block;
    }
  }
}
</style>