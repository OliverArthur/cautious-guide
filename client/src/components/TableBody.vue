<template>
  <div class="table-body" :data="data">
    <div class="table-body--row" v-for="item in formatterData" :key="item.id">
      <span v-if="item.name" class="table-body--column">
        <c-avatar class="avatar" :obj="item" :size="32"></c-avatar>
        {{ item.name }}
      </span>
      <span v-if="item.email" class="table-body--column">{{ item.email }}</span>
      <span v-if="item.role" class="table-body--column">{{ item.role }}</span>
      <span v-if="item.status" class="table-body--column">{{ item.status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CTableBody',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
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
}
</script>

<style lang="scss" scoped>
.table-body {
  display: flex;
  flex-direction: column;
  &--row {
    display: flex;
    flex-direction: row;

    span {
      display: flex;
      font-size: 1.6rem;
      font-weight: 300;
      padding: 1.5rem;
      .avatar {
        left: 0;
        padding: 0;
        position: absolute;
        top: 0.3rem;
      }
    }
  }
  &--column {
    &:nth-child(1) {
      flex-basis: 20%;
      text-align: left;
      padding-left: 3.8rem;
      position: relative;
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
    }
  }
}
</style>
