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
            <div class="team__name">
              <div
                v-if="getTeam.id" class="workspace__sidebar--team">
                <div v-bind:class="{active: $route.params.id === getTeam.id}">
                  <span>{{ getTeam.name }} <i class="material-icons">arrow_back</i></span>
                </div>
              </div>
            </div>
            <div class="workspace__project-list">
              <CProject :projectData="getFolders" :teamData="getTeam"/>
            </div>
          </aside>
        </c-grid-cell>
        <c-grid-cell
          align="top"
          :span-desktop="6"
          :span-phone="12"
          :span-tablet="12">
          <div class="workspace__content">
            <!-- <div class="conversation__box" v-if="show">
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
            </div> -->
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
            <aside class="workspace__sidebar sidebar--rigth">
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
                  <p v-if="!getFolders">Sorry, There aren't any project at the moment</p>
                  <CProject v-else :projectData="getFolders" :teamData="getTeam"/>
                  <button class="btn btn--plain new__msg" @click="openModal">
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
    <c-add-project
      @close="showModal=false"
      v-if="showModal"
      :config="modalConfig">
    </c-add-project>
  </section>
</template>

<script>
import { mapState } from  'vuex'
import { GetFolders, GetTeam, GetUser } from '../constants/query.gql'
import Data from '@/mixins/data-mixins'
import CAddProject from '@/components/AddProject'
import CProject from '@/components/Project'

export default {
  name: 'workspace',
  mixins: [Data],
  apollo: {
    getUser: {
      query: GetUser,
      err(err) {
        console.error(err)
      }
    },
    getTeam: {
      query: GetTeam,
      err(err) {
        console.error(err)
      }
    },
    getFolders: {
      query: GetFolders,
      err(err) {
        console.error(err)
      }
    }
  },
  computed: {
    ...mapState(['activeWidget', 'activeSideBar'])
  },
  components: {
    CAddProject,
    CProject
  },
  methods: {
    openModal() {
      this.$store.dispatch('changeActiveWidget', null)
      this.showModal = true
      this.modalConfig = {
        parent: ''
      }
    },
    toggelSideBar() {
      this.$store.dispatch('changeActiveSideBar', null)
      this.showSideBar ? true : false
    },
    close() {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";
@import "../assets/scss/views/workspace";
</style>


