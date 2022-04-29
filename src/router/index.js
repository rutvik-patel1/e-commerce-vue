import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CartPage from '../views/CartPage.vue'
import ProductSection from '../views/ProductSection.vue'
const routes = [
  {
    path: '/',
    name: 'Hom',
    redirect :'/home',
  },
  {
    path: '/home',
    name: 'Home',
    component:Home,
  },
  {
    path: '/details/:id',
    name: 'details',
    component: ProductSection
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
