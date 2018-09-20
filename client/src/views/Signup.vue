<template>
  <section class="signup">
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
          <div class="signup__form">
            <h3>
              Welcome to Logo! your are just only one step to finish setting up your account.
            </h3>
            <form method="POST" @submit.prevent>
              <!-- <div class="form-group">
                <input id="workspace" type="text" v-model="form.workspace" required="required"/>
                <label for="workspace" class="control-label">Workspace name</label><i class="bar"></i>
              </div> -->
              <div class="form-group">
                <input id="firstname" type="text" v-model="form.firstname" required="required"/>
                <label for="firstname" class="control-label">Your first name</label><i class="bar"></i>
              </div>
              <div class="form-group">
                <input id="lastname" type="text" v-model="form.lastname" required="required"/>
                <label for="lastname" class="control-label">Your last name</label><i class="bar"></i>
              </div>
              <div class="form-group">
                <input id="password" type="password" v-model="form.password" autocomplete="current-password" required="required"/>
                <label for="password" class="control-label">Password</label><i class="bar"></i>
              </div>
              <div class="button-container">
                <button class="btn btn--primary" @click="signUp">
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
      :type="[error ? 'error' : submitted ? 'success' : '']">
      {{ status }}
    </c-toast>
  </section>
</template>

<script>
import { Signup } from '../constants/query.gql'

export default {
  name: 'Signup',
  data () {
    return {
      submitted: false,
      error: false,
      status: '',
      form: {
        // workspace: '',
        firstname: '',
        lastname: '',
        password: ''
      }
    }
  },
  computed: {
    /**
     * Method to reset the toast value after the promise has been completed
     *
     * TODO: move this to a helper function or use `bus` event
     */
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

      // clean the apollo cache before do it anything
      this.$apollo.provider.clients.defaultClient.cache.reset()

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
        this.$store.dispatch({
          type: 'setUser',
          firstname:  this.form.firstname,
          lastname:  this.form.lastname
        })
        this.saveUserData(id, token)
        this.submitted = true
        this.status = 'Your account has been created successfully'
        this.resetToast
        this.$router.push({name: 'workspace'})
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
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

.signup,
.signup .grid,
.signup .grid__inner {
  min-height: 100vh;
}

.signup h3 {
  font-size: $heading-font-h5-xs;
  font-weight: 400;
}

.btn {
  width: 100%;
}
</style>

