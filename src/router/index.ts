import type { KeepAlive } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/ArchiveView.vue'),
      // meta: {
      //   keepAlive: true,
      // }
    },
    {
      path: '/about',
      name: 'AboutView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/post/:filename',
      name: 'PostView',
      component: () => import('../views/PostView.vue'),
      props: true,
      // meta: {
      //   keepAlive: true,
      // }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 1000 }
    }
  },
})

export default router
