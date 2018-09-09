<template>
  <div
    :class="[whichLocation, gridModifier]"
    class="grid">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'CGrid',
  props: {
    /**
     * Use the prop to define in which route the app it is
     * and can be use it for managing logic like show element or hide element
     * depending on the route of the page
     *
     * @eg: `<CGrid :location="this.$route.name"/>`
     * @required false
     * @type {String}
     */
    location: {
      type: String,
      validator: value => ['home', 'dashboard'].indexOf(value) > -1,
      required: false
    },
    /**
     * Use the prop to fixed column width
     *
     * @eg: `<CGrid has-fixed-column-width/>
     * or <CGrid :has-fixed-column-width="true"/>`
     * @required false
     * @default false
     * @type {Boolean}
     */
    hasFixedColumnWidth: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Use the prop to align the grid to the left or rigth
     *
     * @eg: `align="left"`
     * @required false
     * @type {String}
     */
    align: {
      type: String,
      validator: value => ['left', 'right'].indexOf(value) > -1,
      required: false
    }
  },
  computed: {
    whichLocation () {
      return [
        this.location, {
          'is-home': (this.location === 'home'),
          'is-dashboard': (this.location === 'dashboard')
        }
      ]
    },
    gridModifier () {
      return {
        'grid--fixed-column-width': this.hasFixedColumnWidth,
        'grid--align-left': (this.align === 'left'),
        'grid--align-right': (this.align === 'right')
      }
    }
  }
}
</script>
