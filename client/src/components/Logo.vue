<template>
  <span class="logo">
    <a :href="`${uri}`" title="Logo">Logo</a>
  </span>
</template>

<script>
export default {
  name: 'Logo',
  data() {
    return {
      uri: process.env.BASE_URL
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo a {
    font-size: $heading-font-h2;
    color: $tundora;
    text-decoration: none;
  }
</style>
