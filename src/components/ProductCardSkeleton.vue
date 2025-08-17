<template>
  <div class="product-card-skeleton">
    <div class="skeleton-image"></div>
    <div class="skeleton-title"></div>
    <div class="skeleton-price"></div>
    <div class="skeleton-button"></div>
  </div>
</template>

<script setup>
// Skeleton component for product cards
</script>

<style scoped>
.product-card-skeleton {
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-image {
  width: 150px;
  height: 150px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  align-self: center;
  border-radius: 4px;
}

.skeleton-title {
  height: 1.1em;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 80%;
  align-self: center;
}

.skeleton-price {
  height: 1em;
  background-color: #e0e0e0;
  width: 50%;
  align-self: center;
  margin-bottom: 15px;
  border-radius: 4px;
}

.skeleton-button {
  height: 40px;
  background-color: #e0e0e0;
  width: 70%;
  align-self: center;
  border-radius: 5px;
}

@keyframes pulse {
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
}
</style>
