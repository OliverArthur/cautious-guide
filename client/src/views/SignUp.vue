<template>
  <article class="signup">
    <div class="signup__body">
      <c-grid>
        <c-grid-inner>
          <c-grid-cell
            align="middle"
            :span-desktop="4"
            :span-phone="12"
            :span-tablet="12">
          </c-grid-cell>
          <c-grid-cell
            align="middle"
            :span-desktop="4"
            :span-phone="12"
            :span-tablet="12">
            <div class="signup__body--column">
              <h3>
                Welcome to Logo! your are just only one step to finish setting up your account.
              </h3>
            </div>
            <div class="signup__body--column">
              <form method="POST" @submit.prevent>
                <div class="form-group">
                  <input id="firstname" type="text" v-model="form.firstname" required="required"/>
                  <label for="firstname" class="control-label">Your first name</label><i class="bar"></i>
                </div>
                <div class="form-group">
                  <input id="lastname" type="text" v-model="form.lastname" required="required"/>
                  <label for="lastname" class="control-label">Your last name</label><i class="bar"></i>
                </div>
                <div class="form-group">
                  <input id="password" type="text" v-model="form.password" autocomplete="current-password" required="required"/>
                  <label for="password" class="control-label">Password</label><i class="bar"></i>
                </div>
                <div class="button-container">
                  <button class="btn btn-primary" @click="signUp">
                    Complete !
                  </button>
                </div>
              </form>
            </div>
          </c-grid-cell>
          <c-grid-cell
            align="middle"
            :span-desktop="4"
            :span-phone="12"
            :span-tablet="12">
          </c-grid-cell>
        </c-grid-inner>
      </c-grid>
      <c-toast
        v-if="submitted || error"
        :modifier="[error ? 'toast--error' : submitted ? 'toast--success' : '']">
        {{ status }}
      </c-toast>
    </div>
  </article>
</template>

<script>
import { Signup } from '../constants/query.gql'
import CGrid from '@/components/Grid'
import CGridInner from '@/components/GridInner'
import CGridCell from '@/components/GridCell'

export default {
  name: 'Signup',
  data() {
    return {
      submitted: false,
      error: false,
      status: '',
      form: {
        firstname: '',
        lastname: '',
        password: ''
      }
    }
  },
  components: {
    CGrid,
    CGridInner,
    CGridCell
  },
  computed: {
    resetToast() {
      if (this.submitted || this.error) {
        setTimeout(() => {
          this.submitted = false,
          this.error = false,
          this.status = ''
        }, 3000)
      }
    }
  },
  methods: {
    async signUp() {
      const { firstname, lastname, password } = this.form
      if (!(firstname && lastname && password)) {
        this.error = true
        this.status = 'Please complete the form'
        this.resetToast
        return
      }

      this.$apollo.mutate({
        mutation: Signup,
        variables: {
          id: this.$route.params.id,
          firstname,
          lastname,
          password
        }
      }).then(( {data: {signup}}) => {
        const id = signup.user.id
        const token = signup.token
        this.saveUserData(id, token)
        this.submitted = true
        this.status = 'Your account has been created successfully'
        this.resetToast
        // this.$router.push({name: 'workspace'})
      }).catch((err) => {
        if (err.graphQLErrors.length >= 1) {
          this.error = true
          this.status = err.graphQLErrors[0].message
          this.resetToast
        } else {
          this.error = true
          this.status = 'Something went wrong'
          this.resetToast
        }
        throw new Error(err)
      })
    },

    saveUserData(id, token) {
      localStorage.setItem('user-id', id)
      localStorage.setItem('user-token', token)
      this.$root.$data.userId = localStorage.getItem('user-id')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/grid/grid";
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

.signup{
  min-height: 100vh;
  .grid, .grid__inner {
    min-height: 100vh;
  }

  h3 {
    font-size: $heading-font-h5-xs;
    font-weight: 400;
  }

  .btn {
    width: 100%;
  }
}
</style>

