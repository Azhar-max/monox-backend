const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function assignBraceletsSubcategory() {
  try {
    console.log('[INFO] Assigning bracelets to jewelry subcategory...');
    
    // Find all jewelry products that are bracelets but don't have a subcategory
    const bracelets = await Product.find({
      category: 'jewelry',
      title: 'Bracelets',
      subcategory: { $in: [null, '', undefined] }
    });
    
    console.log(`[INFO] Found ${bracelets.length} bracelets products to update`);
    
    let updatedCount = 0;
    
    // Update each bracelet product with the bracelets subcategory
    for (const product of bracelets) {
      product.subcategory = 'bracelets';
      product.subcategory_it = 'bracciali';
      await product.save();
      updatedCount++;
      console.log(`[UPDATE] Assigned "${product.title}" to bracelets subcategory`);
    }
    
    console.log(`[SUCCESS] Assigned ${updatedCount} bracelets to the jewelry/bracelets subcategory`);
    process.exit(0);
  } catch (err) {
    console.error('[ERROR] Subcategory assignment failed:', err);
    process.exit(1);
  }
}

assignBraceletsSubcategory();