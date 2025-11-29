const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Price mappings based on product titles or subcategories
const priceMappings = {
  // By title keywords
  'bangles': 4.00,
  'jhumka': 2.50,
  'mini catcher': 1.50,
  'gajray': 5.00,
  'ring': 3.50,
  'bottle keychain': 1.50,
  'jewelry set': 15.00,
  'baby bracelet': 1.50,
  'beauty blender': 6.00,
  'eye lash curler': 4.00,
  'eye mask': 4.00,
  'fancy bangles': 8.00,
  'shiffon abaya': 4.00,
  // Additional mappings for remaining products
  'abaya': 4.00,
  'artificial nails': 4.00,
  'pony': 1.50,
  'catcher': 1.50,
  'pearl': 5.00
};

async function updatePrices() {
  try {
    console.log('[INFO] Updating product prices...');
    
    // Get all products
    const products = await Product.find({});
    console.log(`[INFO] Found ${products.length} products to process`);
    
    let updatedCount = 0;
    
    // Update each product with appropriate price
    for (const product of products) {
      const titleLower = product.title.toLowerCase();
      let newPrice = null;
      
      // Check for exact matches first
      for (const [keyword, price] of Object.entries(priceMappings)) {
        if (titleLower.includes(keyword)) {
          newPrice = price;
          break;
        }
      }
      
      // Update price if a match was found and it's different
      if (newPrice !== null && product.price !== newPrice) {
        product.price = newPrice;
        await product.save();
        updatedCount++;
        console.log(`[UPDATE] ${product.title}: €${product.price.toFixed(2)}`);
      }
    }
    
    console.log(`[SUCCESS] Updated prices for ${updatedCount} products`);
    process.exit(0);
  } catch (err) {
    console.error('[ERROR] Price update failed:', err);
    process.exit(1);
  }
}

updatePrices();