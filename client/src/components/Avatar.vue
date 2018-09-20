
<template>
  <span class="avatar" :hasBorder="hasBorder" :class="[avatarStyle]">
    <span
      v-if="kind === 'unassigned'"
      v-bind:style="{
        backgroundColor: '#429AAE1',
        height: size + 'px',
        width: size + 'px',
      }" class="avatar--core">
      <i class="material-icons">face</i>
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
  props: ['obj', 'hasBorder', 'number', 'kind', 'size', 'selected'],
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
    },
    avatarStyle() {
      return {
        'avatar-has-border': this.hasBorder
      }
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
  .avatar.avatar-has-border {
    .avatar--core {
    border: 0.1rem solid $white;
    }
  }
</style>
