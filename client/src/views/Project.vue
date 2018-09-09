<template>
  <section class="project">
    <c-grid>
      <c-grid-inner>
        <c-grid-cell
          align="top"
          :span-desktop="3"
          :span-phone="12"
          :span-tablet="12">
          <aside class="project__sidebar sidebar--left">
            <div class="project__name">
              <div class="project__sidebar--name">
                  <span>{{ project.name }} <i class="material-icons">arrow_back</i></span>
              </div>
            </div>
          </aside>
        </c-grid-cell>
        <c-grid-cell
          align="top"
          :span-desktop="9"
          :span-phone="12"
          :span-tablet="12">
          <div class="project__intro">
            <div class="intro--header">
              <h4>Hi {{ userName }}</h4>
            </div>
            <div class="intro--body">
              <strong>I think you may be experiencing one of these two things:</strong>
              <p>
                Maybe you do not have the right permission to be able to see the content
                <i class="material-icons">block</i>
              </p>
              <p>
                Or around here there is nothing yet.
                <i class="material-icons">sentiment_very_dissatisfied</i>
              </p>
              <button class="btn btn--plain new__task">
                New task
                <i class="material-icons">add</i>
              </button>
            </div>
          </div>
        </c-grid-cell>
      </c-grid-inner>
    </c-grid>
  </section>
</template>

<script>
import { mapState } from  'vuex'
import { GetUser, GetTasks, GetTask, CreateTask, GetFolder } from '@/constants/query.gql'

export default {
  name: 'Project',
  data () {
    return {
      user: '',
      userName: '',
      projectName: '',
      project: {
        sharedWith: []
      },
      getTasks: []
    }
  },
  apollo: {
    getUser: {
      query: GetUser,
      variables() {
        return { id: this.$store.userId}
      },
      result ({data: {getUser}}) {
        this.user = getUser
        this.userName = this.user.firstname
      }
    },
    getFolder: {
      query: GetFolder,
      variables() {
        return {id: this.$route.params.id}
      },
      result ({data: {getFolder}}) {
        this.project = getFolder
        this.projectName = this.project.name
        document.title = `Logo | ${this.project.name}`
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";
@import "../assets/scss/views/project";
</style>

