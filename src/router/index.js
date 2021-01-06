import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/build',
  },
  {
    path: '/build',
    component: () => import('@/views/build/Build.vue'),
  },
  {
    path: '/preview',
    component: () => import('@/views/preview/Preview.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/build',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
