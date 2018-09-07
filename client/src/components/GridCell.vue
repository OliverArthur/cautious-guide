
<template>
  <div
    :class="cellModifier"
    class="grid__cell">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'CGridCell',
  props: {
    /**
     * Use the `span` prop to determine the number of cell
     *
     * @eg: `<CGridCell :span="1"/>`
     * @required false
     * @type {Number}
     */
    span: {
      type: Number,
      validator: value => value >= 1 && value <= 12,
      required: false
    },
    /**
     * Use the `spanDesktop` prop to determine the number of cell on desktop
     *
     * @eg: `<CGridCell :span-desktop="1"/>`
     * @required false
     * @type {Number}
     */
    spanDesktop: {
      type: Number,
      validator: value => value >= 1 && value <= 12,
      required: false
    },
    /**
     * Use the `spanTablet` prop to determine the number of cell on desktop
     *
     * @eg: `<CGridCell :span-tablet="1"/>`
     * @required false
     * @type {Number}
     */
    spanTablet: {
      type: Number,
      validator: value => value >= 1 && value <= 12,
      required: false
    },
    /**
     * Use the `spanPhone` prop to determine the number of cell on table
     *
     * @eg: `<CGridCell :span-phone="1"/>`
     * @required false
     * @type {Number}
     */
    spanPhone: {
      type: Number,
      validator: value => value >= 1 && value <= 12,
      required: false
    },
    /**
     * Use the `order` prop to determine the cell order
     *
     * @eg: `<CGridCell :order="1"/>`
     * @required false
     * @type {Number}
     */
    order: {
      type: Number,
      validator: value => value >= 1 && value <= 12,
      required: false
    },
    /**
     * Use the `align` prop to align the cell vertically
     *
     * @eg: `<CGridCell align="top"/>`
     * @required false
     * @type {Number}
     */
    align: {
      type: String,
      validator: value => ['top', 'middle', 'bottom'].indexOf(value) > -1,
      required: false
    }
  },
  computed: {
    cellModifier () {
      let tmp = {}
      tmp['grid__cell--span-' + this.span] = typeof this.span === 'number'
      tmp['grid__cell--span-' + this.spanDesktop + '-desktop'] = typeof this.spanDesktop === 'number'
      tmp['grid__cell--span-' + this.spanTablet + '-tablet'] = typeof this.spanTablet === 'number'
      tmp['grid__cell--span-' + this.spanPhone + '-phone'] = typeof this.spanPhone === 'number'
      tmp['grid__cell--align-' + this.align] = typeof this.align === 'string'
      tmp['grid__cell--order-' + this.order] = typeof this.order === 'number'
      return tmp
    }
  }
}
</script>
