<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal--header">
        <h3>Create folder</h3>
      </div>
      <div class="modal--content">
        <form method="POST" @submit.prevent>
          <div class="form-group">
            <input
              type="text"
              id="folder"
              name="foldername"
              ref="foldername"
              v-model="form.name"
              :autofocus="true" required="required"/>
            <label for="folder" class="control-label">Create a folder</label><i class="bar"></i>
          </div>
        </form>
      </div>
      <div class="modal--footer">
        <div class="button-container">
          <button class="btn btn-primary" @click="createFolder">
            Create folder
          </button>
          <button class="btn btn-secondary" @click="$emit('close')">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CreateFolder, GetFolders } from '../constants/query.gql'

export default {
  name: 'CModalForm',
  props: ['config'],
  data() {
    return {
      form: {
        name: '',
        shareWith: [],
        owners: []
      },
      mode: this.config.mode
    }
  },
  mounted() {
    this.$refs.foldername.focus()
  },
  methods: {
    close() {
      this.$emit('close');
    },
    create(mode) {
      const { name, shareWith, owners } = this.form
      if (!name) {
        return
      }
      const parent = this.config.parent
      if (mode === 'folder') {
        this.createFolder(name, parent, shareWith)
      } else {
        this.createProject(name, parent, shareWith, owners)
      }
    },
    createFolder(name, parent, shareWith) {
      this.$apollo.mutate({
        mutation: CreateFolder,
        variables: { name, parent, shareWith },
        update: (store, { data: { createFolder } }) => {
          const variables = parent ? { parent } : {}
          try {
            const data = store.readQuery({
              query: GetFolders,
              variables
            })
            data.getFolders.push(createFolder)
            store.writeQuery({
              query: GetFolders,
              variables,
              data
            })
          } catch (err) {
            throw new Error(err)
          }
        }
      }).then(({ data: { createFolder } }) => {
        this.$emit('close')
        console.log(createFolder.id)
        // this.$router.push({name: 'folder', params: {id: createFolder.id} })
      }).catch(err => {
        throw new Error(err)
      })
    },
    createProject() {}
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/components/buttons/button";
  @import "../assets/scss/components/form/form";

  .modal-backdrop {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: -8rem;
    z-index: 4444;
  }

  .modal {
    background: $white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    display: flex;
    flex-direction: column;
    min-width: 45rem;
    overflow-x: auto;

    &--header {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;
      h3 {
        font-size: $heading-font-h3;
        font-weight: 300;
      }
    }

    &--footer {
      display: flex;
      justify-content: flex-end;
      padding: 1.5rem;

      .button-container {
        button {
          margin-right: 1.5rem;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    &--content {
      padding: 1.5rem;
      position: relative;
    }
  }
</style>
