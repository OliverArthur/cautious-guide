<template>
  <div class="task">
    <div class="task__header">
      <span>Title</span>
      <span>Status</span>
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
.task {
  margin-top: 7.6rem;
  background-color: $white;
  border: 0.1rem solid rgba(0, 40, 100, 0.12);
}
.task__header {
  border-bottom: 0.1rem solid rgba(0, 40, 100, 0.12);
  display: flex;
  flex-direction: row;
  padding: 1.5rem;
}

.task__header span{
  display: flex;
  font-size: $heading-font-h6-xs;
}

.task__header span:nth-child(1) {
  width: 40%;
  text-align: left;
  justify-content: flex-start;
  align-items: flex-start
}

.task__header span:nth-child(2) {
  width: 20%;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.task__header span:nth-child(3) {
  width: 10%;
  text-align: center;
  justify-content: center;
  align-items: center
}

.task__header span:nth-child(4) {
  width: 30%;
  text-align: right;
  justify-content: flex-end;
  align-items: flex-end;
}
.project__list {
  display: flex;
  flex-direction: column;
}
</style>

