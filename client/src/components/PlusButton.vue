<template>
  <span class="plus-button" :class="position" @click.stop="$store.dispatch('changeActiveWidget', 'show-menu')">
    <transition name="list" mode="out-in">
      <span class="plus-button--btn" v-show="activeWidget === 'show-menu'">
        <ul class="plus-button--inner">
          <li>
            <p @click.stop="$emit('click', 'folder')">
              Create folder <i class="material-icons">folder</i>
            </p>
          </li>
          <li>
            <router-link :to="{name: 'accounts'}">
              Add user <i class="material-icons">person_add</i>
            </router-link>
          </li>
          <li>
            <p>Create group <i class="material-icons">group_add</i>
            </p>
          </li>
        </ul>
      </span>
    </transition>
    <button class="btn btn-secondary btn-icon">
      <i class="material-icons">add</i>
    </button>
  </span>
</template>

<script>
import { mapState } from  'vuex'

export default {
  name: 'CPlusButton',
  props: {
    position: {
      type: String,
      validator: value => [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
      ].indexOf(value) > -1,
    }
  },
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    ...mapState(['activeWidget'])
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
.plus-button {
  &--btn {
    position: relative;
  }

  &--inner {
    bottom: 1rem;
    left: -11rem;
    position: absolute;
    width: 16rem;

    p, a {
      align-items: center;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      font-size: 1.5rem;
      justify-content: space-between;
      padding: 1.5rem;
      text-decoration: none;
      color: inherit;
    }
  }

}
.bottom-right {
  position: absolute;
  bottom: 10rem;
  right: 1.5rem;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30%);
}
</style>
