import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServiceView from '../views/ServiceView.vue'
import ContactView from '../views/ContactView.vue'
import TestView from '../views/TestView.vue'
import NotFound from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/service',
    name: 'Service',
    component: ServiceView,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView,
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
