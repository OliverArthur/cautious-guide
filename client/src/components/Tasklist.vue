<template>
  <li class="task-list">
      <a role="button" @click="setTaskID(task.id); openModal();">
        <span class="task-list__label">{{ task.name }}</span>
        <span class="task-list__label">{{ task.status }}</span>
        <span class="task-list__label">{{ task.creator.firstname }} {{ task.creator.lastname }}</span>
        <span
          class="task-list__label"
          :class="(task.assignees.length === 0 ?  'unassigned' : 'assigned')">
          {{ (task.assignees.length ?  task.assignees[0].name : 'unassigned') }}
        </span>
        <span class="task-list__label">{{ dateTimeFormat(task.createdAt) }}</span>
      </a>
    <ul v-if="task.parent && task.parent.length">
      <task-list
        v-for="child in task.parent" :task="parent"
        :key="child.id">
      </task-list>
    </ul>
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import { EventBus } from '@/helpers/eventBus'

export default {
  name: 'TaskList',
  props: {
    task: {
      type: Object,
      require: true
    },
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    ...mapActions(['setTaskID']),
    dateTimeFormat(context) {
      return moment(context).startOf('hour').fromNow();
    },
    openModal() {
      this.isOpen = true
      EventBus.$emit('open-modal', this.isOpen);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/task/tasklist";
</style>
