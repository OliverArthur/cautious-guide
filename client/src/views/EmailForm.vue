<template>
  <article class="email-form">
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
          <div class="email-form--column">
            <strong>Try Logo for free. No credit card needed.!</strong>
            <h3>
              Enter your email address to start using Logo
            </h3>
          </div>
          <div class="email-form--column">
            <form method="POST" @submit.prevent>
              <div class="form-group">
                <input id="email" type="email" v-model="form.email" autocomplete="email" required="required"/>
                <label for="email" class="control-label">Email</label><i class="bar"></i>
              </div>
              <div class="button-container">
                <button class="btn btn-primary" @click="getEmail">
                  Create my logo account!
                </button>
              </div>
            </form>
            <div class="email-form--links">
              <p>Already have a logo account? <router-link :to="{name: 'login'}">Login</router-link></p>
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
  </article>
</template>

<script>
import CGrid from '@/components/grid/Grid'
import CGridInner from '@/components/grid/GridInner'
import CGridCell from '@/components/grid/GridCell'
import { CaptureEmail } from '../constants/query.gql'
import { validateEmail } from '@/helpers/validation'

export default {
  name: 'EmailForm',
  data() {
    return {
      submitted: false,
      error: false,
      status: '',
      form: {
        email: ''
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
    getEmail() {

      const {email} = this.form

      if (!email || !validateEmail(email)) {
        this.error = true
        this.status = 'Please enter a valid email'
        this.resetToast
        return
      }

      this.$apollo.mutate({
        mutation: CaptureEmail,
        variables: { email },
      }).then(({ data }) => {
        this.submitted = true
        this.error = false
        this.status = 'Thank you! Please check your email.'
        this.resetToast
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/grid/grid";
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

.email-form{
  min-height: 100vh;
  .grid, .grid__inner {
    min-height: 100vh;
  }

  &--column {
    strong {
      display: inline-block;
      margin-bottom: $heading-font-h6;
      font-size: $heading-font-h6;
      font-weight: 300;
    }

    h3 {
      font-size: $heading-font-h6-xs;
      font-weight: 300;
    }

  }

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

  .btn {
    width: 100%;
  }

}
</style>
