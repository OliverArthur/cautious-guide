<template>
  <div class="add-project modal-backdrop">
    <div class="add-poject__content modal">
      <div class="add-project__header modal--header">
        <h3>Create project</h3>
      </div>
      <div class="add-project__body modal--content">
        <form method="POST" @submit.prevent>
          <div class="form-group">
            <input
              type="text"
              id="folder"
              name="foldername"
              ref="foldername"
              v-model="form.name"
              :autofocus="true" required="required"/>
            <label for="folder" class="control-label">Project name</label><i class="bar"></i>
          </div>
        </form>
      </div>
      <div class="add-project__footer modal--footer">
        <div class="button-container">
          <button class="btn btn--primary" @click="createFolder">
            Create project
          </button>
          <button class="btn btn--secondary" @click="$emit('close')">
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
  name: 'AddProject',
  props: ['config'],
  data () {
    return {
      form: {
        name: '',
        shareWith: [],
        owners: []
      }
    }
  },
  mounted() {
    this.$refs.foldername.focus()
  },
  methods: {
    close() {
      this.$emit('close');
    },
    createFolder() {
      const { name, shareWith, owners } = this.form
      if (!name) return
      const parent = this.config.parent
      this.$apollo.mutate({
        mutation: CreateFolder,
        variables: {name, parent},
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
          } catch(err) {
            console.log(err)
          }
        }
      }).then(({ data: { createFolder } }) => {
        this.$emit('close')
        // this.$router.push({name: 'folder', params: {id: createFolder.id} })
      }).catch((error) => {
        console.log(error)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";
@import "../assets/scss/components/modal/modal";
</style>
