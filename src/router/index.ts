import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import TermsOfServiceView from '@/views/TermsOfServiceView.vue'
import NotFound from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicyView
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: TermsOfServiceView
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
