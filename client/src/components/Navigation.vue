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
      <li class="links--item" v-if="$route.meta.requiresAuth">
        <button class="btn btn--plain">
          <i class="material-icons">notifications</i>
        </button>
      </li>

      <li class="links--item has-dropdown"
        @click.stop="$store.dispatch('changeActiveWidget', 'account-menu')"
        v-if="$route.meta.requiresAuth">
        <c-avatar
          v-if="$route.meta.requiresAuth"
          :obj="getUser" :size="36">
        </c-avatar>
        <div class="navigation__dropdown"
          v-show="activeWidget === 'account-menu'">
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
            <li class="dropdown--item">
              <router-link
                v-if="['Owner', 'Administrator'].includes(getUser.role) && $route.name !== 'accounts'"
                :to="{name: 'accounts'}"
                title="Accounts">
                Accounts <i class="material-icons">people</i>
              </router-link>
            </li>
            <li class="dropdown--item"
              v-if="$route.name !== 'user'">
              <router-link
                :to="{ name: 'user', params: { userId: getUser.id }}"
                title="My profile">
                My profile <i class="material-icons">account_box</i>
              </router-link>
            </li>
            <li class="dropdown--item">
              <a @click="logout" :href="`${url}login`" title="logout">
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
import { mapState } from  'vuex'
import { GetUser } from '@/constants/query.gql'

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
  },
  data () {
    return {
      url: process.env.BASE_URL,
      route: this.$route.name,
      modalConfig: {},
      getTeam: {},
      getUser: {}
    }
  },
  computed: {
    ...mapState(['activeWidget'])
  },
  apollo: {
    getUser: {
      query: GetUser,
      variables: {}
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('user-id')
      localStorage.removeItem('user-token')
      this.$root.$data.userId = localStorage.getItem('user-id')
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/buttons/button";
@import "../assets/scss/components/navigation/navigation";
</style>
