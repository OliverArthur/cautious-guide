<template>
  <section class="user">
    <c-grid>
      <c-grid-inner>
        <c-grid-cell
          :span-desktop="4"
          :span-phone="12"
          :span-tablet="12">
          <div class="user-details">
            <div class="user-details--card">
              <div class="user-card--header">
                <div class="user-card--header-inner"
                  v-bind:style="{ backgroundColor: '#' + getData.avatar }">
                  <div class="user-card--avatar">
                    <c-avatar :hasBorder="true" class="avatar" :obj="getUser" :size="64"></c-avatar>
                  </div>
                </div>
              </div>
              <div class="user-card--body">
                <div class="user-card--body-inner">
                  <h3>{{getData.name}}</h3>
                  <strong>{{getData.role}}</strong>
                  <em>Time zone: {{ getUserTimeZone }}</em>
                </div>
              </div>
            </div>

            <div class="user-details--card"></div>
          </div>
        </c-grid-cell>
        <c-grid-cell
          :span-desktop="8"
          :span-phone="12"
          :span-tablet="12">
          <div class="user-activity">Activity</div>
        </c-grid-cell>
      </c-grid-inner>
    </c-grid>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { GetUser, GetUsers, GetGroups } from '../constants/query.gql'
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
      user: {},
      timeZone: ''
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
      return this.user = {
        name: this.getUser.name,
        email: this.getUser.email,
        avatar: this.getUser.avatarColor,
        role: this.getUser.role,
        occupation: this.getUser.jobTitle
      }
    },
    getUserTimeZone () {
      return this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
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
}

.user-details {
  padding-top: 7rem;
  min-height: 100vh;
}

.user-details--card {
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
</style>

