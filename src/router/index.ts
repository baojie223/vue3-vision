import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/build'
  },
  {
    path: '/build',
    component: () => import('@/views/build/index.vue')
  },
  {
    path: '/preview',
    component: () => import('@/views/preview/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
