<template>
  <span class="avatar">
    <span
      v-if="kind === 'unassigned'"
      v-bind:style="{
        backgroundColor: '#429AAE1',
        height: size + 'px',
        width: size + 'px',
      }" class="avatar--core">
      <svg viewBox="0 0 14 9" width="14px">
        <path fill-rule="evenodd" stroke="none" fill="#bcd4ff"
          d="M9,4 C10.11,4 11,3.1 11,2 C11,0.9 10.11,0 9,0 C7.9,0 7,0.9 7,2 C7,3.1 7.9,4 9,4 L9,4 Z M9,5.2 C7.33,5.2 4,6.03 4,7.7 L4,9 L14,9 L14,7.7 C14,6.03 10.67,5.2 9,5.2 L9,5.2 Z M5,3 L3,3 L3,1 L2,1 L2,3 L0,3 L0,4 L2,4 L2,6 L3,6 L3,4 L5,4 L5,3 L5,3 Z">
        </path>
      </svg>
    </span>
    <span
      v-else-if="kind === 'Team'"
      v-bind:style="{
        backgroundColor: '#c75343',
        color: 'rgba(0,0,0,.56)',
        height: size + 'px',
        width: size + 'px',
      }" class="avatar--core">
      <i class="material-icons">person</i>
    </span>
    <span
      v-else-if="obj && obj.avatarColor"
      v-bind:class="{selectedColor: selected}"
      v-bind:style="{
        backgroundColor: `#${obj.avatarColor}`,
        height: size + 'px',
        width: size + 'px',
        fontSize: size * 0.4375 + 'px'
      }" class="avatar--core">
      {{ getInitials }}
    </span>
    <span
      v-else-if="obj && !obj.avatarColor"
      v-bind:class="{selectedColor: selected}"
      v-bind:style="{
        backgroundColor: '#f2f7ff',
        color: '#48f',
        height: size + 'px',
        width: size + 'px',
      }" class="avatar--core">
      <i class="material-icons">drafts</i>
    </span>
    <span
      v-else-if="number"
      v-bind:class="{selectedColor: selected}"
      v-bind:style="{
        backgroundColor: '#f2f7ff',
        color: 'rgba(0,0,0,.56)',
        height: size + 'px',
        width: size + 'px',
        fontSize: size * 0.4375 + 'px'
      }" class="avatar--core">
      {{ number }}
    </span>
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'CAvatar',
  props: ['obj', 'number', 'kind', 'size', 'selected'],
  computed: {
    getInitials() {
      if (this.obj.initials) {
        return this.obj.initials
      }
      const { firstname, lastname } = this.obj

      if (!firstname) {
        return
      }

      return `${firstname[0]}${lastname[0]}`.toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar {
    cursor: pointer;
    position: relative;

    &--core {
      color: $white;
      border-radius: 50%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.1rem;
    }
  }
</style>

