<template>
  <ul>
    <li class="user-list-item"
      :dataList="dataList"
      v-for="user in dataList"
      :key="user.id">
      <router-link  :to="{ name: 'user', params: { userId: user.id }}" :title="`View ${user.name} profile`">
        <span class="user-list-item--span">
          <c-avatar class="avatar" :obj="user" :size="32"></c-avatar>
          {{user.name}}
        </span>
        <span class="user-list-item--span">{{user.email}}</span>
        <span class="user-list-item--span">{{user.role}}</span>
        <span class="user-list-item--span">
          <strong v-bind:class="user.status">{{user.status}}</strong>
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'CUserListItem',
    props: {
      dataList: {
        type: Array,
        default: () => {
          return {}
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
 ul {
  display: flex;
  flex-direction: column;
 }

 .user-list-item {
    a {
      color: $tundora;
      display: flex;
      flex-direction: row;
      padding: 1.5rem;
      text-decoration: none;
    }
    a:hover {
      background-color: $silver-clear;
    }
 }

 .user-list-item--span {
   display: flex;
   font-size: 1.5rem;

  &:nth-child(1) {
    position: relative;
    flex-basis: 20%;
    text-align: left;
    padding-left: 4rem;
    .avatar {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  &:nth-child(2) {
    flex-basis: 40%;
    text-align: left;
  }
  &:nth-child(3) {
    flex-basis: 20%;
    justify-content: center;
  }
  &:nth-child(4) {
    flex-basis: 20%;
    justify-content: center;

    .Active {
      background-color: $sushi;
      border-radius: $border-radius;
      color: $white;
      font-weight: 500;
      padding: 0.8rem;
    }
    .Pending {
      background-color: $cream-can;
      border-radius: $border-radius;
      font-weight: 500;
      padding: 0.8rem;
    }
  }
 }
</style>

