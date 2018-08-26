export default {
  methods: {
    changeRoleFilter (overview) {
      this.selectedRole = !this.selectedRole ||
        this.selectedRole.name !== overview.name ?
        overview : null
    }
  }
}
