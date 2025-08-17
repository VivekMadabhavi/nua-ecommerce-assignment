<template>
  <div class="checkout-container">
    <h1>Checkout</h1>

    <div v-if="orderPlaced" class="order-confirmation">
      <h2>Thank You for Your Order!</h2>
      <p>Your order has been placed successfully.</p>
      <router-link to="/" class="back-to-products-button">Continue Shopping</router-link>
    </div>

    <div v-else>
      <div v-if="cartStore.cartItems.length === 0" class="empty-cart-message">
        Your cart is empty. Please add items to proceed to checkout.
        <router-link to="/" class="back-to-products-button">Browse Products</router-link>
      </div>

      <div v-else>
        <h2>Order Summary</h2>
        <div class="order-summary-items">
          <div v-for="item in cartStore.cartItems" :key="item.product.id" class="summary-item">
            <span>{{ item.product.title }} x {{ item.quantity }}</span>
            <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        <div class="order-total">
          <strong>Grand Total: ${{ cartStore.cartTotal }}</strong>
        </div>

        <h2>Shipping Information</h2>
        <form @submit.prevent="placeOrder" class="checkout-form">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" :class="{ 'is-invalid': errors.name }" />
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" :class="{ 'is-invalid': errors.email }" />
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <textarea id="address" v-model="formData.address" :class="{ 'is-invalid': errors.address }"></textarea>
            <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
          </div>
          <button type="submit" class="place-order-button">Place Order</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const orderPlaced = ref(false)

const formData = reactive({
  name: '',
  email: '',
  address: '',
})

const errors = reactive({
  name: '',
  email: '',
  address: '',
})

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.address = ''

  if (!formData.name) {
    errors.name = 'Name is required.'
    isValid = false
  }
  if (!formData.email) {
    errors.email = 'Email is required.'
    isValid = false
  } else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
    errors.email = 'Invalid email format.'
    isValid = false
  }
  if (!formData.address) {
    errors.address = 'Address is required.'
    isValid = false
  }
  return isValid
}

const placeOrder = () => {
  if (validateForm()) {
    // Simulate order placement
    console.log('Order placed:', formData, cartStore.cartItems)
    cartStore.clearCart()
    orderPlaced.value = true
  }
}
</script>

<style scoped>
.checkout-container {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  margin-bottom: 30px;
}

h1,
h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
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

.back-to-products-button {
  display: inline-block;
  margin-top: 25px;
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.back-to-products-button:hover {
  background-color: #0056b3;
}

.order-summary-items {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  background-color: #f9f9f9;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #e9e9e9;
  font-size: 1em;
  color: #555;
}

.summary-item:last-child {
  border-bottom: none;
}

.order-total {
  text-align: right;
  font-size: 1.6em;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 35px;
  color: #333;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fcfcfc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1em;
  transition: border-color 0.2s ease;
  background-color: #ffffff; /* Ensure white background */
  color: #333333; /* Ensure dark text color */
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #007bff;
  outline: none;
}

/* Placeholder color */
.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #888888; /* Ensure placeholder is visible */
}

.form-group input.is-invalid,
.form-group textarea.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.85em;
  margin-top: 5px;
  font-weight: 500;
}

.place-order-button {
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
  margin-top: 20px;
}

.place-order-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.order-confirmation {
  text-align: center;
  padding: 60px 30px;
  background-color: #e6ffe6;
  border: 1px solid #c6f6c6;
  border-radius: 12px;
  margin-top: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.order-confirmation h2 {
  color: #28a745;
  margin-bottom: 20px;
  font-size: 2em;
}

.order-confirmation p {
  font-size: 1.1em;
  margin-bottom: 30px;
  color: #555;
}

@media (max-width: 600px) {
  .checkout-container {
    padding: 15px;
    margin: 20px auto;
  }
  .form-group input, .form-group textarea {
    padding: 10px;
  }
  .place-order-button, .back-to-products-button {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
