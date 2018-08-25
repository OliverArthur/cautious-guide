<template>
  <div class="folder">
    <div class="folder--item">
      <div class="folder--item-folder" v-bind:class="{active: $route.params.id === model.id}">
        <span class="no-select-color">
          <i class="material-icons" v-if="!open">folder</i>
          <i class="material-icons" v-else>folder_open</i>
          {{ model.name }}
        </span>
      </div>
      <ul class="folder--secondLevel" v-show="open" v-if="isFolder">
        <folder
          v-for="folder in getFolders"
          :key="folder.id"
          :model="folder"
          @open="openArrow"
        >
        </folder>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FolderItem from './FolderItem'
import { GetFolders, DeleteFolder } from '../constants/query.gql'
export default {
  name: 'folder',
  components: {
    'folder': FolderItem,
  },
  props: ['model', 'team'],
  data() {
    return {
      open: false,
      getFolders: []
    }
  },
  mounted() {
    if (this.$route.params.id === this.model.id) {
      this.$emit('open')
    }
  },
  computed: {
    isFolder () {
      return this.getFolders.length > 0
    },
    ...mapState(['activeWidget'])
  },
  apollo: {
    getFolders: {
      query: GetFolders,
      variables() {
        return { parent: this.model.id }
      },
      error(error) {
        console.error(error)
      },
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    openArrow() {
      this.open = true
      this.$emit('open')
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.id === this.model.id) {
        this.$emit('open')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .folder {
    &--item-folder {
      padding: 0.9rem 1.5rem;
    }
    &--item-folder {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      span {
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        i {
          padding-right: 1.2rem;
        }
      }
    }
  }
</style>
