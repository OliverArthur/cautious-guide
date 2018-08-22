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
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/EmailForm.vue'),
      meta: {
        title: 'Logo | Create Account'
      }
    },
    {
      path: '/signup/:id',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Signup.vue'),
      meta: {
        title: 'Logo | Signup'
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      meta: {
        title: 'Logo | Log in'
      }
    },
    {
      path: '/workspace',
      name: 'workspace',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Workspace.vue'),
      meta: {
        title: 'Logo | workspace',
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
