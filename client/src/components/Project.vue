<template>
  <div class="project">
    <ul class="project__list">
      <project-list
        v-for="item in projectData"
        :key="item.id"
        :project="item"
        :team="teamData.id">
      </project-list>
    </ul>
  </div>
</template>

<script>
import ProjectList from '@/components/Projectlist'

export default {
  name: 'Project',
  props: {
    projectData: {
      type: Array,
      require: true
    },
    teamData: {
      type: Object,
      require: false
    }
  },
  components: {
    ProjectList
  }
}
</script>

<style lang="scss" scoped>
.project {
  margin-top: 2.6rem;
}
</style>

