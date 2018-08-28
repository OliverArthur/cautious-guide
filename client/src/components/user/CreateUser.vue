<template>
  <div class="create-user-backdrop">
    <div class="create-user">
      <div class="create-user--header">
        <h3>Add user</h3>
      </div>
      <div class="create-user--content">
        <form method="POST" @submit.prevent>
          <div class="form-group"
            v-for="(email, index) in form.email" :key="index">
            <input
              type="email"
              id="user"
              name="user"
              v-model="form.email[index]"
              :autofocus="true" required="required"
              @keyup.esc="changeActiveWidget(null)"/>
            <label for="user" class="control-label">Add user email</label><i class="bar"></i>
            <button
              class="btn btn-icon btn-icon--small btn-secondary"
              v-if="!disable"
              @click="addUser">
              <i class="material-icons">add</i>
            </button>
          </div>
          <div class="form-group">
            <select name="role" id="roles" v-model="form.role">
              <option value="Administrator">Administrator</option>
              <option value="Regular User">Regular User</option>
              <option value="Collaborator">Collaborator</option>
              <option value="External User">External User</option>
            </select>
            <label for="user" class="control-label">Role</label><i class="bar"></i>
          </div>
        </form>
      </div>
      <div class="create-user--footer">
        <div class="button-container">
          <button class="btn btn-primary" @click="invite">
            Save
          </button>
          <button class="btn btn-secondary" @click="$emit('close')">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Invite, GetUsers, GetGroups } from '../../constants/query.gql'
import { validateEmail } from '@/helpers/validation'

export default {
  name: 'CCreateUser',
  props: ['config', 'disable'],
  data() {
    return {
      form: {
        status: '',
        email: [''],
        role: 'Regular User'
      }
    }
  },
  methods: {
    changeActiveWidget(key) {
      this.$store.dispatch('changeActiveWidget', key)
    },
    close() {
      this.$emit('close');
    },
    addUser(email) {
      const fields = this.form.email
      fields.push(email)
      if (fields.length >= 4) {
        this.disable = true
      }
    },
    invite() {
      const emails = this.form.email.filter(o => !!o && validateEmail(o))

     if (emails.length === 0) {
        this.error = 'Please enter at least one valid email'
        return
      }
      this.$apollo.mutate({
        mutation: Invite,
        variables: {
          emails,
          role: this.form.role
        },
        update: (store, { data: { invite } }) => {
          try {
            const data = store.readQuery({ query: GetUsers })
            data.getUsers = data.getUsers.concat(invite)
            store.writeQuery({
              query: GetUsers,
              data
            })
          } catch(err) {
            console.log(err)
          }
        }
      }).then(() => {
        this.$emit('close')
      }).catch((error) => {
        this.error = 'Something went wrong'
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/components/buttons/button";
  @import "../../assets/scss/components/form/form";

  .create-user-backdrop {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: -8rem;
    z-index: 4444;
  }

  .create-user {
    background: $white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    display: flex;
    flex-direction: column;
    min-width: 45rem;
    overflow-x: auto;

    &--header {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;
      h3 {
        font-size: $heading-font-h3;
        font-weight: 300;
      }
    }

    &--footer {
      display: flex;
      justify-content: flex-end;
      padding: 1.5rem;

      .button-container {
        button {
          margin-right: 1.5rem;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .form-group {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      input {
        margin-right: 1rem;
      }
    }

    &--content {
      padding: 1.5rem;
      position: relative;
    }
  }
</style>
