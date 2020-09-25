<template>
  <svg class="loader" :class="{ loading : isLoading }" width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
      <g fill="none" fill-rule="evenodd" stroke-width="2">
          <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                  begin="0s" dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                  begin="0s" dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                  begin="-0.9s" dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                  begin="-0.9s" dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite" />
          </circle>
      </g>
  </svg>
</template>

<script>
  export default {
    name: 'loader',
    props: ['isLoading'],
  }
</script>

<style lang="scss" scoped>
  .loader {
    pointer-events: none;
    display: none;
    width: 100%;
    height: 100%;
    display: none;
    &.loading {
      display: flex;
    }
    .tracks & {
      position: fixed;
      top: calc(50vh - 22px);
      left: calc(50vw - 22px);
    }
    .control-bar & {
      position: absolute;
      top: 0;
      bottom: 23px;
    }
    .player-buffering .control-bar & {
      opacity: 1;
      display: block;
      height: 100%;
      width: 100%;
      margin: 0;
    }
    button & {
      width: 19px;
      height: 19px;
      margin-left: 10px;
    }
  }
</style>