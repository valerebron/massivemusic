<template>
  <i class="play-button">
    <i class="play-button__left"></i>
    <i class="play-button__right"></i>
  </i>
</template>

<script>
  export default {
    name: 'icon-play-pause'
  }
</script>


<style lang="scss">
  .play-button {
    display: flex;
    width: 24px;
    height: 30px;
    opacity: 1;
    transition: opacity 0.3s;
    cursor: pointer;
    &__left, &__right {
      display: inline-block;
      position: absolute;
      width: 24px;
      height: 30px;
      @extend %currentStyleBkgColor;
      transition: clip-path .2s ease, background-color .2s ease;
    }
    &__left {
      clip-path: polygon(0 0, 50% 25%, 50% 75%, 0% 100%);
    }
    &__right {
      clip-path: polygon(50% 25%, 100% 50%, 100% 50%, 50% 75%);
    }
    .player-state-playing & {
      .play-button {
        &__left {
          clip-path: polygon(0 0, 30% 0, 30% 100%, 0% 100%);
        }
        &__right{
          clip-path: polygon(70% 0, 100% 0, 100% 100%, 70% 100%);
        }
      }
    }
    .player-state-buffering & {
      opacity: 0;
    }
  }
</style>
