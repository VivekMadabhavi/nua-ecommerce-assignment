import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'ProductListing',
    component: () => import('../pages/ProductListing.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../pages/ProductDetail.vue')
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: () => import('../pages/ShoppingCart.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../pages/Checkout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
