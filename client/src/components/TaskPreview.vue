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
                    @click.stop="$store.dispatch('changeActiveWidget', 'task-status')"
                    v-bind:style="{backgroundColor: labelColor[task.status]}"
                    class="task-preview--status has-dropdown">
                    <div class="task-preview--contentLabel">
                      <p class="task-preview-label">{{task.status}}</p>
                    </div>
                  </div>
                  <div
                    class="dropdown-content"
                    v-if="activeWidget === 'task-status'">
                    <ul>
                      <li
                        v-for="status in statusList"
                        :key="status"
                        @click="changeActiveWidget(status)"
                        v-bind:class="{ 'active-status': task.status === status }">
                        <span
                          class="status-type"
                          v-bind:style="{
                            borderLeft: `4px solid ${backgroundColorMap[status]}`,
                            fontWeight: 500
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
                  <div class="assigned-dropdown">
                    <div 
                      @click.stop="changeActiveWidget('addAssigneeTooltip')"  class="is-assigned-to">
                      <pre>{{ searchUser }}</pre>
                      <p class="assigned-to unassigened">
                        {{ (assignees.length ? assignees : 'unassigned') }}
                      </p>
                    </div>
                    <div
                      v-if="activeWidget === 'addAssigneeTooltip'"
                      class="assigned-dropdown--user">
                      <div class="form-group">
                        <input
                          type="text"
                          id="user"
                          name="user"
                          ref="user"
                          v-model="searchUser"
                          :autofocus="true"/>
                          <label for="user" class="control-label">Assigned to</label><i class="bar"></i>
                      </div>
                      <div class="assigned-list">
                        <ul>
                          <li
                            v-for="user in filterAssignees"
                            :key="user.id"
                            @click.stop="assignUserToTask(user.id)">
                            <c-avatar class="assigned-avatar" :obj="user" :size="32"></c-avatar>
                            <div class="assigned-list--details">
                              <span>{{user.name}}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
  props: ['data'],
  data () {
    return {
      searchUser: '',
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
    ...mapState(['taskId', 'activeWidget']),
    filterAssignees() {
      const user = this.searchUser.toLowerCase()
      const users = this.getUsers
      return users.filter((u) => {
        return !users.includes(u.id) && u.name.toLowerCase().includes(user) || u.email.toLowerCase(user)
        // return !users.includes(u.id) && (u.name.toLowerCase().includes(user) || u.email.toLowerCase().includes(user))
      })
    }
  },
  methods: {
    changeTaskStatus(status) {
      if (this.task.status === status) return
      this.updateTask({status})
    },
    assignUserToTask(id) {
      const assignees = this.data.assignees.map(o => o.id && o.name)
      console.log(assignees.name)
      assignees.push(id)
      // this.updateTask({assignees})
    },
    updateTask(input) {
      this.$apollo.mutate({
        mutation: UpdateTask,
        variables: {
          id: this.task.id,
          input
        },
      }).then(() => {
        this.$store.dispatch('changeActiveWidget', null)
      }).catch((error) => {
        console.log(error)
      })
    },
    changeActiveWidget(key) {
      this.$store.dispatch('changeActiveWidget', key)
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
    getUsers: {
      query: GetUsers,
      result({ data: {getUsers} }) {
        this.getUsers = getUsers
      },
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/modal/modal";
@import "../assets/scss/components/form/form";
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/task/taskPreview";
</style>
