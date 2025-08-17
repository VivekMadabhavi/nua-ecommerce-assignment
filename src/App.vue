<script setup>
import { useCartStore } from './stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()
const cartItemCount = computed(() => cartStore.itemCount)

const displayCartText = computed(() => {
  return cartItemCount.value > 0 ? `Cart (${cartItemCount.value})` : 'Cart'
})
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Products</router-link>
      <router-link to="/cart">{{ displayCartText }}</router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
nav {
  padding: 15px 20px;
  text-align: center;
  background-color: #333; /* Darker background for nav */
  border-bottom: 1px solid #555;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

nav a {
  font-weight: 600;
  color: #f4f4f4; /* Lighter text for contrast */
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s ease;
  position: relative;
  padding-bottom: 5px;
}

nav a:hover {
  color: #007bff; /* Highlight on hover */
}

nav a.router-link-exact-active {
  color: #007bff;
}

/* Simple fade transition for routes */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
