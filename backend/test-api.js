/**
 * Simple API test script to verify endpoints are working
 */
const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function runTests() {
  console.log('🧪 Starting API tests...\n');

  try {
    // Test 1: Health check
    console.log('✓ Test 1: Health Check');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('  Response:', health.data);
    console.log();

    // Test 2: Get all products
    console.log('✓ Test 2: Get All Products');
    const products = await axios.get(`${BASE_URL}/products`);
    console.log(`  Found ${products.data.items.length} products`);
    console.log(`  Total: ${products.data.total} products in DB`);
    if (products.data.items.length > 0) {
      const firstProduct = products.data.items[0];
      console.log(`  First product: "${firstProduct.title}" - €${firstProduct.price}`);
      console.log(`  Category: ${firstProduct.category}`);
    }
    console.log();

    // Test 3: Get product by ID
    if (products.data.items.length > 0) {
      console.log('✓ Test 3: Get Product by ID');
      const productId = products.data.items[0]._id;
      const product = await axios.get(`${BASE_URL}/products/${productId}`);
      console.log(`  Product: ${product.data.title}`);
      console.log(`  Price (EUR): €${product.data.price}`);
      console.log(`  Images: ${product.data.images ? product.data.images.length : 0}`);
      console.log();
    }

    // Test 4: Filter by category
    console.log('✓ Test 4: Filter Products by Category');
    const categoryFilter = await axios.get(`${BASE_URL}/products?category=jewelry`);
    console.log(`  Jewelry products: ${categoryFilter.data.items.length}`);
    console.log();

    // Test 5: Featured products
    console.log('✓ Test 5: Get Featured Products');
    const featured = await axios.get(`${BASE_URL}/products?featured=true&limit=4`);
    console.log(`  Featured products: ${featured.data.items.length}`);
    console.log();

    // Test 6: Create order (mock)
    console.log('✓ Test 6: Create Order (Mock)');
    const orderPayload = {
      items: [
        { productId: products.data.items[0]._id, title: products.data.items[0].title, price: products.data.items[0].price, qty: 1 }
      ],
      total: products.data.items[0].price + 5.99,
      customer: { name: 'Test User', email: 'test@example.com' }
    };
    const order = await axios.post(`${BASE_URL}/orders`, orderPayload);
    console.log(`  Order created: ${order.data._id}`);
    console.log(`  Total: €${order.data.total}`);
    console.log();

    console.log('✅ All tests passed! API is working correctly.\n');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run tests
runTests().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});