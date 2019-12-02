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
  $icon-height: 12px;
  .up-down-icon {
    display: inline-block;
    width: $icon-width;
    height: $icon-height;
    @extend %currentStyleBkgColor;
    transition: transform .3s ease, background-color .2s ease;
    cursor: pointer;
    clip-path: polygon(0 90%, 50% 0, 100% 90%, 90% 100%, 50% 40%, 10% 100%);
    transform: rotateX(180deg);
    .state-full & {
      transform: rotateX(0deg);
    }
  }
</style>
