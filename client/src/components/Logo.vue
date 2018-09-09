<template>
  <div
    class="logo"
    :class="modifier">
    <a :href="`${uri}`">
      <h1 class="logo__name">LOGO</h1>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Clogo',
  props: {
    /**
     * Use this prop to add a custom class to the component
     *
     * @type { String }
     * @default ''
     * @requires false
     *
     * @example: <CLogo modifier="add-border"/>
     *
     * ```html
     * <div class="logo add-border"></div>
     * ```
     */
    modifier: {
      type: String,
      required: false
    },
  },
  data() {
    return {
      uri: process.env.BASE_URL
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo a {
    color: $tundora;
    display: flex;
    font-size: $heading-font-h2;
    font-weight: 200;
    padding: 1.5rem;
    text-decoration: none;
  }
</style>
