<template>
  <header class="table-header">
    <div
      class="table-header--row"
      :label="label" v-for="item in label"
      :key="item.index">
      <span class="table-header--column">
        {{ item }}
      </span>
    </div>
  </header>
</template>
<script>
export default {
  name: 'CTableHeader',
  props: {
    label: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  flex-direction: row;
  border-bottom: 0.1rem solid $silver-clear;
  &--row {
    span {
      display: flex;
      font-size: 1.6rem;
      font-weight: 300;
      padding: 1.5rem;
      text-transform: uppercase;
    }
    &:nth-child(1) {
      flex-basis: 20%;
      text-align: left;
    }
    &:nth-child(2) {
      flex-basis: 40%;
      text-align: left;
    }
    &:nth-child(3) {
      flex-basis: 20%;
      span {
        justify-content: center;
      }
    }
    &:nth-child(4) {
      flex-basis: 20%;
      span {
        justify-content: center;
      }
    }
  }
}
</style>


