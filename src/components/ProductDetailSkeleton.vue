<template>
  <div class="product-detail-skeleton-container">
    <div class="skeleton-image"></div>
    <div class="skeleton-info">
      <div class="skeleton-title"></div>
      <div class="skeleton-price"></div>
      <div class="skeleton-description"></div>
      <div class="skeleton-rating"></div>
      <div class="skeleton-quantity"></div>
      <div class="skeleton-button"></div>
    </div>
  </div>
</template>

<script setup>
// Skeleton component for product details
</script>

<style scoped>
.product-detail-skeleton-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-image {
  width: 300px;
  height: 300px;
  background-color: #e0e0e0;
  flex-shrink: 0;
  border-radius: 4px;
}

.skeleton-info {
  flex-grow: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.skeleton-title {
  height: 2em;
  background-color: #e0e0e0;
  width: 90%;
  border-radius: 4px;
}

.skeleton-price {
  height: 1.5em;
  background-color: #e0e0e0;
  width: 40%;
  border-radius: 4px;
}

.skeleton-description {
  height: 5em;
  background-color: #e0e0e0;
  width: 100%;
  border-radius: 4px;
}

.skeleton-rating {
  height: 1em;
  background-color: #e0e0e0;
  width: 60%;
  border-radius: 4px;
}

.skeleton-quantity {
  height: 1.5em;
  background-color: #e0e0e0;
  width: 30%;
  border-radius: 4px;
}

.skeleton-button {
  height: 45px;
  background-color: #e0e0e0;
  width: 50%;
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
