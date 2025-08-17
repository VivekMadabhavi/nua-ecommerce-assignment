<template>
  <div>
    <h1>Product Listing Page</h1>
    <div v-if="loading">Loading products...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <div class="filters">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search products by title"
      />
      <select v-model="selectedCategory" @change="filterProducts">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div class="product-grid">
      <template v-if="loading">
        <ProductCardSkeleton v-for="n in 8" :key="n" />
      </template>
      <template v-else>
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.title" class="product-image" />
          <h2 class="product-title">{{ product.title }}</h2>
          <p class="product-price">${{ product.price }}</p>
          <div class="product-actions">
            <router-link :to="`/product/${product.id}`" class="view-details-button">View Details</router-link>
            <template v-if="getProductQuantity(product.id) === 0">
              <button @click="addProductToCart(product)" class="add-to-cart-button">Add to Cart</button>
            </template>
            <template v-else>
              <div class="quantity-controls">
                <button @click="decreaseQuantityFromListing(product)" class="quantity-button">-</button>
                <span class="quantity">{{ getProductQuantity(product.id) }}</span>
                <button @click="increaseQuantityFromListing(product)" class="quantity-button">+</button>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { fetchProducts as apiFetchProducts, fetchCategories as apiFetchCategories } from '../utils/api'
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue'
import { useDebouncedRef } from '../hooks/useDebounce'
import { useCartStore } from '../stores/cart'

const products = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = useDebouncedRef('')
const selectedCategory = ref('')
// const addedToCartStates = reactive({}) // No longer needed, quantity will control UI

const cartStore = useCartStore()

// Computed property to get quantity of a product in cart
const getProductQuantity = (productId) => {
  const item = cartStore.cartItems.find(item => item.product.id === productId)
  return item ? item.quantity : 0
}

const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = null
    products.value = await apiFetchProducts()
  } catch (err) {
    error.value = 'Failed to fetch products. Please try again later.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    categories.value = await apiFetchCategories()
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

const addProductToCart = (product) => {
  cartStore.addItem(product, 1)
  // No need for addedToCartStates, UI will react to cart quantity
}

const increaseQuantityFromListing = (product) => {
  const currentQuantity = getProductQuantity(product.id)
  cartStore.updateQuantity(product.id, currentQuantity + 1)
}

const decreaseQuantityFromListing = (product) => {
  const currentQuantity = getProductQuantity(product.id)
  if (currentQuantity > 1) {
    cartStore.updateQuantity(product.id, currentQuantity - 1)
  } else {
    // If quantity becomes 0, remove from cart entirely
    cartStore.removeItem(product.id)
  }
}

const filteredProducts = computed(() => {
  let filtered = products.value

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return filtered
})

const filterProducts = () => {
  // No longer needed as searchQuery is debounced and computed property reacts to it
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  max-width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
  align-self: center;
}

.product-title {
  font-size: 1.1em;
  margin-bottom: 10px;
  height: 3em; /* Limit title height */
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-weight: bold;
  color: #007bff; /* Use primary color for price */
  margin-bottom: 15px;
  font-size: 1.2em;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.filters input,
.filters select {
  padding: 10px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
  width: 200px; /* Consistent width for inputs */
  background-color: #ffffff; /* Ensure white background */
  color: #333333; /* Ensure dark text color */
}

.filters select {
  background-color: white;
  color: #333333; /* Ensure text in select is also dark */
}

.filters select option {
  color: #333333; /* Ensure option text is dark */
  background-color: #ffffff; /* Ensure option background is white */
}

.error-message {
  color: #dc3545; /* Red color for errors */
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
  width: 100%;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.quantity-button {
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.2s ease;
}

.quantity-button:hover {
  background-color: #d0d0d0;
}

.quantity {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.add-to-cart-button {
  background-color: #007bff; /* Blue */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
}

.add-to-cart-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.add-to-cart-button.added-to-cart {
  background-color: #28a745; /* Green for added to cart */
  transform: translateY(-2px);
}

.view-details-button {
  width: 100%;
}
</style>
