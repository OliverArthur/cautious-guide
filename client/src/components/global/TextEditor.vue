<template>
  <div class="text-editor">
    <div class="form-group">
      <textarea name="description" id="description"></textarea>
      <label for="folder" class="control-label">Description</label><i class="bar"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextEditor',
  props: {
    fontSize: {
      type: String
    },
    bgColor: {
      type: String
    },
    model: {
      type: String,
      default: ''
    },
    isFocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focus: false,
      input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/form/form";
</style>


