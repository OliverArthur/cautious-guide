<template>
  <transition>
    <div class="toast" :class="modifier">
      <slot/>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    modifier: {
      type: Array
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/components/toast/toast';
</style>

