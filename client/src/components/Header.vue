<template>
<header
  :class="[modifier, classses]"
  class="header">
    <!-- @slot Use this slot to place the logo component -->
    <slot name="logo"/>
    <!-- @slot Use this slot to place the nav component -->
    <slot name="navigation"/>
</header>
</template>

<script>
export default {
  name: 'CHeader',
  props: {
    /**
     * Use this prop to add a custom class to the component
     *
     * @type { String }
     * @default ''
     * @requires false
     *
     * @example: <CHeader modifier="add-border"/>
     *
     * ```html
     * <header class="header add-border"></header>
     * ```
     */
    modifier: {
      type: String,
      default: ''
    },
    /**
     * Use this props to fix the header to the top of the
     * document
     *
     * @type { Boolean }
     * @default false
     * @requires false
     *
     * @example: <CHeader :is-fixed-top="true"/>
     *
     * ```html
     * <header class="header is-fixed-top"></header>
     * ```
     */
    isFixedTop: {
      type: Boolean,
      default: false
    },
    /**
     * Use this props to fix the header to the bottom of the
     * document
     *
     * @type { Boolean }
     * @default false
     * @requires false
     *
     * @example: <CHeader :is-fixed-bottom="true"/>
     *
     * ```html
     * <header class="header is-fixed-bottom"></header>
     * ```
     */
    isFixedBottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * This computed method will set the position of the header
     * according the value of the props.
     *
     * @type { Function }
     * @returns { String }
     */
    classses () {
      return {
        'is-fixed-top': this.isFixedTop,
        'is-fixed-Bottom': this.isFixedBottom
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  background-color: $white;
  border-bottom: 0.1rem solid rgba(0, 40, 100, 0.12);
  display: flex;
  flex-direction: row;
  height: 6.2rem;
  justify-content: space-between;
}

.is-fixed-top {
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}

.is-fixed-top {
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
}
</style>
