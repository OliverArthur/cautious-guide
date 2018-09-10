<template>
  <li class="task-list">
    <span class="task-list__label">{{ task.name }}</span>
    <span class="task-list__label">{{ task.status }}</span>
    <span
      class="task-list__label"
      :class="(task.assignees.length === 0 ?  'unassigned' : 'assigned')">
      {{ (task.assignees.length ?  task.assignees : 'unassigned') }}
    </span>
    <span class="task-list__label">{{ dateTimeFormat(task.createdAt) }}</span>
    <ul v-if="task.parent && task.parent.length">
      <task-list
        v-for="child in task.parent" :task="parent"
        :key="child.id">
      </task-list>
    </ul>
  </li>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TaskList',
  props: {
    task: {
      type: Object,
      require: true
    }
  },
  methods: {
    dateTimeFormat(context) {
      return moment(context).startOf('hour').fromNow();
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/task/tasklist";
</style>
