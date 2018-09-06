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
                  v-if="getTeam.id" class="workspace__aside--teamName">
                  <div v-bind:class="{active: $route.params.id === getTeam.id}">
                    <span class="team-name">{{ getTeam.name }} <i class="material-icons">arrow_back</i></span>
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
            align="top"
            :span-desktop="9"
            :span-phone="12"
            :span-tablet="12">
            <section class="workspace__content">
              <transition name="workspace" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
              </transition>
              <div  v-if="$route.name !== 'board'" class="workspace__content--intro">
                <p>
                  Hi {{ getUser.firstname }}, welcome back!
                  <i class="material-icons">mood</i>
                </p>
                <div class="workspace__content--action">
                  <div class="action--item">
                    <router-link class="btn btn-icon--notRadius" to="">
                      Invite an user
                      <i class="material-icons">person_add</i>
                    </router-link>
                  </div>
                  <div class="action--item">
                    <button class="btn btn-icon--notRadius" @click="openModal">
                      Create a folder
                      <i class="material-icons">folder</i>
                    </button>
                  </div>
                  <div class="action--item">
                    <button class="btn btn-icon--notRadius">
                      Create group
                      <i class="material-icons">group_add</i>
                    </button>
                  </div>
                </div>
              </div>
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
import { GetFolders, GetTeam, GetUser } from '../constants/query.gql'
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
@import "../assets/scss/components/grid/grid";
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

 .workspace {
  min-height: 100vh;
  position: relative;
  .grid {
    padding-left: 0;
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

  &__content {
    margin-top: 7.8rem;
  }

  &__content--empty {
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

  &__content--intro {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: $heading-font-h2;
      font-weight: 200;
    }
  }

  &__content--action {
    margin-top: $heading-font-h1;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    .action--item {
      margin-right: 1.5rem;
      .btn {
        background-color: $silver-clear;
        border: none;
        color: $tundora;
        min-height: 10rem;
      }
      .btn i {
        margin-left: 0.8rem;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
 }

.workspace-enter-active,
.workspace-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}
.workspace-enter,
.workspace-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>

