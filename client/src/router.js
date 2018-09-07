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
    // {
    //   path: '/create-account',
    //   name: 'create-account',
    //   // route level code-splitting
    //   // this generates a separate chunk (emailForm.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "emailForm" */ './views/EmailForm.vue'),
    //   meta: {
    //     title: 'Logo | Create Account'
    //   }
    // },
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
