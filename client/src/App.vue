<template>
  <div id="app">
    <c-header
      :is-fixed-top="true">
      <c-logo slot="logo"></c-logo>
      <c-navigation slot="navigation"></c-navigation>
    </c-header>
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import CLogo from '@/components/Logo'
import CNavigation from '@/components/Navigation'

export default {
  name: 'App',
  components: { CLogo, CNavigation }
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
