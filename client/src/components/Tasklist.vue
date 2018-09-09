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
.task-list {
  display: flex;
  flex-direction: row;
  padding: 1.5rem;
  border-bottom: 0.1rem solid rgba(0, 40, 100, 0.12);
  &:hover{
    background-color: $silver;
  }
}

.task-list a {
  color: $tundora;
  text-decoration: none;
}

.task-list span {
  display: flex;
  font-size: 1.5rem;
  color: $tundora;
  text-decoration: none;
}

.task-list span:nth-child(1) {
  width: 40%;
  text-align: left;
  justify-content: flex-start;
  align-items: flex-start;
}

.task-list span:nth-child(2) {
  width: 20%;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.task-list span:nth-child(3) {
  width: 10%;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.task-list span:nth-child(4) {
  width: 30%;
  text-align: right;
  justify-content: flex-end;
  align-items: flex-end;
}


.task-list .unassigned {
  padding: 1rem;
  background-color: $cosmos;
  color: $white;
  border-radius: $border-radius;
}

.project-list__label {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  i {
    padding-right: 1.2rem;
  }
}
</style>
