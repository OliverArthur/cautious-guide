<template>
  <section
    :class="modifier"
    class="home">
    <div class="container">
      <c-grid>
        <c-grid-inner>
          <c-grid-cell
            align="middle"
            :span-desktop="6"
            :span-phone="12"
            :span-tablet="12">
            <div class="home__intro">
              <h1>An easy way to have your task and projects organized</h1>
              <h2>
                Logo is a project and task management software that any team
                can use to collaborate and share note efficiently.
              </h2>
              <router-link to="create-account" class="btn btn--primary">Get Started!</router-link>
            </div>
          </c-grid-cell>
          <c-grid-cell
            align="middle"
            :span-desktop="6"
            :span-phone="12"
            :span-tablet="12">
            <div class="home__img">
              image
            </div>
          </c-grid-cell>
        </c-grid-inner>
      </c-grid>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  props: {
    /**
     * Use this prop to add a custom class to the component
     *
     * @type { String }
     * @default ''
     * @requires false
     *
     * @example: <Home modifier="add-border"/>
     *
     * ```html
     * <section class="home add-border"></section>
     * ```
     */
    modifier: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";

h1, h2 {
  line-height: 1.2;
  margin-bottom: 1.6rem;
}

.container {
  min-height: 100vh;
}

.home .grid,
.home .grid__inner {
  min-height: 100vh;
}

.home__intro h1 {
  color: $heading-font-color;
  font-size: $heading-font-h1;
  font-weight: $heading-font-weight;
}

.home__intro h2 {
  color: $heading-font-color;
  font-size: $heading-font-h5-xs;
  font-weight: $heading-font-weight;
}
</style>
