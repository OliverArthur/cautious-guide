<template>
  <div class="grid__inner">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'CGridInner',
  props: {
    /**
     * Use the prop to add any class to apply any style for specific situation
     *
     * @eg: `<CGridInner modifier="new-color"/>`
     * @required false
     * @type {String}
     */
    modifier: {
      type: String,
      require: false
    }
  }
}
</script>
