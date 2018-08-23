<template>
  <div class="home">
    <div class="container">
      <c-grid>
        <c-grid-inner>
          <c-grid-cell
            align="middle"
            :span-desktop="6"
            :span-phone="12"
            :span-tablet="12">
            <div class="container--column">
              <h1>An easy way to have your task and projects organized</h1>
              <h2>
                Logo is a project and task management software that any team
                can use to collaborate and share note efficiently.
              </h2>
              <router-link to="create-account" class="btn btn-primary">Get Started!</router-link>
            </div>
          </c-grid-cell>
          <c-grid-cell
            align="middle"
            :span-desktop="6"
            :span-phone="12"
            :span-tablet="12">
            <div class="container--column">
              image
            </div>
          </c-grid-cell>
        </c-grid-inner>
      </c-grid>
    </div>
  </div>
</template>

<script>
import CGrid from '@/components/Grid'
import CGridInner from '@/components/GridInner'
import CGridCell from '@/components/GridCell'

export default {
  name: 'home',
  components: {
    CGrid,
    CGridInner,
    CGridCell
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/grid/grid";
@import "../assets/scss/components/buttons/button";

.container {
  min-height: 100vh;

  .grid, .grid__inner {
    min-height: 100vh;
  }

  &--column {
    h1, h2 {
      line-height: 1.2;
      margin-bottom: 1.6rem;
    }

    h1 {
      color: $heading-font-color;
      font-size: $heading-font-h1;
      font-weight: $heading-font-weight;
    }

    h2 {
      color: $heading-font-color;
      font-size: $heading-font-h5-xs;
      font-weight: $heading-font-weight;
    }

  }
}
</style>
