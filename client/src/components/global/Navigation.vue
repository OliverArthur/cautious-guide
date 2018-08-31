<template>
  <nav class="navigation">
    <router-link
        :to="{name: 'login'}"
        v-if="!auth && $route.name !== 'login'"
        class="btn btn-primary--outline">
        Log in
    </router-link>
    <ul class="navigation--menu" v-else-if="auth">
      <li>
        <button class="btn btn-plain">
          <i class="material-icons">notifications</i>
        </button>
      </li>
      <li class="has-dropdown" @click.stop="$store.dispatch('changeActiveWidget', 'account-menu')">

        <c-avatar v-if="auth" :obj="getUser" :size="36"></c-avatar>

        <nav class="dropdown" v-show="activeWidget === 'account-menu'">
          <div class="dropdown--inner">
            <div class="dropdown--inner__item">
              <router-link
                v-if="$route.name !== 'workspace'"
                :to="{name: 'workspace'}"
                title="Home">
                Home <i class="material-icons">home</i>
              </router-link>
            </div>
            <div class="dropdown--inner__item">
              <router-link
                v-if="['Owner', 'Administrator'].includes(getUser.role) && $route.name !== 'accounts'"
                :to="{name: 'accounts'}"
                title="Accounts">
                Accounts <i class="material-icons">people</i>
              </router-link>
            </div>
            <div class="dropdown--inner__item">
              <router-link
                v-if="$route.name !== 'user'"
                :to="{ name: 'user', params: { userId: getUser.id }}"
                title="user profile">
                My profile <i class="material-icons">account_box</i>
              </router-link>
            </div>
            <div class="dropdown--inner__item">
              <a @click="logout" :href="`${url}login`" title="logout">
                Logout <i class="material-icons">exit_to_app</i>
              </a>
            </div>
          </div>
        </nav>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from  'vuex'
import { GetUser } from '../../constants/query.gql'

export default {
  name: 'CNavigation',
  computed: {
    ...mapState(['activeWidget'])
  },
  data() {
    return {
      url: process.env.BASE_URL,
      route: this.$route.name,
      modalConfig: {},
      getTeam: {},
      getUser: {},
      auth: false
    }
  },
  apollo: {
    getUser: {
      query: GetUser,
      variables: {},
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('user-id')
      localStorage.removeItem('user-token')
      this.$root.$data.userId = localStorage.getItem('user-id')
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        this.auth = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/buttons/button";
.navigation{
  &--menu {
    display:  flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: baseline;
    li {
      padding-right: 1.5rem;
      &:last-child {
        padding-right: 0;
      }
    }
    button {
      color: $tundora;
    }
    .has-dropdown {
      position: relative;

      .dropdown {
        background: $white;
        box-shadow: $box-shadow;
        border: 0.1rem solid $silver;
        font-size: 1.6rem;
        position: absolute;
        right: 0;
        text-align: left;
        top: 4.9rem;
        width: 20.5rem;
        z-index: 999;

        &--inner {
          &__item {
            a {
              align-items: center;
              color: $tundora;
              display: flex;
              flex-direction: row;
              font-size: 1.5rem;
              justify-content: space-between;
              padding: 1.5rem;
              text-decoration: none;
            }
            &:hover {
              background-color: $silver-clear;
            }
          }
        }
      }
    }
  }
}
</style>
