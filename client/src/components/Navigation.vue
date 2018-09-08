<template>
  <nav class="navigation">
    <ul class="navigation__links">
      <li class="links--item">
        <router-link
          v-if="($route.name === 'home' || $route.name === 'create-account')"
          :to="{name: 'login'}"
          class="btn btn--outline">
          Login
        </router-link>
      </li>
      <li class="links--item" v-if="auth">
        <button class="btn btn--plain">
          <i class="material-icons">notifications</i>
        </button>
      </li>
      <li class="links--item has-dropdown" v-if="auth">
        <!-- TODO: Add the avatar component here -->
        <div class="navigation__dropdown">
          <ul class="navigation__dropdown--inner">
            <li
              v-if="$route.name !== 'workspace'"
              class="dropdown--item">
              <router-link
                :to="{name: 'workspace'}"
                title="home">
                Home <i class="material-icons">home</i>
              </router-link>
            </li>
            <!-- TODO: only show this links is admin or owner user -->
            <li class="dropdown--item">
              <router-link
                :to="{name: 'accounts'}"
                title="Accounts">
                Accounts <i class="material-icons">people</i>
              </router-link>
            </li>
            <!-- TODO: pass the user id as params to get the user details -->
            <li class="dropdown--item"
              v-if="$route.name !== 'user'">
              <router-link
                :to="{name: 'profile'}"
                title="My profile">
                My profile <i class="material-icons">account_box</i>
              </router-link>
            </li>
            <li class="dropdown--item">
              <!-- TODO: create logout method and add the login url -->
              <a title="logout">
                Logout <i class="material-icons">exit_to_app</i>
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'CNavigation',
  props: {
    /**
     * Use this prop to add a custom class to the component
     *
     * @type { String }
     * @default ''
     * @requires false
     *
     * @example: <CNavigation modifier="add-border"/>
     *
     * ```html
     * <nav class="navigation add-border"></nav>
     * ```
     */
    modifier: {
      type: String
    },
    /**
     * Use this prop to verify if an user is auth.
     *
     * @type { String }
     * @default ''
     * @requires false
     *
     * @example: <CNavigation modifier="add-border"/>
     *
     * ```html
     * <nav class="navigation add-border"></nav>
     * ```
     */
    auth: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";

.navigation {
  display: flex;
}

.navigation__links {
  padding: 1.5rem;
}
</style>
