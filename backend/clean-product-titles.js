const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to clean product title by removing numbering
function cleanTitle(title) {
  // Remove numbering at the end (e.g., "Product 1", "Product 2", etc.)
  return title.replace(/\s+\d+$/, '').trim();
}

async function cleanProductTitles() {
  try {
    console.log('[INFO] Cleaning product titles...');
    
    // Get all products
    const products = await Product.find({});
    console.log(`[INFO] Found ${products.length} products to process`);
    
    let updatedCount = 0;
    
    // Update each product with cleaned title
    for (const product of products) {
      const cleanedTitle = cleanTitle(product.title);
      
      // Only update if title is different
      if (product.title !== cleanedTitle) {
        product.title = cleanedTitle;
        product.title_en = cleanedTitle;
        product.title_it = cleanedTitle;
        await product.save();
        updatedCount++;
      }
    }
    
    console.log(`[SUCCESS] Cleaned titles for ${updatedCount} products`);
    process.exit(0);
  } catch (err) {
    console.error('[ERROR] Cleaning failed:', err);
    process.exit(1);
  }
}

cleanProductTitles();