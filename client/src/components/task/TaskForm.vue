<template>
  <div class="task-form modal-backdrop">
    <div class="task-form--content modal">
      <form method="POST" @submit.prevent>
        <c-grid>
          <c-grid-inner>
            <c-grid-cell
              align="middle"
              :span-desktop="9"
              :span-phone="12"
              :span-tablet="12">
              <div class="content-left">
                <div class="form-group">
                  <input
                    type="text"
                    id="taskTitle"
                    name="taskTitle"
                    ref="taskTitle"
                    v-model="form.title"
                    :autofocus="true" required="required"/>
                  <label
                    for="folder"
                    class="control-label">
                    Title
                  </label>
                  <i class="bar"></i>
                </div>
                <CTextEditor/>
              </div>
            </c-grid-cell>
            <c-grid-cell
              align="top"
              :span-desktop="3"
              :span-phone="12"
              :span-tablet="12">
              <div class="content-right">
                <CTaskStatus/>
              </div>
            </c-grid-cell>
          </c-grid-inner>
        </c-grid>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CTaskStatus from '@/components/task/TaskStatus'
import CTextEditor from '@/components/global/TextEditor'
import CGrid from '@/components/grid/Grid'
import CGridInner from '@/components/grid/GridInner'
import CGridCell from '@/components/grid/GridCell'

export default {
  name: 'TaskForm',
  props: {
    modifier: {
      type: String
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    CTaskStatus,
    CTextEditor,
    CGrid,
    CGridInner,
    CGridCell
  },
  data() {
    return {
      form: {
        formatDate: '',
        searchUser: '',
        title: ''
      }
    }
  },
  computed: {
    filteredUsers() {
      // const s = this.searchUser.toLowerCase()
      // const users = this.task.assignees
      // return this.users.filter(o => !users.includes(o.id)
      //   && (o.name.toLowerCase().includes(s) || o.email.toLowerCase().includes(s)))
    },
    ...mapState(['activeWidget'])
  },
}
</script>


<style lang="scss" scoped>
@import "../../assets/scss/components/buttons/button";
@import "../../assets/scss/components/form/form";
@import "../../assets/scss/components/grid/grid";

.modal-backdrop {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: -7.5rem;
  z-index: 4444;
}

.modal {
  background: $white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  overflow-x: auto;

  @media (min-width: 72rem) {
    min-width: 114rem;
  }

}

.content-left {
  background-color: $white;
  padding: 1.5rem;
  border: 0.1rem solid $silver-clear;
}
</style>
