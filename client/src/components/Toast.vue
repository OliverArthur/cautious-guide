<template>
  <transition mode="out-in">
    <div class="toast"
      :class="[modifier, classes]">
      <div class="toast__inner">
        <!-- @slot use it for add the content for the toast component -->
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CToast',
  props: {
    /**
     * Use this prop to add a custom class to the component
     *
     * @type { String }
     * @default ''
     * @requires false
     *
     * @example: <CToast modifier="add-border"/>
     *
     * ```html
     * <div class="toast add-border"></div>
     * ```
     */
    modifier: {
      type: String
    },
    /**
     * Use this prop to set a toast messages type notification
     *
     * @type { String }
     * @default ''
     * @requires false
     *
     * @example: <CToast type="success"/>
     *
     * ```html
     * <div class="toast toast-success"></div>
     * ```
     */
    type: {
      type: String,
      require: false,
      validator: value => [
        'error',
        'success',
        'warning',
        'info'
      ].indexOf(value) > -1,
    },
  },
  computed: {
    /**
     * Method to set the type of the toast depending in the value
     * of the `type` prop
     *
     * @type { Function }
     * @returns String
     */
    classes () {
      return {
        'toast-error': (this.type === 'error'),
        'toast-success': (this.type === 'success'),
        'toast-warning': (this.type === 'warning'),
        'toast-info': (this.type === 'info'),
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/components/toast/toast';
</style>
