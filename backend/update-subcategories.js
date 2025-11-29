const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to assign subcategory based on title and category
function assignSubcategory(title, category) {
  let subcategory = '';
  let subcategory_it = '';
  
  const titleLower = title.toLowerCase();
  
  switch (category) {
    case 'keychains':
      if (titleLower.includes('bottle')) {
        subcategory = 'bottle_keychains';
        subcategory_it = 'portachiavi_bottiglia';
      }
      break;
    case 'jewelry':
      if (titleLower.includes('ring')) {
        subcategory = 'rings';
        subcategory_it = 'anelli';
      } else if (titleLower.includes('jhumkay')) {
        subcategory = 'jhumkay';
        subcategory_it = 'jhumkay';
      } else if (titleLower.includes('bangles')) {
        subcategory = 'bangles';
        subcategory_it = 'bracciali';
      } else if (titleLower.includes('earring')) {
        subcategory = 'earrings';
        subcategory_it = 'orecchini';
      } else if (titleLower.includes('necklace')) {
        subcategory = 'necklaces';
        subcategory_it = 'collane';
      }
      break;
    case 'hair_accessories':
      if (titleLower.includes('catcher')) {
        subcategory = 'hair_catchers';
        subcategory_it = 'raccoglitori_per_capelli';
      } else if (titleLower.includes('pony')) {
        subcategory = 'ponyties';
        subcategory_it = 'legacci_per_cavalli';
      } else if (titleLower.includes('pearl')) {
        subcategory = 'pearl_accessories';
        subcategory_it = 'accessori_di_perle';
      }
      break;
    case 'eye_care':
      if (titleLower.includes('mask')) {
        subcategory = 'eye_masks';
        subcategory_it = 'maschere_per_occhi';
      } else if (titleLower.includes('curler')) {
        subcategory = 'lash_curlers';
        subcategory_it = 'curler_per_ciglia';
      }
      break;
    case 'beauty_tools':
      if (titleLower.includes('blender')) {
        subcategory = 'blenders';
        subcategory_it = 'blender';
      } else if (titleLower.includes('nail')) {
        subcategory = 'nail_tools';
        subcategory_it = 'strumenti_per_unghie';
      }
      break;
    case 'accessories':
      if (titleLower.includes('baby')) {
        subcategory = 'baby_accessories';
        subcategory_it = 'accessori_per_bambini';
      }
      break;
    case 'abayas':
      subcategory = 'traditional_abayas';
      subcategory_it = 'abaya_tradizionali';
      break;
    case 'floral':
      if (titleLower.includes('gajray')) {
        subcategory = 'gajray';
        subcategory_it = 'gajray';
      }
      break;
  }
  
  return { subcategory, subcategory_it };
}

async function updateSubcategories() {
  try {
    console.log('[INFO] Updating products with subcategories...');
    
    // Get all products
    const products = await Product.find({});
    console.log(`[INFO] Found ${products.length} products to update`);
    
    let updatedCount = 0;
    
    // Update each product with subcategory
    for (const product of products) {
      const { subcategory, subcategory_it } = assignSubcategory(product.title, product.category);
      
      // Only update if subcategory is different
      if (product.subcategory !== subcategory || product.subcategory_it !== subcategory_it) {
        product.subcategory = subcategory;
        product.subcategory_it = subcategory_it;
        await product.save();
        updatedCount++;
      }
    }
    
    console.log(`[SUCCESS] Updated ${updatedCount} products with subcategories`);
    process.exit(0);
  } catch (err) {
    console.error('[ERROR] Update failed:', err);
    process.exit(1);
  }
}

updateSubcategories();