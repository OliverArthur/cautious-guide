<template>
  <section class="workspace">
    <c-grid>
      <c-grid-inner>
        <c-grid-cell
          align="top"
          :span-desktop="3"
          :span-phone="12"
          :span-tablet="12">
          <aside class="workspace__sidebar sidebar--left">
          </aside>
        </c-grid-cell>
        <c-grid-cell
          align="top"
          :span-desktop="6"
          :span-phone="12"
          :span-tablet="12">
          <div class="workspace__content">
            <div class="conversation__box" v-if="show">
              <form method="POST" @submit.prevent>
                <div class="form-group">
                  <input type="text" name="subject" id="subject" required="required" autofocus="true">
                  <label for="subject" class="control-label label--bold">Subject</label><i class="bar"></i>
                </div>
                <div class="form-group">
                  <textarea id="conversation" required="required"></textarea>
                  <label for="conversation" class="control-label">Start a conversation...</label><i class="bar"></i>
                </div>
                <div class="button-container">
                  <button class="btn btn--primary">
                    POST
                  </button>
                </div>
              </form>
            </div>
            <div class="workspace__intro">
              <div class="intro--header">
                <h4>Welcome Oliver</h4>
              </div>
              <div class="intro--body">
                <p>Start a team conversation to make announcements,
                share information, or discuss projects.</p>
                <button class="btn btn--plain new__msg">
                  New conversation
                  <i class="material-icons">add</i>
                </button>
              </div>
            </div>
          </div>
        </c-grid-cell>
        <c-grid-cell
          align="top"
          :span-desktop="3"
          :span-phone="12"
          :span-tablet="12">
          <div class="workspace__content">
            <aside class="workspace__sidebar sidebar--right">
              <div class="team__mission separation">
                <div class="team__mission--title">
                  <p>Team mission</p>
                </div>
                <form action="POST">
                  <div class="form-group">
                    <textarea name="mission" id="mission" placeholder="What is the team's mission?"></textarea>
                  </div>
                </form>
              </div>
              <div class="project__tree separation">
                <div class="project__tree--title">
                  <p>Projects</p>
                </div>
                <div class="project__tree--body">
                  <p>Sorry, There aren't any project at the moment</p>
                  <button class="btn btn--plain new__msg">
                    Create project
                    <i class="material-icons">add</i>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </c-grid-cell>
      </c-grid-inner>
    </c-grid>
  </section>
</template>

<script>
export default {
  name: 'workspace'
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

.workspace,
.workspace .grid,
.workspace .grid__inner {
  min-height: 100vh;
}

.workspace .grid {
  padding-left: 0;
}

.workspace__sidebar {
  min-height: 100vh;
}

.sidebar--left {
  background-color: $silver-clear;
  border-right: 0.1rem solid rgba(0, 40, 100, 0.12);
}

.sidebar--rigth {
  border-left: 0.1rem solid rgba(0, 40, 100, 0.12);
}

.conversation__box,
.team__mission,
.workspace__intro,
.project__tree{
  padding: 1.5rem;
  background-color: $white;
  border: 0.1rem solid rgba(0, 40, 100, 0.12);
}

.workspace__intro {
  margin-top: 7rem;
  line-height: 2;
  text-align: center;
}

.intro--body {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.intro--body button {
  margin: 1.5rem 0;
}

.intro--body p{
  font-size: 1.5rem;
}

.new__msg {
  align-items: center;
  color: $picton-blue;
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  justify-content: center;
  width: auto;
}

.workspace__intro h4 {
  font-size: $heading-font-h4-xs;
  font-weight: 300;
  text-align: center;
}

.conversation__box .button-container {
  text-align: right;
}
.conversation__box .form-group input[type="text"],
.form-group .label--bold {
  font-weight: 500;
}

.form-group .label--bold {
  font-size: $heading-font-h6;
}

.conversation__box textarea {
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.team__mission .form-group {
  margin-bottom: 0;
  margin-top: 0;
}
.team__mission {
  margin-top: 7rem;
}
.team__mission--title p,
.project__tree--title p {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
.team__mission textarea {
  padding-bottom: 1rem;
  padding-top: 1rem;
  line-height: 1.2;
}

.project__tree--body p {
  font-size: 1.5rem;
  font-weight: 200;
}
.project__tree--body button {
  margin: 1.5rem 0;
}

.separation {
  margin-bottom: 3rem;
}
</style>


