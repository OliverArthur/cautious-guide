export default {
  computed: {
    users () {
      if (this.selected === 0) {
        return this.getUsers
      } else if (this.selected === 1) {
        return this.ungroupedUsers
      } else {
        return this.getUsers.filter(o => this.getGroups[this.selected - 2].users.includes(o.id))
      }
    },
    allLabels () {
      this.labels = ['name', 'email', 'role', 'status']
      return this.labels
    },
    filteredUsers () {
      console.log(this.selectedRole)
      return this.selectedRole
        ? this.users.filter(o => this.selectedRole.filter.includes(o.role))
        : this.users
    },
    ungroupedUsers () {
      const members = [].concat(...this.getGroups.map(o => o.users))
      return this.getUsers.filter(o => !members.includes(o.id))
    },
    selectedGroup () {
      return this.selected < 2
        ? this.groups[this.selected]
        : this.getGroups[this.selected - 2]
    }
  }
}
