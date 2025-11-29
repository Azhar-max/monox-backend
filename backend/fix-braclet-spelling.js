const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function fixBracletSpelling() {
  try {
    console.log('[INFO] Fixing braclet spelling and prices...');
    
    // Get all products
    const products = await Product.find({});
    console.log(`[INFO] Found ${products.length} products to process`);
    
    let updatedCount = 0;
    
    // Update braclet products
    for (const product of products) {
      // Fix spelling and set price for "Braclet" products
      if (product.title === 'Braclet') {
        const oldPrice = product.price;
        product.title = 'Bracelets';
        product.title_en = 'Bracelets';
        product.title_it = 'Bracelets';
        product.price = 4.00;
        await product.save();
        updatedCount++;
        console.log(`[UPDATE] ${product.title}: €${oldPrice.toFixed(2)} → €${product.price.toFixed(2)}`);
      }
    }
    
    console.log(`[SUCCESS] Fixed spelling and prices for ${updatedCount} braclet products`);
    process.exit(0);
  } catch (err) {
    console.error('[ERROR] Spelling fix failed:', err);
    process.exit(1);
  }
}

fixBracletSpelling();