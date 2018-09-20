<template>
  <div class="task">
    <div class="task__header">
      <span>Title</span>
      <span>Status</span>
      <span>Created by</span>
      <span>Assigned to</span>
      <span>Created</span>
    </div>
    <ul class="project__list">
      <task-list
        v-for="item in taskData"
        :key="item.id"
        :task="item">
      </task-list>
    </ul>
  </div>
</template>

<script>
import TaskList from '@/components/Tasklist'

export default {
  name: 'Task',
  props: {
    taskData: {
      type: Array,
      require: true
    },
  },
  components: {
    TaskList
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/task/task";
</style>

