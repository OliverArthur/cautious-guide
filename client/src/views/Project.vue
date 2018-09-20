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
            <nav class="sidebar__nav">
              <ul>
                <li><router-link :to="{name: 'workspace'}"><span><i class="material-icons">keyboard_arrow_left</i> Back</span></router-link></li>
                <li @click="openModal"><span>New task <i class="material-icons">add</i></span></li>
              </ul>
            </nav>
          </aside>
        </c-grid-cell>
        <c-grid-cell
          align="top"
          :span-desktop="9"
          :span-phone="12"
          :span-tablet="12">
          <div class="project__intro" v-if="!getTasks">
            <div class="intro--header">
              <h4>Hi {{ userName }}</h4>
            </div>
            <div class="intro--body" >
              <strong>I think you may be experiencing one of these two things:</strong>
              <p>
                Maybe you do not have the right permission to be able to see the content
                <i class="material-icons">block</i>
              </p>
              <p>
                Or around here there is nothing yet.
                <i class="material-icons">sentiment_very_dissatisfied</i>
              </p>
              <button class="btn btn--plain new__task" @click="openModal">
                New task
                <i class="material-icons">add</i>
              </button>
            </div>
          </div>
          <CTask :taskData="getTasks"/>
        </c-grid-cell>
      </c-grid-inner>
    </c-grid>
    <c-add-task
      @close="showModal=false"
      v-if="showModal"
      :parentId="$route.params.id"
      :config="modalConfig">
    </c-add-task>
    <CTaskPreview @close="openTask=false" v-if="openTask" :data="getTasks"/>
  </section>
</template>

<script>
import { mapState } from  'vuex'
import { GetUser, GetTasks, GetTask, CreateTask, GetFolder } from '@/constants/query.gql'
import { EventBus } from '@/helpers/eventBus'
import Data from '@/mixins/data-mixins'
import CAddTask from '@/components/AddTask'
import CTaskPreview from '@/components/TaskPreview'
import CTask from '@/components/Task'

export default {
  name: 'Project',
  mixins: [Data],
  data () {
    return {
      openTask: false,
      user: '',
      userName: '',
      projectName: '',
      project: {
        sharedWith: []
      },
    }
  },
  components: { CAddTask, CTask, CTaskPreview },
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
    getTasks: {
      query: GetTasks,
      variables() {
        return {parent: this.$route.params.id}
      },
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
  created() {
    EventBus.$on('open-modal', (isOpen) => {
      this.$store.dispatch('changeActiveWidget', null)
      this.openTask = isOpen;
    });
  },
  methods: {
    openModal() {
      this.$store.dispatch('changeActiveWidget', null)
      this.showModal = true
    },
    toggelSideBar() {
      this.$store.dispatch('changeActiveSideBar', null)
      this.showSideBar ? true : false
    },
    close() {
      this.openTask = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";
@import "../assets/scss/views/project";
</style>

