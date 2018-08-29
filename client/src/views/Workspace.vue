<template>
  <section class="workspace">
      <c-grid>
        <c-grid-inner>
          <c-grid-cell
            align="middle"
            :span-desktop="3"
            :span-phone="12"
            :span-tablet="12">
            <aside class="workspace__aside">
              <div class="workspace__aside--team">
                <div
                  v-if="getTeam.id"
                  @click.left.stop="$route.push({name: 'folder', params: {id: getTeam.id }})"
                  class="workspace__aside--teamName">
                  <div v-bind:class="{active: $route.params.id === getTeam.id}">
                    <span class="team-name">{{ getTeam.name }} <i class="material-icons">add_circle</i></span>
                  </div>
                </div>
              </div>
              <nav>
                <CFolderList
                  v-for="folder in getFolders"
                  :key="folder.id"
                  :model="folder"
                  :team="getTeam.id"/>
              </nav>
            </aside>
          </c-grid-cell>
          <c-grid-cell
            align="middle"
            :span-desktop="9"
            :span-phone="12"
            :span-tablet="12">
            <section class="workspace__content">
              <router-view :key="$route.fullPath"></router-view>
            </section>
          </c-grid-cell>
        </c-grid-inner>
      </c-grid>
      <CModal @close="showModal=false" v-if="showModal" :config="modalConfig"/>
      <c-plus-button @click="openModal" position="bottom-right">
        <i class="material-icons">add</i>
      </c-plus-button>
  </section>
</template>

<script>
import { mapState } from  'vuex'
import { GetFolders, GetTeam } from '../constants/query.gql'
import CGrid from '@/components/grid/Grid'
import CGridInner from '@/components/grid/GridInner'
import CGridCell from '@/components/grid/GridCell'
import CFolderList from '@/components/folder/FolderItem'
import CModal from '@/components/global/Modal'
import Data from '@/mixins/data-mixins'

export default {
  name: 'Workspace',
  mixins: [Data],
  apollo: {
    getTeam: {
      query: GetTeam,
    },
    getFolders: {
      query: GetFolders,
      err(err) {
        console.error(err)
      }
    }
  },
  computed: {
    ...mapState(['activeWidget'])
  },
  components: {
    CGrid,
    CGridInner,
    CGridCell,
    CFolderList,
    CModal
  },
  methods: {
    openModal() {
      this.$store.dispatch('changeActiveWidget', null)
      this.showModal = true
    },
    close() {
      console.log('hello worls')
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/grid/grid";
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

 .workspace {
  min-height: 100vh;
  position: relative;
  .grid {
    padding-left: 0;
    padding-right: 0;
  }
  .grid, .grid__inner {
    min-height: 100vh;
  }

  &__aside {
    border-right: 0.1rem solid rgba(0, 40, 100, 0.12);
    min-height: 100vh;

    nav {
      margin-top: 1.5rem;
    }

    .team-name {
      align-content: center;
      align-items: center;
      border-bottom: 0.1rem solid rgba(0, 40, 100, 0.12);
      display: flex;
      flex-direction: row;
      font-size: $heading-font-h6-xs;
      justify-content: space-between;
      padding: 7.5rem 1.5rem 2.5rem 1.5rem;
      vertical-align: middle;
      cursor: pointer;
    }
  }
 }
</style>

