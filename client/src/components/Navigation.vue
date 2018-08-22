<template>
  <nav class="navigation">
    <ul class="navigation--menu">
      <li></li>
      <li>
        <button class="btn btn-plain">
          <i class="material-icons">notifications</i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
.navigation{
  &--menu {
    button {
      color: $tundora;
    }
  }
}
</style>
