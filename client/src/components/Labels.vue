<template>
  <div class="labels">
    <button
      v-bind:class="{active: selectedRole && selectedRole.name === obj.name}"
      v-for="obj in usersOverviews"
      :key="obj.name"
      @click="changeRoleFilter(obj)"
      class="btn btn-plain labels">
      <span>
        {{ obj.name }}
        <span>({{ users.filter(o => obj.filter.includes(o.role)).length }})</span>
      </span>
    </button>
  </div>
</template>

<script>
import Data from '@/mixins/data-mixins'
import { GetUser, GetUsers, GetGroups } from '../constants/query.gql'

export default {
  name: 'CLabel',
  mixins: [Data],
  props: {
    obj: {
      type: Array
    }
  },
  apollo: {
    getUser: {
      query: GetUser,
      variables: {},
    },
    getUsers: {
      query: GetUsers
    },
    getGroups: {
      query: GetGroups
    }
  },
  computed: {
    users() {
      if (this.selected === 0) {
        return this.getUsers
      } else if (this.selected === 1) {
        return this.ungroupedUsers
      } else {
        return this.getUsers.filter(o => this.getGroups[this.selected-2].users.includes(o.id))
      }
    }
  },
  methods: {
    changeRoleFilter(overview) {
      this.selectedRole = !this.selectedRole
        || this.selectedRole.name !== overview.name
        ? overview : null
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
.labels {
  button {
    box-shadow: $box-shadow;
    margin-right: 1.5rem;
    &:last-child {
      margin-right: 0;
    }
    &:hover, &.active {
      background-color: $polo-blue;
      color: $white;
    }
    span {
      display: inline-block;
      padding: 0.8rem;
      font-size: 1.5rem;
    }
  }
}
</style>
