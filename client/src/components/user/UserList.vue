<template>
  <div class="user-list">
    <div class="user-list--content" :data="data">
      <CUserListHeader :label="allLabels"/>
      <c-user-list-item :dataList="data" :elmClick="handleClick"></c-user-list-item>
    </div>
  </div>
</template>

<script>
  import CUserListHeader from '@/components/user/UserListHeader'
  import CUserListItem from '@/components/user/UserListItem'

  export default {
    name: 'CUserList',
    props: {
      data: {
        type: Array,
        default: () => {
          return {}
        },
      },
      isOdd: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        allLabels: ['NAME', 'EMAIL', 'ROLE', 'STATUS']
      }
    },
    computed: {
      formatterData() {
        const arr = this.data
        return arr.map((item) => Object.assign({}, item, {
          name: item.name,
          email: item.email,
          role: item.role,
          status: item.status,
        }))
      }
    },
    methods: {
      handleClick(context) {
        console.log(context)
        this.$emit('openUserDetail', context)
      }
    },
    components: {
      CUserListHeader,
      CUserListItem
    }
  }
</script>

<style lang="scss" scoped>
  .user-list {
    margin-top: 3rem;
  }
  .user-list--content {
    display: flex;
    flex-direction: column;
  }
</style>
