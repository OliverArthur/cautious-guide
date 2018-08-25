<template>
  <section class="accounts">
      <c-grid>
        <c-grid-inner>
          <c-grid-cell
            align="middle"
            :span-desktop="3"
            :span-phone="12"
            :span-tablet="12">
            <aside class="accounts__aside">
              <div class="accounts__aside--heading">
                <h4>Groups & Users</h4>
                <h5>Groups <span class="count-title">({{getGroups.length}})</span></h5>
              </div>
              <div class="accounts__aside--body">

                <div v-for="(group, index) in groups" :key="index"
                  class="accounts__aside--item" v-bind:class="{selected: selected === index}"
                  @click="changeView(index)">
                  <span class="accounts__aside--name">
                    {{group.name}}
                    <span class="accounts__aside--count">
                      ({{index ? ungroupedUsers.length : getUsers.length}})
                    </span>
                  </span>
                </div>

                <div v-for="(group, index) in getGroups" :key="index+2"
                  class="accounts__aside--item" v-bind:class="{selected: selected === index+2}"
                  @click="changeView(index+2)">
                  <c-avatar class="avatar" :obj="group" :size="24"></c-avatar>
                  <span class="accounts__aside--name">{{group.name}}
                    <span class="accounts__aside--count">
                      ({{group.users.length}})
                    </span>
                  </span>
                </div>

              </div>
            </aside>
          </c-grid-cell>
          <c-grid-cell
            align="middle"
            :span-desktop="9"
            :span-phone="12"
            :span-tablet="12">
          </c-grid-cell>
        </c-grid-inner>
      </c-grid>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { GetUser, GetUsers, GetGroups } from '../constants/query.gql'
import CGrid from '@/components/Grid'
import CGridInner from '@/components/GridInner'
import CGridCell from '@/components/GridCell'

export default {
  name: 'Account',
  components: {
    CGrid,
    CGridInner,
    CGridCell
  },
  data() {
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
      getUsers: [],
      getGroups: [],
      styleObj: {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight - 52}px`
      }
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
    },
    filteredUsers() {
      return this.selectedRole
        ? this.users.filter(o => this.selectedRole.filter.includes(o.role))
        : this.users
    },
    ungroupedUsers() {
      const members = [].concat(...this.getGroups.map(o => o.users))
      return this.getUsers.filter(o => !members.includes(o.id))
    },
    selectedGroup() {
      return this.selected < 2
        ? this.groups[this.selected]
        : this.getGroups[this.selected-2]
    },
    ...mapState(['activeWidget'])
  },
  methods: {
    openUserDetail(user, e) {
      if (this.activeWidget !== 'userDetail') {
        this.changeActiveWidget('userDetail')
      }
      this.selectedUser = user
      e.stopPropagation()
    },
    changeView(index) {
      this.selected = index
    },
    changeRoleFilter(overview) {
      this.selectedRole = !this.selectedRole
        || this.selectedRole.name !== overview.name
        ? overview : null
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/grid/grid";
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

.accounts {
  min-height: 100vh;
  position: relative;

  .grid {
    padding-left: 0;
    padding-right: 0;
  }
  .grid, .grid__inner {
    min-height: 100vh;
  }

  &__aside {
    border-right: 0.1rem solid rgba(0, 0, 0, 0.09);
    min-height: 100vh;

    &--heading {
      padding-top: 7.5rem;
      h4 {
        padding-left: 1.5rem;
        font-size: $heading-font-h4-xs;
        font-weight: 400;
      }

      h5 {
        font-size: $heading-font-h5-xs;
        font-weight: 400;
        padding-bottom:1.5rem;
        padding-left:1.5rem;
        padding-right:1.5rem;
        padding-top: 2.6rem;
      }
    }

    &--item {
      cursor: pointer;

      span {
        align-items: center;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        font-size: 1.5rem;
        padding-bottom:1.5rem;
        padding-left:2.5rem;
        padding-right:1.5rem;
        padding-top:1.5rem;
      }

      &.selected, &:hover {
        background-color: $polo-blue;
        color: $white;
      }
    }

    &--count {
      padding: 0!important;
    }
  }
}

</style>


