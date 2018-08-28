<template>
  <article class="user-details">
    <div class="user-details--content">
      <header class="user-details--avatar">
        <c-avatar class="avatar" :obj="user" :size="144"></c-avatar>
        <span>{{ user.name }}</span>
        <span>{{ user.jobTitle }}</span>
        <!-- TIME -->
      </header>
      <dic class="user-details--fields">
        <c-grid>
          <c-grid-inner>
            <c-grid-cell
              :span-desktop="3"
              :span-phone="12"
              :span-tablet="12">
            </c-grid-cell>
            <c-grid-cell
              :span-desktop="9"
              :span-phone="12"
              :span-tablet="12">
            </c-grid-cell>
          </c-grid-inner>
        </c-grid>
      </dic>
    </div>
  </article>
</template>

<script>
import moment from 'moment'
import CGrid from '@/components/Grid'
import CGridInner from '@/components/GridInner'
import CGridCell from '@/components/GridCell'
import { UpdateUser } from  '@/constants/query.gql'

export default {
  name: 'CUserDetail',
  props: ['user', 'groups', 'currentUser'],
  data() {
    const { role } = this.user
    return {
      activeTab: 'settings',
      showSettingsForm: false,
      notify: true,
      form: {
        role,
        rate,
        rateType
      }
    }
  },
  components: {
    CGrid,
    CGridInner,
    CGridCell
  },
  computed: {
    userGroups() {
      const id = this.user.id
      return this.groups.filter(o => o.users.includes(id))
    },
    rateLabel() {
      if (this.form.rateType === 'Hour') {
        return 'Rate'
      } else if (this.form.rateType === 'Month') {
        return 'Salary'
      } else {
        return 'Rate/Salary'
      }
    }
  },
  methods: {
    formateDate(date) {
      return moment(date).format('MMM DD, YYYY')
    },
    updateUser() {
      this.$apollo.mutate({
        mutation: UpdateUser,
        variables: {
          id: this.user.id,
          input: this.form
        },
      }).then(() => {
        this.showSettingsForm = false
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

