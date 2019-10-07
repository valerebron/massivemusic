<template>
  <i class="up-down-icon"></i>
</template>

<script>
export default {
  name: 'icon-up-down'
}
</script>


<style lang="scss">
  $icon-width: 24px;
  $icon-height: 24px;
  .up-down-icon {
    display: inline-block;
    width: $icon-width;
    height: $icon-height;
    @extend %currentStyleBkgColor;
    transition: clip-path .2s ease, background-color .2s ease;
    cursor: pointer;
    clip-path: polygon(0 45%, 50% 0, 100% 45%, 90% 55%, 50% 20%, 10% 55%);
    .state-5-player-full & {
      clip-path: polygon(10% 45%, 50% 80%, 90% 45%, 100% 55%, 50% 100%, 0 55%);
    }
  }
</style>
