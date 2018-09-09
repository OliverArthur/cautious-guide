<template>
  <li
    class="project-list">
    <router-link :to="{name: 'project', params: {id: project.id}}">
      <span class="project-list__label"><i class="material-icons">folder</i> {{ project.name }}</span>
    </router-link>
    <ul v-if="project.parent && project.parent.length">
      <project-list
        v-for="child in project.parent" :project="parent"
        :key="child.id">
      </project-list>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'ProjectList',
  props: {
    project: {
      type: Object,
      require: true
    },
    team: {
      type: String,
      require: false
    }
  }
}
</script>

<style lang="scss" scoped>
.project-list {
  padding: 1.2rem 1.5rem;
  &:hover{
    background-color: $silver;
  }
}

.project-list a {
  color: $tundora;
  text-decoration: none;
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
