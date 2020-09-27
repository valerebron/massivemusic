<template>
  <div class="upload">
    <input
      type="file"
      @change="fileSelected"
      accept="image/png, image/jpeg"
      multiple="false"
      v_if="window.File && window.FileReader && window.FileList && window.Blob"
      @click="$emit('click')"
      visbility="hidden"
      class="upload__input"
    >
    <button class="upload__button" @click.prevent="uploadButton">
      Upload avatar
    </button>
  </div>
</template>

<script>
export default {
  name: 'upload',
  date: function () {
    return {
      file: null,
    }
  },
  methods: {
    fileSelected (event) {
      const file = event.target.files[0]
      const url = URL.createObjectURL(file)
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const reader = new FileReader()
        let that = this
        reader.readAsBinaryString(file)
        reader.addEventListener('load', function() {
          const b64 = btoa(reader.result)
          that.$emit('onFileSelected', url, b64)
        })
      } else {
        console.log('The File APIs are not fully supported in this browser.')
      }
    },
    uploadButton () {
      document.querySelector('.upload__input').click()
    },
  },
}
</script>

<style lang="scss">
  .upload {
    width: 100%;
    margin: 10px 0;
    &__input {
      display: none;
    }
    &__button {
      width: 100%;
    }
  }
</style>