<template>
  <section
    :class="modifier"
    class="home">
  </section>
</template>

<script>

export default {
  name: 'Home',
  props: {
    /**
     * Use this prop to add a custom class to the component
     *
     * @type { String }
     * @default ''
     * @requires false
     *
     * @example: <Home modifier="add-border"/>
     *
     * ```html
     * <section class="home add-border"></section>
     * ```
     */
    modifier: {
      type: String,
      required: false
    }
  }
}
</script>

