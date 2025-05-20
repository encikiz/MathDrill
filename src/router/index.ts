import { createRouter, createWebHistory } from 'vue-router'
import WorksheetsView from '../views/WorksheetsView.vue'
import WorksheetDetailView from '../views/WorksheetDetailView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'worksheets',
      component: WorksheetsView,
    },
    {
      path: '/worksheet/:id',
      name: 'worksheet-detail',
      component: WorksheetDetailView,
    },
    {
      path: '/legacy',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
