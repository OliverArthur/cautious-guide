<template>
  <section class="task-preview modal-backdrop">
    <div class="task-preview__content modal">
      <div class="task-preview__header modal--header">
        <h3>{{ task.name }}</h3>
      </div>
      <div class="task-preview__body modal--content">
        <c-grid>
          <c-grid-inner>
            <c-grid-cell
              align="top"
              :span-desktop="9"
              :span-phone="12"
              :span-tablet="12">
              <div class="task-preview__content">
                <div class="form-group">
                  <textarea id="taskDesc" v-model="task.description" required="required"></textarea>
                  <label for="taskDesc" class="control-label">Description...</label><i class="bar"></i>
                </div>
                <div class="task-preview__comments">
                  <div class="form-group">
                    <textarea id="comment" v-model="task.comment" required="required"></textarea>
                    <label for="comment" class="control-label">Add a comment...</label><i class="bar"></i>
                  </div>
                </div>
              </div>
            </c-grid-cell>
            <c-grid-cell
              align="top"
              :span-desktop="3"
              :span-phone="12"
              :span-tablet="12">
            </c-grid-cell>
          </c-grid-inner>
        </c-grid>
      </div>
      <div class="add-task__footer modal--footer">
        <div class="button-container">
          <button class="btn btn--primary">
            Update task
          </button>
          <button class="btn btn--secondary" @click="$emit('close')">
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { GetTask, GetTasks, GetUsers} from '@/constants/query.gql'

export default {
  name: 'TaskPreview',
  data () {
    return {
      task: {
        description: '',
        comment: '',
        name: '',
        parent: {},
      },
      folders: [],
      assignees: [],
      shareWith: [],
      showSubtasks: false,
      subtasks: [],
      comments: [],
      getRecord: {},
      getUsers: [],
    }
  },
  computed: {
    ...mapState(['taskId'])
  },
  apollo: {
    getTask: {
      query: GetTask,
      variables() {
        return {id: this.taskId}
      },
      result({ data: { getTask } }) {
        this.task = getTask
      }
    },
    getTasks: {
      query: GetTasks,
      variables() {
        return { parent: this.taskId }
      },
      skip() {
        return !this.taskId
      },
      result({ data: {getTasks} }) {
        this.subtasks = getTasks
      },
    },
    getUsers: GetUsers
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/modal/modal";
@import "../assets/scss/components/form/form";
@import "../assets/scss/components/buttons/button";

.task-preview__content.modal {
  width: 70.6rem;
}

.task-preview__body /deep/ .grid {
  padding: 0;
}

.task-preview__comments textarea {
  height: 4.5rem;
}

</style>
