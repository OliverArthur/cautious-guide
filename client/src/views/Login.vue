<template>
  <article class="login">
    <div class="login__body">
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
            <div class="login__body--column">
              <h3>
                Log in
              </h3>
            </div>
            <div class="login__body--column">
              <form method="POST" @submit.prevent>
                <div class="form-group">
                  <input id="email" type="text" v-model="form.email" autocomplete="email" required="required"/>
                  <label for="email" class="control-label">Your email address</label><i class="bar"></i>
                </div>
                <div class="form-group">
                  <input id="password" type="password" v-model="form.password" autocomplete="current-password" required="required"/>
                  <label for="password" class="control-label">Password</label><i class="bar"></i>
                </div>
                <div class="button-container">
                  <button class="btn btn-primary" @click="login">
                    Log in!
                  </button>
                </div>
              </form>
              <div class="login__body--links">
                <p>Don't have an account? <router-link :to="{name: 'create-account'}">Create account</router-link></p>
              </div>
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
import { Login } from '../constants/query.gql'
import CGrid from '@/components/Grid'
import CGridInner from '@/components/GridInner'
import CGridCell from '@/components/GridCell'

export default {
  name: 'Login',
  data() {
    return {
      submitted: false,
      error: false,
      status: '',
      form: {
        email: '',
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
    async login() {
      this.$apollo.provider.clients.defaultClient.cache.reset()
      const { email, password } = this.form
      if (email && password) {
        this.$apollo.mutate({
          mutation: Login,
          variables: {
            email,
            password
          }
        }).then(async (data) => {
          const login = data.data.login
          const id = login.user.id
          const token = login.token
          this.saveUserData(id, token)
          this.submitted = true
          this.status = 'Your has been login successfully'
          this.resetToast
          this.$router.push({name: 'workspace'})
        }).catch((err) => {
          if (err.graphQLErrors.length >= 1) {
            this.error = true
            this.status = err.graphQLErrors[0].message
            this.resetToast
          } else {
            this.error = true
            this.status = 'Invalid email or password'
            this.resetToast
          }
          throw new Error(err)
        })
      }
    },
    saveUserData (id, token) {
      localStorage.setItem('user-id', id)
      localStorage.setItem('user-token', token)
      this.$root.$data.userId = localStorage.getItem('user-id')
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/grid/grid";
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

.login{
  min-height: 100vh;
  .grid, .grid__inner {
    min-height: 100vh;
  }

  h3 {
    font-size: $heading-font-h5-xs;
    font-weight: 400;
  }

  &__body {
    &--links {
      margin-top: 2.4rem;
      text-align: center;
      p {
        font-size: 1.6rem;
        display: inline-block;
        a {
          font-size: 1.6rem;
          margin-left: 0.5rem;
        }
      }
    }
  }

  .btn {
    width: 100%;
  }
}
</style>
