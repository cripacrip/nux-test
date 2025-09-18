import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/todos',
    name: 'todos',
    component: () => import('../views/TodosPage.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    const userRaw = localStorage.getItem('auth_user')
    if (!userRaw) {
      next({ name: 'login' })
      return
    }
  }
  next()
})

export default router


