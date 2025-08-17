import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useCartStore } from './stores/cart' // Import useCartStore

const app = createApp(App)

app.use(router)
const pinia = createPinia() // Create pinia instance
app.use(pinia)

// Subscribe to changes in the cart items and save to localStorage
// Ensure this runs AFTER app.use(pinia)
pinia.use(({ store }) => {
  if (store.$id === 'cart') {
    store.$subscribe((mutation, state) => {
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    })
  }
})

app.mount('#app')
