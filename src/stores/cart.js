import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems')) || [] // Load from localStorage
  }),
  getters: {
    cartItems: (state) => state.items,
    cartTotal: (state) =>
      state.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2),
    itemCount: (state) =>
      state.items.reduce((count, item) => count + item.quantity, 0)
  },
  actions: {
    addItem(product, quantity = 1) {
      const existingItem = this.items.find((item) => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },
    removeItem(productId) {
      this.items = this.items.filter((item) => item.product.id !== productId)
    },
    updateQuantity(productId, newQuantity) {
      const item = this.items.find((item) => item.product.id === productId)
      if (item) {
        if (newQuantity > 0) {
          item.quantity = newQuantity
        } else {
          this.removeItem(productId)
        }
      }
    },
    clearCart() {
      this.items = []
    }
  },
})

// Subscribe to changes in the cart items and save to localStorage
// This block will be moved to main.js
