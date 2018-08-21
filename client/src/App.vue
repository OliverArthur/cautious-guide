<template>
  <div id="app">
    <c-header></c-header>
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import CHeader from '@/components/Header'

export default {
  name: 'App',
  components: {
    CHeader
  }
}
</script>


<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateY(-30%);
}
</style>
