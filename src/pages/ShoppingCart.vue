<template>
  <div class="shopping-cart-container">
    <h1>Shopping Cart</h1>

    <div v-if="cartStore.cartItems.length === 0" class="empty-cart-message">
      Your cart is empty.
    </div>

    <div v-else class="cart-items">
      <div v-for="item in cartStore.cartItems" :key="item.product.id" class="cart-item">
        <img :src="item.product.image" :alt="item.product.title" class="cart-item-image" />
        <div class="cart-item-details">
          <h2 class="cart-item-title">{{ item.product.title }}</h2>
          <p class="cart-item-price">Unit Price: ${{ item.product.price }}</p>
          <div class="cart-item-quantity">
            <label for="quantity">Quantity:</label>
            <select
              :value="item.quantity"
              @change="updateQuantity(item.product.id, $event.target.value)"
            >
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <p class="cart-item-subtotal">Subtotal: ${{ (item.product.price * item.quantity).toFixed(2) }}</p>
          <button @click="removeItem(item.product.id)" class="remove-item-button">Remove</button>
        </div>
      </div>

      <div class="cart-summary">
        <p class="grand-total">Grand Total: ${{ cartStore.cartTotal }}</p>
        <router-link to="/checkout" class="proceed-to-checkout-button">Proceed to Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const updateQuantity = (productId, newQuantity) => {
  cartStore.updateQuantity(productId, parseInt(newQuantity))
}

const removeItem = (productId) => {
  cartStore.removeItem(productId)
}
</script>

<style scoped>
.shopping-cart-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff; /* White background for the cart area */
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  margin-bottom: 30px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2em;
}

.empty-cart-message {
  text-align: center;
  color: #777;
  font-size: 1.2em;
  padding: 50px 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin: 20px 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;
}

.cart-item:hover {
  transform: translateY(-3px);
}

.cart-item-image {
  width: 100px; /* Slightly larger image */
  height: 100px;
  object-fit: contain;
  flex-shrink: 0;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 5px;
}

.cart-item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.cart-item-title {
  font-size: 1.2em;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.cart-item-price {
  font-size: 1em;
  color: #666;
  margin-bottom: 8px;
}

.cart-item-quantity label {
  font-weight: 500;
  color: #555;
  margin-right: 5px;
}

.cart-item-quantity select {
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.95em;
  background-color: white;
}

.cart-item-subtotal {
  font-size: 1.1em;
  font-weight: bold;
  color: #007bff;
  margin-top: 10px;
  margin-bottom: 10px;
}

.remove-item-button {
  background-color: #dc3545; /* Red */
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-start;
  transition: background-color 0.3s ease;
}

.remove-item-button:hover {
  background-color: #c82333;
}

.cart-summary {
  border-top: 2px solid #f0f0f0;
  padding-top: 25px;
  margin-top: 25px;
  text-align: right;
}

.grand-total {
  font-size: 1.8em;
  font-weight: 700;
  color: #333;
  margin-bottom: 25px;
}

.proceed-to-checkout-button {
  background-color: #28a745; /* Green */
  color: white;
  border: none;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.proceed-to-checkout-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
  }
  .cart-item-image {
    margin-bottom: 10px;
    align-self: center;
  }
  .remove-item-button {
    align-self: center;
  }
}
</style>
