import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Logo',
        redirect: true
      }
    },
    {
      path: '/create-account',
      name: 'create-account',
      // route level code-splitting
      // this generates a separate chunk (emailForm.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "emailForm" */ './views/EmailForm.vue'),
      meta: {
        title: 'Logo | Create Account'
      }
    },
    {
      path: '/signup/:id',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (signup.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue'),
      meta: {
        title: 'Logo | Signup'
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        title: 'Logo | Log in'
      }
    },
    {
      path: '/workspace',
      name: 'workspace',
      // route level code-splitting
      // this generates a separate chunk (workspace.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "workspace" */ './views/Workspace.vue'),
      meta: {
        title: 'Logo | workspace',
        requiresAuth: true
      }
    },
    {
      path: '/accounts',
      name: 'accounts',
      // route level code-splitting
      // this generates a separate chunk (accounts.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "accounts" */ './views/Accounts.vue'),
      meta: {
        title: 'Logo | account',
        requiresAuth: true
      }
    },
    {
      path: '/user/:userId',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (accounts.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "User" */ './views/User.vue'),
      meta: {
        title: 'Logo | user',
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('user-id')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth) {
      next('/login')
    }
  } else if (to.matched.some(record => record.meta.redirect)) {
    if (auth && auth != null) {
      next('/workspace')
    }
  }
  next()
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
