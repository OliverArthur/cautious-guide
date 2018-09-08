import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

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
        requiresAuth: false,
        redirect: true
      }
    },
    {
      path: '/create-account',
      name: 'create-account',
      // route level code-splitting
      // this generates a separate chunk (emailForm.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "emailForm" */ './views/Email.vue'),
      meta: {
        title: 'Logo | Create Account',
        requiresAuth: true
      }
    },
    {
      path: '/signup/:id',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (emailForm.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "emailForm" */ './views/Signup.vue'),
      meta: {
        title: 'Logo | Signup',
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (emailForm.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "emailForm" */ './views/Login.vue'),
      meta: {
        title: 'Logo | Login',
        requiresAuth: false
      }
    },
    {
      path: '/workspace',
      name: 'workspace',
      // route level code-splitting
      // this generates a separate chunk (emailForm.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "emailForm" */ './views/Workspace.vue'),
      meta: {
        title: 'Logo | Workspace',
        requiresAuth: true
      }
    },
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
