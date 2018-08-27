export default {
  data () {
    return {
      selected: 0,
      selectedRole: null,
      selectedUser: null,
      showGroupForm: false,
      showGroupUpdateForm: false,
      showInviteUserForm: false,
      showAddUsersToGroupForm: false,
      groups: [{
        name: 'All users'
      }, {
        name: 'Ungrouped'
      }],
      usersOverviews: [{
        name: 'Administrators',
        filter: ['Owner', 'Administrator']
      }, {
        name: 'Regular Users',
        filter: ['Regular User']
      }, {
        name: 'Collaborators',
        filter: ['Collaborator']
      }, {
        name: 'External Users',
        filter: ['External User']
      }],
      getUser: {},
      labels: [],
      getUsers: [],
      getGroups: [],
      showModal: false,
      modalConfig: {},
      getFolders: [],
      getTeam: {},
      styleObj: {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight - 52}px`
      }
    }
  }
}
