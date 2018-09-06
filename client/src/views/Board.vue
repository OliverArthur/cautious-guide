<template>
  <section class="board">
    <div class="board--empty">
      <div class="intro" v-if="showForm">
        <p>Hi {{getUser.firstname}}, I think you may be experiencing one of these two things:</p>
        <ul>
          <li>
            Maybe you do not have the right permission to be able to see the content
            <i class="material-icons">block</i>
          </li>
          <li>
            Or around here there is nothing yet.
            <i class="material-icons">sentiment_very_dissatisfied</i>
          </li>
          <li>
            <button class="btn btn-outline btn-icon--notRadius">
              Add new task
              <i class="material-icons">add</i>
            </button>
          </li>
        </ul>
      </div>
      <CTaskForm v-if="!showForm"/>
    </div>
  </section>
</template>

<script>
import {GetUser, GetTasks, GetTask, CreateTask } from '@/constants/query.gql'
import CTaskForm from '@/components/task/TaskForm'

export default {
  name: 'Board',
  props: {
    showForm: Boolean,
    default: true
  },
  apollo: {
    getUser: {
      query: GetUser,
    },
  },
  components: { CTaskForm }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/components/buttons/button";

  .board--empty {
    .intro {
      align-items: center;
      display: flex;
      flex-direction: column;
      font-size: $heading-font-h1;
      ul {
        margin-top: 2rem;
      }
      ul li {
        align-items: center;
        display: flex
      }
      ul li:first-child i {
        font-size: 2.8rem;
        color: $mojo;
        font-weight: 500;
      }
      ul li:second-child i {
        font-size: 2.8rem;
        font-weight: 500;
      }
      ul li:nth-child(3) {
        text-align: center;
        .btn {
          margin:2rem auto;
          width: 50%;
          border-color: $tundora;
          color: $tundora;

          &:hover {
            border-color: $white;
            color: $white;
          }
        }
      }
    }
    p {
      font-weight: 200;
      text-align: center;
    }
  }
</style>


