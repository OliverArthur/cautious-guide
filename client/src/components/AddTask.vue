<template>
  <div class="add-task modal-backdrop">
    <div class="add-poject__content modal">
      <div class="add-task__header modal--header">
        <h3>Create task</h3>
      </div>
      <div class="add-task__body modal--content">
        <form method="POST" @submit.prevent>
          <div class="form-group">
            <input
              type="text"
              id="taskTitle"
              name="title"
              ref="taskTitle"
              v-model="form.name"
              :autofocus="true" required="required"/>
              <label for="taskTitle" class="control-label">Title</label><i class="bar"></i>
          </div>
          <div class="form-group">
            <textarea id="taskDesc" v-model="form.description" required="required"></textarea>
            <label for="taskDesc" class="control-label">Give a description...</label><i class="bar"></i>
          </div>
        </form>
      </div>
      <div class="add-task__footer modal--footer">
        <div class="button-container">
          <button class="btn btn--primary" @click="addTask">
            Create task
          </button>
          <button class="btn btn--secondary" @click="$emit('close')">
            Close
          </button>
        </div>
      </div>
    </div>
    <c-toast v-if="submitted || error" class="toast">
      {{ status }}
    </c-toast>
  </div>
</template>

<script>
import { GetTasks, GetTask, CreateTask } from '../constants/query.gql'

export default {
  name: 'Addtask',
  props: ['parentId', 'config'],
  data () {
    return {
      submitted: false,
      error: false,
      status: '',
      form: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    /**
     * Method to reset the toast value after the promise has been completed
     *
     * TODO: move this to a helper function or use `bus` event
     */
    resetToast () {
      if (this.submitted || this.error) {
        setTimeout(() => {
          this.submitted = false,
          this.error = false,
          this.status = ''
        }, 3000)
      }
    },
  },
  methods: {
    addTask () {

      const { name, description } = this.form

      if (!name && !description) return

      const parent = this.parentId
      const folder = parent ? undefined : this.$route.params.id
      this.$apollo.mutate({
        mutation: CreateTask,
        variables: {
          folder,
          parent,
          name: this.form.name,
          description: this.form.description,
        },
        update: (store, { data: { createTask } }) => {
          try {
            const data = store.readQuery({
              query: GetTasks,
              variables: {parent, folder}
            })
            if (parent) {
              data.getTasks.unshift(createTask)
            } else {
              data.getTasks.push(createTask)
            }
            store.writeQuery({
              query: GetTasks,
              variables: {parent},
              data
            })
          } catch (err) {
            console.log(err)
          }
        }
      }).then(() => {
        this.submitted = true
        this.error = false
        this.status = 'Task created successfully.'
        this.resetToast
      }).catch((error) => {
        if (err.graphQLErrors.length >= 1) {
          this.error = true
          this.status = err.graphQLErrors[0].message
          this.resetToast
        } else {
          this.error = true
          this.status = 'Something went wrong'
          this.resetToast
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";
@import "../assets/scss/components/modal/modal";
</style>
