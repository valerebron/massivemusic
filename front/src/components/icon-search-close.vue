<template>
  <i class="icon-search-close">
    <i class="icon-search-close__circle"></i>
    <i class="icon-search-close__bar"></i>
    <i class="icon-search-close__bar2"></i>
    <i class="icon-search-close__circle2"></i>
  </i>
</template>

<script>
export default {
  name: 'icon-play-pause'
}
</script>


<style lang="scss">
  .icon-search-close {
    display: flex;
    width: $icon-width;
    height: $icon-height;
    cursor: pointer;
    &__circle, &__circle2, &__bar, &__bar2 {
      display: inline-block;
      position: absolute;
      width: $icon-width;
      height: $icon-height;
      @extend %appStyleBkgColor;
      transition: clip-path .2s ease, background-color .2s ease;
    }
    &__circle {
      clip-path: circle(40%);
    }
    &__circle2 {
      background-color: black!important;
      clip-path: circle(25%);
    }
    &__bar {
      clip-path: polygon(40% 50%, 90% 100%, 100% 90%, 60% 50%);
    }
    &__bar2 {
      clip-path: polygon(50% 50%, 90% 100%, 100% 90%, 50% 50%);
    }
    .state-4-search & {
      .icon-search-close {
        &__circle, &__circle2 {
          clip-path: circle(0);
        }
        &__bar {
          clip-path: polygon(0 10%, 90% 100%, 100% 90%, 10% 0);
        }
        &__bar2 {
          clip-path: polygon(0 90%, 10% 100%, 100% 10%, 90% 0);
        }
      }
    }
  }
</style>
