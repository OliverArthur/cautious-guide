<template>
  <div class="create-user-backdrop">
    <div class="create-user">
      <div class="create-user--header">
        <h3>Add user</h3>
      </div>
      <div class="create-user--content">
        <form method="POST" @submit.prevent>
          <div class="form-group">
            <input
              type="email"
              id="user"
              name="user"
              v-model="form.email"
              :autofocus="true" required="required"/>
            <label for="user" class="control-label">Add user email</label><i class="bar"></i>
          </div>
        </form>
      </div>
      <div class="create-user--footer">
        <div class="button-container">
          <button class="btn btn-primary">
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
import { CreateFolder, GetFolders } from '../constants/query.gql'

export default {
  name: 'CCreateUser',
  props: ['config'],
  data() {
    return {
      form: {
        email: '',
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/components/buttons/button";
  @import "../assets/scss/components/form/form";

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

    &--content {
      padding: 1.5rem;
      position: relative;
    }
  }
</style>
