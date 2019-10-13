<template>
  <i class="burger-close-icon">
    <i class="burger-close-icon__top"></i>
    <i class="burger-close-icon__middle"></i>
    <i class="burger-close-icon__bottom"></i>
  </i>
</template>

<script>
export default {
  name: 'icon-burger-close'
}
</script>


<style lang="scss">
  .burger-close-icon {
    display: flex;
    width: $icon-width;
    height: $icon-height;
    cursor: pointer;
    &__top, &__middle, &__bottom {
      display: inline-block;
      position: absolute;
      width: $icon-width;
      height: $icon-height;
      @extend %appStyleBkgColor;
      transition: clip-path .2s ease, background-color .2s ease;
    }
    &__top {
      clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%);
    }
    &__middle {
      clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%);
    }
    &__bottom {
      clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    }
    .state-nav & {
      .burger-close-icon {
        &__top {
          clip-path: polygon(0 10%, 90% 100%, 100% 90%, 10% 0);
        }
        &__middle {
          clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
        }
        &__bottom {
          clip-path: polygon(0 90%, 10% 100%, 100% 10%, 90% 0);
        }
      }
    }
  }
</style>
