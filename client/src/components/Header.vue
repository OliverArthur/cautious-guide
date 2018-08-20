<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__inner-item">
        Logo
      </div>
      <div class="header__inner-item nav-section">
        <router-link to="" class="btn btn--primary-outline">Log in</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CHeader'
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/components/buttons/button";

  .header {
    background-color: $white;
    height: 6.5rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;

    &__inner {
      column-gap: 1rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 6.5rem;
    }

    &__inner-item {
      align-self: center;
      font-size: 3rem;
      font-weight: 200;
      padding: 0 1.5rem;
    }

    .nav-section {
      position: relative;
      text-align: right;
    }
  }
</style>
