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
import ComputedMixins from '@/mixins/computed-mixins'
import MethodMixins from '@/mixins/method-mixins'
import { GetUser, GetUsers, GetGroups } from '../constants/query.gql'

export default {
  name: 'CLabel',
  mixins: [Data, ComputedMixins, MethodMixins],
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
    &.active{
      background-color: $polo-blue;
      color: $white;

      &:hover {
        background-color: $polo-blue;
        color: $white;
      }
    }

    &:hover {
      background-color: $silver-clear;
      color: $tundora;
    }

    span {
      display: inline-block;
      padding: 0.8rem;
      font-size: 1.5rem;
    }
  }
}
</style>
