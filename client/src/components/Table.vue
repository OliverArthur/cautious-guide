<template>
  <div class="table">
    <slot name="header"/>
    <slot name="body"/>
  </div>
</template>

<script>
export default {
  name: 'CTable'
}
</script>

<style lang="scss" scoped>
  .table{
    margin-top: 2rem;
  }
</style>

