const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function adjustPrices() {
  try {
    console.log('[INFO] Adjusting product prices...');
    
    // Get all products
    const products = await Product.find({});
    console.log(`[INFO] Found ${products.length} products to process`);
    
    let updatedCount = 0;
    
    // Update each product with appropriate price adjustments
    for (const product of products) {
      const titleLower = product.title.toLowerCase();
      let newPrice = null;
      
      // Adjust bracelets to €4.00
      if (titleLower.includes('bracelet') || titleLower.includes('bracelets')) {
        newPrice = 4.00;
      }
      // Adjust all catchers to €3.50 except mini catchers which stay at €1.50
      else if (titleLower.includes('catcher') && !titleLower.includes('mini')) {
        newPrice = 3.50;
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
    
    console.log(`[SUCCESS] Adjusted prices for ${updatedCount} products`);
    process.exit(0);
  } catch (err) {
    console.error('[ERROR] Price adjustment failed:', err);
    process.exit(1);
  }
}

adjustPrices();