<template>
  <label class="checkbox">
    <slot></slot>
    <div class="checkbox__button">
      <input type="checkbox" @change="$emit('changeCheckbox', $event.target.checked)" :checked="state">
      <span class="slider round"></span>
    </div>
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
  display: flex;
  align-items: center;
  &__button {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    margin-left: 10px;
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
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
      }
    }
  }
}
</style>
