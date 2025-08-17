<template>
  <div class="product-detail-container">
    <button @click="goBack" class="back-button">← Back to Products</button>
    <div v-if="loading">
      <ProductDetailSkeleton />
    </div>
    <div v-else-if="error" class="error-message">{{ error }}</div>

    <div v-else-if="product" class="product-details">
      <img :src="product.image" :alt="product.title" class="product-detail-image" />
      <div class="product-info">
        <h1 class="product-detail-title">{{ product.title }}</h1>
        <p class="product-detail-price">${{ product.price }}</p>
        <p class="product-detail-description">{{ product.description }}</p>
        <div class="product-rating">
          Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
        </div>

        <div class="quantity-selector">
          <label for="quantity">Quantity:</label>
          <select id="quantity" v-model.number="quantity">
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <button @click="addToCart" class="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { fetchProductById as apiFetchProductById } from '../utils/api'
import ProductDetailSkeleton from '../components/ProductDetailSkeleton.vue'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const loading = ref(true)
const error = ref(null)
const quantity = ref(1)

const cartStore = useCartStore()

const fetchProduct = async (id) => {
  try {
    loading.value = true
    error.value = null
    product.value = await apiFetchProductById(id)
  } catch (err) {
    error.value = 'Failed to fetch product details. Please try again later.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value)
    console.log(`Added ${quantity.value} of ${product.value.title} to cart`)
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchProduct(route.params.id)
})

// Watch for changes in route params (e.g., navigating from one product detail to another)
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchProduct(newId)
  }
})
</script>

<style scoped>
.product-detail-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.product-details {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #ffffff; /* White background for the card */
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.product-detail-image {
  max-width: 300px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
}

.product-info {
  flex-grow: 1;
  min-width: 300px;
  text-align: left;
}

.product-detail-title {
  font-size: 2.5em; /* Larger title */
  margin-bottom: 15px;
  color: #333;
  line-height: 1.2;
}

.product-detail-price {
  font-size: 1.8em;
  font-weight: 700;
  color: #007bff; /* Primary color for price */
  margin-bottom: 25px;
}

.product-detail-description {
  margin-bottom: 25px;
  line-height: 1.7;
  color: #555;
}

.product-rating {
  margin-bottom: 25px;
  color: #777;
  font-size: 0.95em;
}

.quantity-selector {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-selector label {
  font-weight: 600;
  color: #333;
}

.quantity-selector select {
  padding: 10px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
  background-color: white;
  min-width: 80px;
}

.add-to-cart-button {
  background-color: #28a745; /* Green */
  border: none;
  color: white;
  padding: 12px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-to-cart-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.back-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
  font-size: 0.95em;
}

.back-button:hover {
  background-color: #5a6268;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .product-details {
    flex-direction: column;
    align-items: center;
  }
  .product-info {
    text-align: center;
    min-width: unset;
    width: 100%;
  }
  .product-detail-title {
    font-size: 2em;
  }
  .product-detail-image {
    max-width: 250px;
  }
}
</style>
