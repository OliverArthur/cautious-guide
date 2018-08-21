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
        title: 'Logo'
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
      component: () => import(/* webpackChunkName: "about" */ './views/SignUp.vue'),
      meta: {
        title: 'Logo | Signup'
      }
    }
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
