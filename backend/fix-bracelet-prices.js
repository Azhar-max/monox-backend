const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function fixBraceletPrices() {
  try {
    console.log('[INFO] Fixing bracelet prices...');
    
    // Get all products
    const products = await Product.find({});
    console.log(`[INFO] Found ${products.length} products to process`);
    
    let updatedCount = 0;
    
    // Update baby bracelets to €1.50
    for (const product of products) {
      const titleLower = product.title.toLowerCase();
      let newPrice = null;
      
      // Set baby bracelets to €1.50
      if (titleLower.includes('baby bracelet')) {
        newPrice = 1.50;
      }
      
      // Update price if a match was found and it's different
      if (newPrice !== null && product.price !== newPrice) {
        const oldPrice = product.price;
        product.price = newPrice;
        await product.save();
        updatedCount++;
        console.log(`[UPDATE] ${product.title}: €${oldPrice.toFixed(2)} → €${product.price.toFixed(2)}`);
      }
    }
    
    console.log(`[SUCCESS] Fixed prices for ${updatedCount} baby bracelet products`);
    process.exit(0);
  } catch (err) {
    console.error('[ERROR] Price fix failed:', err);
    process.exit(1);
  }
}

fixBraceletPrices();