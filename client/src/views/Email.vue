<template>
  <section class="email">
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
          <div class="email__form">
            <strong>Try Logo for free. No credit card needed.!</strong>
            <h3>
              Enter your email address to start using Logo
            </h3>
            <form method="POST" @submit.prevent>
              <div class="form-group">
                <input id="email" type="email" v-model="form.email" autocomplete="email" required="required"/>
                <label for="email" class="control-label">Email</label><i class="bar"></i>
              </div>
              <div class="button-container">
                <button class="btn btn--primary" @click="getUserEmail">
                  Create my logo account!
                </button>
              </div>
            </form>
            <div class="email--links">
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
      :type="[error ? 'error' : submitted ? 'success' : '']">
      {{ status }}
    </c-toast>
  </section>
</template>

<script>
import { CaptureEmail } from '../constants/query.gql'
import { validateEmail } from '@/helpers/validation'

export default {
  name: 'email',
  data () {
    return {
      submitted: false,
      error: false,
      status: '',
      form: {
        email: ''
      }
    }
  },
  computed: {
    /**
     * Method to reset the toast value after the promise has been completed
     *
     * TODO: move this to a helper function or use `bus` event
     */
    resetToast () {
      if (this.submitted || this.error) {
        setTimeout(() => {
          this.submitted = false,
          this.error = false,
          this.status = ''
        }, 3000)
      }
    },
  },
  methods: {
    /**
     * @method getUserEmail
     *
     * @description Method to get the email address for a new joiner
     * if the email are not use it, apollo will make the capture email
     * and send the email confirmation to the new user with the link
     * for the second step
     *
     * @memberOf Email
     *
     * @returns *
     */
    getUserEmail () {
      const { email } = this.form

      if (!email || !validateEmail(email)) {
        this.error = true
        this.status = 'Please enter a valid email'
        this.resetToast
        return
      }

      this.$apollo.mutate({
        mutation: CaptureEmail,
        variables: { email }
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
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/form/form";

.email,
.email .grid,
.email .grid__inner {
  min-height: 100vh;
}

.email h3 {
  font-size: $heading-font-h6-xs;
  font-weight: 300;
}

.email strong {
  display: inline-block;
  margin-bottom: $heading-font-h6;
  font-size: $heading-font-h6;
  font-weight: 300;
}

.email--links {
  margin-top: 2.4rem;
  text-align: center;
}

.email--links p {
  font-size: 1.6rem;
  display: inline-block;
}

.email--links a {
  font-size: 1.6rem;
  margin-left: 0.5rem;
}

.btn {
  width: 100%;
}

</style>
