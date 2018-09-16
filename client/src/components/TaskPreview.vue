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
              <aside class="task-preview__statebar">
                <div class="task-preview--status separation">
                  <strong>Status:</strong>
                  <div
                    @click.stop="$store.dispatch('setTaskWidget', 'task-status')"
                    v-bind:style="{backgroundColor: labelColor[task.status]}"
                    class="task-preview--status has-dropdown">
                    <div class="task-preview--contentLabel">
                      <p class="task-preview-label">{{task.status}}</p>
                    </div>
                  </div>
                  <div
                    class="dropdown-content"
                    v-if="changeStatus === 'task-status'">
                    <ul>
                      <li
                        v-for="status in statusList"
                        :key="status"
                        @click="changeTaskStatus(status)"
                        v-bind:class="{ 'active-status': task.status === status }">
                        <span
                          class="status-type"
                          v-bind:style="{
                            borderLeft: `4px solid ${backgroundColorMap[status]}`,
                            color: '${backgroundColorMap[status]}'
                          }">
                          {{status}}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="task-preview--labels separation">
                  <strong>Labels:</strong>
                </div>
                <div class="task-preview--assigned separation">
                  <strong>Assigned to:</strong>
                </div>
                <div class="task-preview--date separation">
                  <strong>Due Date:</strong>
                </div>
              </aside>
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
import { GetTask, GetTasks, UpdateTask, GetUsers} from '@/constants/query.gql'
import { backgroundColorMap} from '@/helpers'


export default {
  name: 'TaskPreview',
  data () {
    return {
      statusList: ['New', 'In Progress', 'Done', 'Blocked', 'Cancelled'],
      backgroundColorMap,
      labelColor: {
        New: '#84aacd',
        'In Progress': '#989164',
        Done: '#86b249',
        'Blocked': '#f6cd62',
        Cancelled: '#c75343',
      },
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
    ...mapState(['taskId', 'changeStatus'])
  },
  methods: {
    changeTaskStatus(status) {
      if (this.task.status === status) return
      this.updateTask({status})
    },
    updateTask(input) {
      this.$apollo.mutate({
        mutation: UpdateTask,
        variables: {
          id: this.task.id,
          input
        },
      }).then(() => {
        this.$store.dispatch('setTaskWidget', null)
      }).catch((error) => {
        console.log(error)
      })
    },
    changeActiveWidget(key) {
      this.$store.dispatch('setTaskWidget', key)
    },
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
  width: 80.6rem;
}

.task-preview__body /deep/ .grid {
  padding: 0;
}

.task-preview__comments textarea {
  height: 4.5rem;
}

.task-preview__statebar strong {
  display: flex;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.5;
}

.separation {
  margin-top: 1.5rem;
}

.task-preview--status {
  position: relative;
  border-radius: $border-radius;
}

.dropdown-content {
  background: $white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  height: auto;
  left: 0;
  position: absolute;
  width: 17.5rem;
}

.dropdown-content span {
  display: flex;
  padding: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: $silver-clear;
  }
}

.task-preview--contentLabel p {
  padding: 1rem;
  font-size: 1.4rem;
  color: $white;
}

</style>
