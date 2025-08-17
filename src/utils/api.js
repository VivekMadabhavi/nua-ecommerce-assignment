// src/utils/api.js

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const getCachedData = (key) => {
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  return null;
};

const setCachedData = (key, data) => {
  const cached = JSON.stringify({ data, timestamp: Date.now() });
  localStorage.setItem(key, cached);
};

export const fetchProducts = async () => {
  const cacheKey = 'allProducts';
  let data = getCachedData(cacheKey);

  if (data) {
    console.log('Fetching products from cache...');
    return data;
  }

  console.log('Fetching products from API...');
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  data = await response.json();
  setCachedData(cacheKey, data);
  return data;
};

export const fetchProductById = async (id) => {
  const cacheKey = `product_${id}`;
  let data = getCachedData(cacheKey);

  if (data) {
    console.log(`Fetching product ${id} from cache...`);
    return data;
  }

  console.log(`Fetching product ${id} from API...`);
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  data = await response.json();
  setCachedData(cacheKey, data);
  return data;
};

export const fetchCategories = async () => {
  const cacheKey = 'productCategories';
  let data = getCachedData(cacheKey);

  if (data) {
    console.log('Fetching categories from cache...');
    return data;
  }

  console.log('Fetching categories from API...');
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  data = await response.json();
  setCachedData(cacheKey, data);
  return data;
};
