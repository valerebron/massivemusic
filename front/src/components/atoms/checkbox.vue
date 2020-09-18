<template>
  <label class="checkbox">
    <input type="checkbox" @change="$emit('changeCheckbox')" :checked="state">
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  name: 'checkbox',
  props: ['state'],
}
</script>

<style lang="scss">
.checkbox {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $primary-color;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
    }
  }
}
</style>
