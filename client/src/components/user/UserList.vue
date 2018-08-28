<template>
  <div class="user-list">
    <ul class="user-list--ul">

    </ul>
  </div>
</template>

<script>
  export default {
    name: 'CUserList',
    props: {
      data: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
  }
</script>
