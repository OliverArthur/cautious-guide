export default {
  methods: {
    changeRoleFilter(obj) {
      this.selectedRole = !this.selectedRole ||
        this.selectedRole.name !== obj.name ? obj : null
    }
  }
}
