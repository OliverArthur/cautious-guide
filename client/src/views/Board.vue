<template>
  <section class="board">
    <div class="board--empty">
      <div class="intro">
        <p>Hi Oliver, I think you may be experiencing one of these two things:</p>
        <ul>
          <li>
            Maybe you do not have the right permission to be able to see the content
            <i class="material-icons">block</i>
          </li>
          <li>
            Or around here there is nothing yet.
            <i class="material-icons">sentiment_very_dissatisfied</i>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Board'
}
</script>

<style lang="scss" scoped>
  .board--empty {
    .intro {
      align-items: center;
      display: flex;
      flex-direction: column;
      font-size: $heading-font-h1;
      ul {
        margin-top: 2rem;
      }
      ul li {
        align-items: center;
        display: flex
      }
      ul li:first-child i {
        font-size: 2.8rem;
        color: $mojo;
        font-weight: 500;
      }
      ul li:second-child i {
        font-size: 2.8rem;
        font-weight: 500;
      }
    }
    p {
      font-weight: 200;
      text-align: center;
    }
  }
</style>


