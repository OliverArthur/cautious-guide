<template>
  <section class="user">
    <c-grid>
      <c-grid-inner>
        <c-grid-cell
          :span-desktop="3"
          :span-phone="12"
          :span-tablet="12">
          <div class="user-details">
            <div class="user-card">
              <div class="user-card--header">
                <div class="user-card--header-inner"
                  v-bind:style="{ backgroundColor: '#' + getData.avatarColor }">
                  <div class="user-card--avatar">
                    <c-avatar :hasBorder="true" class="avatar" :obj="getUser" :size="64"></c-avatar>
                  </div>
                </div>
              </div>
              <div class="user-card--body">
                <div class="user-card--body-inner">
                  <h3>{{getUser.name}}</h3>
                  <strong>{{getData.role}}</strong>
                  <em>Time zone: {{ getUserTimeZone }}</em>
                </div>
              </div>
            </div>

            <div class="user-card other-card">
              <div class="user-card--header">
                <div class="user-card--header-inner">
                  <h3>Main Details</h3>
                </div>
              </div>
              <div class="user-card--body">
                <div class="user-card--body-inner">
                  <h3><i class="material-icons">email</i> {{getUser.email}}</h3>
                  <strong><i class="material-icons">work</i> {{getData.jobTitle}}</strong>
                  <em><i class="material-icons">calendar_today</i> Member since: {{dateTimeFormat(getData.createdAt)}}</em>
                </div>
              </div>
            </div>
          </div>
        </c-grid-cell>
        <c-grid-cell
          :span-desktop="4"
          :span-phone="12"
          :span-tablet="12">
          <div class="user-profile other-card">
            <div class="user-card">
              <div class="user-card--header">
                <div class="user-card--header-inner">
                  <h3>Edit profile</h3>
                </div>
              </div>
              <div class="user-card--body">
                <div class="user-card--body-inner has-form">
                  <form method="POST" @submit.prevent>
                    <div class="form-group">
                      <input id="email" type="email" v-model="form.email" autocomplete="email"/>
                      <label for="email" class="control-label">Email</label>
                      <i class="bar"></i>
                    </div>
                    <div class="form-group">
                      <select name="role" id="roles" v-model="form.role">
                        <option v-bind:value="form.role">Administrator</option>
                        <option v-bind:value="form.role">Regular User</option>
                        <option v-bind:value="form.role">Collaborator</option>
                        <option v-bind:value="form.role">External User</option>
                      </select>
                      <label for="user" class="control-label">Role</label><i class="bar"></i>
                    </div>
                    <div class="form-group">
                      <input id="jobTitle" type="text" v-model="form.jobTitle"/>
                      <label for="jobTitle" class="control-label">Job title</label>
                      <i class="bar"></i>
                    </div>
                    <div class="form-group">
                      <input id="password" type="password" v-model="form.password" autocomplete="current-password"/>
                      <label for="password" class="control-label">Password</label>
                      <i class="bar"></i>
                    </div>
                    <div class="button-container">
                      <button class="btn btn-primary btn-icon--notRadius" @click="updateUser">
                        <i class="material-icons">update</i> Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </c-grid-cell>
        <c-grid-cell
          :span-desktop="5"
          :span-phone="12"
          :span-tablet="12">
          <div class="user-profile other-card">
            <div class="user-card">
              <div class="user-card--header">
                <div class="user-card--header-inner">
                  <h3>Last activity</h3>
                </div>
              </div>
              <div class="user-card--body">
                <div class="user-card--body-inner">
                  <h3>
                    This user does not have any activity yet!
                    <i class="material-icons">sentiment_dissatisfied</i>
                  </h3>
                </div>
              </div>
            </div>
          </div>

        </c-grid-cell>
      </c-grid-inner>
    </c-grid>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import {UpdateUser, GetUser, GetUsers, GetGroups } from '../constants/query.gql'
import CGrid from '@/components/grid/Grid'
import CGridInner from '@/components/grid/GridInner'
import CGridCell from '@/components/grid/GridCell'

export default {
  name: 'Profile',
  components: {
    CGrid,
    CGridInner,
    CGridCell
  },
  data() {
    return {
      timeZone: '',
      form: {
        createdAt: '',
        email: '',
        firstname: '',
        jobTitle: '',
        lastname: '',
        name: '',
        password: '',
        role: '',
        status: '',
        team: ''
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
    getData () {
      return this.form = {
        name: this.getUser.name,
        email: this.getUser.email,
        avatarColor: this.getUser.avatarColor,
        role: this.getUser.role,
        jobTitle: this.getUser.jobTitle,
        createdAt: this.getUser.createdAt,
        password: this.getUser.password
      }
    },
    getUserTimeZone () {
      return this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  },
  methods: {
    dateTimeFormat(context) {
      return moment(context).format('MMM DD, YYYY')
    },

    updateUser() {
      this.$apollo.mutate({
        mutation: UpdateUser,
        variables: {
          id: this.getUser.id,
          input: this.form
        }
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/grid/grid";
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

.user {
  min-height: 100vh;
  position: relative;

  .grid {
    padding-left: 1.5rem;
  }
  .grid, .grid__inner {
    min-height: 100vh;
  }

  .user-details{
    padding-top: 7rem;
    min-height: 100vh;
  }

  .user-profile {
    margin-top: 7rem;
  }
}

.user-card {
  background-color: $white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

.user-card--header {
  position: relative;
}

.user-card--header-inner {
  width: 100%;
  min-height: 14rem;
}

.user-card--avatar {
  position: absolute;
  top: 10rem;
  left: 50%;
  margin-left: -3.2rem;

  .avatar .avatar--core{
    border: 0.1rem solid $white;
  }
}

.user-card--body-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2.5rem;
  margin-top: 4rem;
  padding-bottom: 4rem;

  h3 {
    font-size: $heading-font-h4-xs;
    font-weight: 400;
  }

  strong {
    font-size: 1.6rem;
    font-weight: 400;
  }

  em {
    font-size: 1.5rem;
    font-weight: 300;
  }
}

.other-card {
  margin-top: 2rem;

  .user-card--header-inner {
    background-color: $silver-clear;
    color: $tundora;
    min-height: inherit;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.5rem;
  }

  .user-card--body-inner {
    h3, strong, em {
      align-items: center;
      display: flex;
      line-height: 3.4rem;
      i {
        padding-right: 0.8rem;
      }
    }
    h3 {
      font-size: 2rem;
      padding: 0;
      font-weight: 300;
    }
    strong {
      font-size: 1.5rem;
      font-weight: 200;
    }
  }

  form {
    width: 100%;
    padding: 0 1.5rem;
  }

}

.user-card--body-inner.has-form {
  margin-top: 0;
}
</style>
